# Dependency Injection in Angular

## Resources

Official guide at [https://angular.dev/guide/di](https://angular.dev/guide/di)
or [https://angular.io/guide/dependency-injection](https://v17.angular.io/guide/dependency-injection)

[https://www.angularspace.com/fascinating-dependency-injection/](https://www.angularspace.com/fascinating-dependency-injection/)

[https://codeburst.io/angular-dependency-injection-tips-ddb24b8244be](https://codeburst.io/angular-dependency-injection-tips-ddb24b8244be)

[https://angular.love/cracking-angular-di-the-hidden-layers-of-injectors](https://angular.love/cracking-angular-di-the-hidden-layers-of-injectors)

[https://dev.to/this-is-angular/always-use-inject-2do4?ref=angularspace.com](https://dev.to/this-is-angular/always-use-inject-2do4?ref=angularspace.com)

[https://www.angularspace.com/mega-article-superpowers-with-directives-and-dependency-injection/](https://www.angularspace.com/mega-article-superpowers-with-directives-and-dependency-injection/)

[https://medium.com/palo-alto-networks-cortex-dev/angulars-dependency-injection-system-and-how-to-use-it-470c3e3e9be1](https://medium.com/palo-alto-networks-cortex-dev/angulars-dependency-injection-system-and-how-to-use-it-470c3e3e9be1)

Here are several short rules on how to work with DI in Angular:

- Always inject every value into your component, never rely on global variables, variables from other files and so on. As a rule of thumb, if you find any method of your class referencing anything other than properties from that class or local variables, change your class s it receives that value as an injected dependency (like we did with the environment variables)
- Never use string tokens for DI. In Angular it is possible to give the Inject decorator a string for it to look up the dependency. Never do that — a typo is always a possibility. Also, you cannot rely on IntelliSense to autocomplete it for you. Use an InjectionToken instead.
- Remember than instances of services are shared between components at least on the module level, so if any properties on that services are not meant to be modified from the outside world, consider marking them as readonly.
- If you are using a class to be provided instead of another one, make sure you implement them like we did in the second example. This way if the replaced dependency’s interface changes, we will have to reimplement the class that is meant to replace it, so we don’t run into cryptic errors.

## Concepts

[Provider](https://angular.io/guide/glossary#provider)
[Configure Provider](https://angular.io/guide/dependency-injection-providers#configuring-dependency-providers)
[DI in action](https://angular.io/guide/dependency-injection-in-action#dependency-injection-in-action)

Dependency consumer

## DI mechanism

Dependency Injection (DI) is a technique build on a [hierarchical structure of injectors](./injectors), that we use every single day as Angular developers. It allows us to reuse things for classes with Angular decorators, such as Components, Directives, Pipes, and Injectables, to configure dependencies that they need, access native constructs like HttpClient, retrieve data from routing, and much more.

Two main roles exist in the DI system: dependency consumer and dependency provider.

Angular facilitates the interaction between dependency consumers and dependency providers using an abstraction called Injector. When a dependency is requested, the injector checks its registry to see if there is an instance already available there. If not, a new instance is created and stored in the registry. Angular creates an application-wide injector (also known as "root" injector) during the application bootstrap process, as well as any other injectors as needed. In most cases you don't need to manually create injectors, but you should know that there is a layer that connects providers and consumers.

DI is closely tied to the DOM structure of the application. When our application renders the UI, for each HTML element it renders in the DOM, it also creates a special object, named [ElementInjector](https://angular.io/guide/hierarchical-dependency-injection#elementinjector), that is responsible for dependency injection in the context of that element and its children.

### Element Injector

[**Element injector**](https://angular.io/guide/hierarchical-dependency-injection#elementinjector) can be imagined as an object that has a parent injector (the one that has been created for this element's parent), and has a "dictionary" of tokens and their corresponding instances.

```js
@Directive({
    selector: '[appSome]',
})
export class SomeDirective implements OnInit {
    private readonly elementRef = inject(ElementRef);

    ngOnInit() {
        console.log(this.elementRef.nativeElement);
    }
}
```

Now, if we use this directive twice in the same template

```html
<div appSome>
  <span appSome>Text</span>
</div>
```

We will get different elements logged in the console, despite having injected the same ElementRef. This is because each of these elements has its own element injector, for which Angular automatically provides the ElementRef instance. Then, when we use the directive, Angular will ask the element injector for the instance of the token, and it will return different objects for each element.

When we ask for a dependency, Angular first looks at the nearest element injector (what we know as the host element - in this case, the element on which the directive is applied), and, if it finds the token, it will return the instance that was previously provided for that token (ElementRef in our case).

If it does not find the token, it will ask its parent element injector, until it reaches the root injector. After the root injector, it will ask the platform injector, if the dependency is not also found there, Angular will move to the very top of the hierarchy, where it stumbles upon the [**NullInjector**](https://angular.dev/errors/NG0201), a word familiar to all Angular developers from the iconic "NullInjectorError: No provider for token". NullInjector is a special injector that is empty and always throws an error when asked for any token.

this process is similar to how [prototypes work in JavaScript](/docs/languages/javascript#object-prototypes). When we ask for a property in any object, it first looks into the object itself, then its prototype, and so on, until it reaches the Object.prototype, and then tries accessing its prototype, which is null, thus throwing an error. This is beautiful similarity that is useful to remember when we are dealing with DI.

**The process of hierarchical lookup of DI tokens can be modified by different options like Host, Optional, and so on.**

## Providing dependencies

Now this is the place where a lot of our DI magic happens. Obviously, following the lookup process, any dependency that want to inject must first be provided somewhere. Some dependencies, like ElementRef that we encountered previously, are automatically provided by Angular when the corresponding element and its injector are being created. Some, of course, more well known to us, have to be manually provided.

Understanding what options we have when providing dependencies will help us utilize it in a way that minimizes boilerplate code everywhere in our application. Let's start with the simplest one: providing a dependency via a class:

```js
export const appConfig: ApplicationConfig = {
  providers: [SomeService],
};
```

Same as:

```js
export const appConfig: ApplicationConfig = {
  providers: [{ provide: SomeService, useClass: SomeService }],
};
```

As this is self-describing, Angular just gives us a shorthand way to simply declare the class we want to provide. Of course, this is nowadays found only when some service is not provided in the root of our application(`providedIn: root`), which is not often (although an absolutely valid case!).

Now, we can also provide a value instead of a class that needs to be instantiated. This is useful for sharing some global configurations wile keeping the type-safety. For instance, lots of Angular apps utilize environments, special files that get replaced with specific values depending on the type of a build we perform (development, staging, production, etc.).

### useValue

A good practice is to create a token (or maybe a class) that has the same type as whatever data we have in the environment files, for instant, if we have an environment like this:

```js
export const environment = {
  production: true,
  apiUrl: "https://api.example.com",
};
```

We can create a class that reflects this data so we can inject it anywhere:

```js
export class ApplicationConfig {
    readonly production: boolean;
    readonly apiUrl: string;
}
```

Finally, we can utilize the `useValue` option to provide the value of the class we created:

```js
import { environment } from "./environments/environment";

export const appConfig: ApplicationConfig = [
  { provide: ApplicationConfig, useValue: environment },
];
```

And then we can just inject the environment anywhere without the need to reference the environment file:

```js
@Injectable()
export class SomeService {
    private readonly environment = inject(Environment);
    private readonly http = inject(HttpClient);

    getData() {
        return this.http.get(this.environment.apiUrl + '/data');
    }
}
```

### useExisting

Next option is the `useExisting`. This is rarely used, however it can be useful if we want to limit our developers using a third-party API. For instance, some other Angular service that we do not own might have multiple methods and properties that can do dramatic things like manipulate the DOM structure of our application or maybe register multiple event listeners, affecting the change detection process.

However, we might only be interested in some utility methods from the service, and want to restrict unintended access to other, heavier methods. This way, we can create a shell class with the limited functionality we want to expose, and then provide it as is, while actually using the full-blown third-party service under the hood.

```js
// list only the methods we want
type ExposedThirdPartyApi = Pick<ThirdPartyService, 'someMethod' | 'someOtherMethod'>;

export abstract class ShellService implements ExposedThirdPartyApi {
    abstract someMethod(): void;
    abstract someOtherMethod(): void;
}
```

And then we can just provide the third-party service through this shell service:

```js
export const appConfig: ApplicationConfig = {
  providers: [{ provide: ShellService, useExisting: ThirdPartyService }],
};
```

And then, we can simply use the shell service to only access the methods that our application configuration allows:

```js
@Injectable()
export class SomeService {
    private readonly shellService = inject(ShellService);

    getData() {
        return this.shellService.someMethod();
    }
}
```

_These options like useValue, useExisting and so on can be used anywhere where providers can be defined, like routes or specific components (in the metadata providers option), not just in the application config._

However, other methods are inaccessible. This approach is really good for making things private while not directly owning the code that defines them, as is the case with third-party APIs.

### useFactory

Finally, we arrive at the most important and interesting piece of this puzzle, and that is providing a dependency dynamically, through the useFactory option. This option allows us to define a function that will be called when the dependency is requested, and it will return the instance which will be determined programmatically. For instance, a very basic example of this would be to determine which service to use depending on an environment.

For example, we might have several different logging services; the one used in local development should just log messages to the console, while the one used in production should log to a third-party service. We can create a factory function that will return the correct service based on the environment:

```js
import { environment } from "./environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LoggerService,
      useFactory: () => {
        if (environment.production) {
          return new ThirdPartyLoggerService();
        }

        return new ConsoleLoggerService();
      },
    },
  ],
};
```

And then, we can simply inject the logger service anywhere in our application:

```js
@Injectable()
export class SomeService {
    private readonly logger = inject(LoggerService);

    getData() {
        this.logger.log('Some data');
    }
}
```

_We should be careful to make the different implementation of the same service to have the same methods, for instance, through defining an interface and having both services implement it._

Now, as we are familiar with all options, we can further dive into the useFactory pattern and discover some scenarios.

### Dynamic dependencies with query parameters

When writing Angular apps, we are always careful to notice some "static" (for the lack of a better word) things like services and providers, and "dynamic" things like component state, routing data (like query parameters), and so on.
Usually, we think of those as two separate worlds - services get provided and configured when the the app starts, and then components get injected with the services and data they need.

Let's review the following scenario. We have an app to show financial transactions, of which we have expenses and incomes. While the two are related, there are some internal concerns of how a service working with an expense should behave differently than one working with an income. Both services, however, have the same interface, and, furthermore, both the expenses and income components have absolutely the same UI. So, for us, it would make sense to have two services, but only one component, but determine which one to use based on a, for instance, query parameter.

Let's see this in action. First, we need an interface that both services will strictly implement:

```js
export abstract class TransactionService {
    abstract getTransactions(): Observable<Transaction[]>;
    abstract addTransaction(transaction: Transaction): void;
    abstract deleteTransaction(id: number): void;
}
```

_We are using an abstract class instead of an interface because interfaces get removed when TypeScript compiles the code, so it cannot be used as a DI token. Abstract classes, on the other hand, are not removed, and can be used as a DI token, and also implemented like an interface, as we are going to do in this example._

Now, we can have two services, one for expenses and one for incomes:

```js
@Injectable()
export class ExpensesService implements TransactionService {
    private readonly http = inject(HttpClient);

    getTransactions() {
        return this.http.get<Transaction[]>('/api/transactions');
    }

    addTransaction(transaction: Transaction) {
        this.http.post('/api/transactions', transaction);
    }

    deleteTransaction(id: number) {
        this.http.delete(`/api/transactions/${id}`);
    }
}
```

```js
@Injectable()
export class IncomeService implements TransactionService {
    private readonly http = inject(HttpClient);

    getTransactions() {
        return this.http.get<Transaction[]>('/api/transactions/income');
    }

    addTransaction(transaction: Transaction) {
        this.http.post('/api/transactions/income', transaction);
    }

    deleteTransaction(id: number) {
        this.http.delete(`/api/transactions/income/${id}`);
    }
}
```

Now, all of this has been fairly simple, but how do we then provide the correct one for a specific component, and based on a query parameter no less? Turns out, factories can help us here massively.

```js
@Component({
    providers: [
        {
            provide: TransactionService,
            useFactory: (route: ActivatedRoute) => {
                switch (route.snapshot.queryParamMap.get('type')) {
                    case 'income':
                        return new IncomeService();
                    case 'expense':
                        return new ExpensesService();
                    default:
                        throw new Error('Invalid query parameter');
                }
            },
            deps: [ActivatedRoute],
        }
    ],
})
export class TransactionsComponent {
    private readonly transactionService = inject(TransactionService);

    addTransaction(transaction: Transaction) {
        this.transactionService.addTransaction(transaction);
    }
}
```

As you can see, we are using a factory function that will be called when the component is created. The component then injects the TransactionService abstract class, which is guaranteed to have the same interface as the two services we created. So, based on the query parameter we get, we can provide the correct service to the component.

Now, this gives us a fantastic level of flexibility here. Now, next, let's tackle an issue that lots of people do not realized is essentially fixable with DI, and that is sharing complex data structures between components.

"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[6575],{5647:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"frontend/angular/dependency-injection","title":"Dependency Injection in Angular","description":"Resources","source":"@site/docs/frontend/angular/dependency-injection.md","sourceDirName":"frontend/angular","slug":"/frontend/angular/dependency-injection","permalink":"/av-docs/docs/frontend/angular/dependency-injection","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend/angular/dependency-injection.md","tags":[],"version":"current","frontMatter":{},"sidebar":"frontendSidebar","previous":{"title":"Hierarchical Injectors","permalink":"/av-docs/docs/frontend/angular/injectors"},"next":{"title":"Intro","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/"}}');var a=t(4848),s=t(8453);const r={},o="Dependency Injection in Angular",c={},l=[{value:"Resources",id:"resources",level:2},{value:"Concepts",id:"concepts",level:2},{value:"DI mechanism",id:"di-mechanism",level:2},{value:"Element Injector",id:"element-injector",level:3},{value:"Providing dependencies",id:"providing-dependencies",level:2},{value:"useValue",id:"usevalue",level:3},{value:"useExisting",id:"useexisting",level:3},{value:"useFactory",id:"usefactory",level:3},{value:"Dynamic dependencies with query parameters",id:"dynamic-dependencies-with-query-parameters",level:3}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"dependency-injection-in-angular",children:"Dependency Injection in Angular"})}),"\n",(0,a.jsx)(n.h2,{id:"resources",children:"Resources"}),"\n",(0,a.jsxs)(n.p,{children:["Official guide at ",(0,a.jsx)(n.a,{href:"https://angular.dev/guide/di",children:"https://angular.dev/guide/di"}),"\nor ",(0,a.jsx)(n.a,{href:"https://v17.angular.io/guide/dependency-injection",children:"https://angular.io/guide/dependency-injection"})]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://www.angularspace.com/fascinating-dependency-injection/",children:"https://www.angularspace.com/fascinating-dependency-injection/"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://codeburst.io/angular-dependency-injection-tips-ddb24b8244be",children:"https://codeburst.io/angular-dependency-injection-tips-ddb24b8244be"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://angular.love/cracking-angular-di-the-hidden-layers-of-injectors",children:"https://angular.love/cracking-angular-di-the-hidden-layers-of-injectors"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://dev.to/this-is-angular/always-use-inject-2do4?ref=angularspace.com",children:"https://dev.to/this-is-angular/always-use-inject-2do4?ref=angularspace.com"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://www.angularspace.com/mega-article-superpowers-with-directives-and-dependency-injection/",children:"https://www.angularspace.com/mega-article-superpowers-with-directives-and-dependency-injection/"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://medium.com/palo-alto-networks-cortex-dev/angulars-dependency-injection-system-and-how-to-use-it-470c3e3e9be1",children:"https://medium.com/palo-alto-networks-cortex-dev/angulars-dependency-injection-system-and-how-to-use-it-470c3e3e9be1"})}),"\n",(0,a.jsx)(n.p,{children:"Here are several short rules on how to work with DI in Angular:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Always inject every value into your component, never rely on global variables, variables from other files and so on. As a rule of thumb, if you find any method of your class referencing anything other than properties from that class or local variables, change your class s it receives that value as an injected dependency (like we did with the environment variables)"}),"\n",(0,a.jsx)(n.li,{children:"Never use string tokens for DI. In Angular it is possible to give the Inject decorator a string for it to look up the dependency. Never do that \u2014 a typo is always a possibility. Also, you cannot rely on IntelliSense to autocomplete it for you. Use an InjectionToken instead."}),"\n",(0,a.jsx)(n.li,{children:"Remember than instances of services are shared between components at least on the module level, so if any properties on that services are not meant to be modified from the outside world, consider marking them as readonly."}),"\n",(0,a.jsx)(n.li,{children:"If you are using a class to be provided instead of another one, make sure you implement them like we did in the second example. This way if the replaced dependency\u2019s interface changes, we will have to reimplement the class that is meant to replace it, so we don\u2019t run into cryptic errors."}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"concepts",children:"Concepts"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://angular.io/guide/glossary#provider",children:"Provider"}),"\n",(0,a.jsx)(n.a,{href:"https://angular.io/guide/dependency-injection-providers#configuring-dependency-providers",children:"Configure Provider"}),"\n",(0,a.jsx)(n.a,{href:"https://angular.io/guide/dependency-injection-in-action#dependency-injection-in-action",children:"DI in action"})]}),"\n",(0,a.jsx)(n.p,{children:"Dependency consumer"}),"\n",(0,a.jsx)(n.h2,{id:"di-mechanism",children:"DI mechanism"}),"\n",(0,a.jsxs)(n.p,{children:["Dependency Injection (DI) is a technique build on a ",(0,a.jsx)(n.a,{href:"./injectors",children:"hierarchical structure of injectors"}),", that we use every single day as Angular developers. It allows us to reuse things for classes with Angular decorators, such as Components, Directives, Pipes, and Injectables, to configure dependencies that they need, access native constructs like HttpClient, retrieve data from routing, and much more."]}),"\n",(0,a.jsx)(n.p,{children:"Two main roles exist in the DI system: dependency consumer and dependency provider."}),"\n",(0,a.jsx)(n.p,{children:'Angular facilitates the interaction between dependency consumers and dependency providers using an abstraction called Injector. When a dependency is requested, the injector checks its registry to see if there is an instance already available there. If not, a new instance is created and stored in the registry. Angular creates an application-wide injector (also known as "root" injector) during the application bootstrap process, as well as any other injectors as needed. In most cases you don\'t need to manually create injectors, but you should know that there is a layer that connects providers and consumers.'}),"\n",(0,a.jsxs)(n.p,{children:["DI is closely tied to the DOM structure of the application. When our application renders the UI, for each HTML element it renders in the DOM, it also creates a special object, named ",(0,a.jsx)(n.a,{href:"https://angular.io/guide/hierarchical-dependency-injection#elementinjector",children:"ElementInjector"}),", that is responsible for dependency injection in the context of that element and its children."]}),"\n",(0,a.jsx)(n.h3,{id:"element-injector",children:"Element Injector"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://angular.io/guide/hierarchical-dependency-injection#elementinjector",children:(0,a.jsx)(n.strong,{children:"Element injector"})}),' can be imagined as an object that has a parent injector (the one that has been created for this element\'s parent), and has a "dictionary" of tokens and their corresponding instances.']}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Directive({\n    selector: '[appSome]',\n})\nexport class SomeDirective implements OnInit {\n    private readonly elementRef = inject(ElementRef);\n\n    ngOnInit() {\n        console.log(this.elementRef.nativeElement);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Now, if we use this directive twice in the same template"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-html",children:"<div appSome>\n  <span appSome>Text</span>\n</div>\n"})}),"\n",(0,a.jsx)(n.p,{children:"We will get different elements logged in the console, despite having injected the same ElementRef. This is because each of these elements has its own element injector, for which Angular automatically provides the ElementRef instance. Then, when we use the directive, Angular will ask the element injector for the instance of the token, and it will return different objects for each element."}),"\n",(0,a.jsx)(n.p,{children:"When we ask for a dependency, Angular first looks at the nearest element injector (what we know as the host element - in this case, the element on which the directive is applied), and, if it finds the token, it will return the instance that was previously provided for that token (ElementRef in our case)."}),"\n",(0,a.jsxs)(n.p,{children:["If it does not find the token, it will ask its parent element injector, until it reaches the root injector. After the root injector, it will ask the platform injector, if the dependency is not also found there, Angular will move to the very top of the hierarchy, where it stumbles upon the ",(0,a.jsx)(n.a,{href:"https://angular.dev/errors/NG0201",children:(0,a.jsx)(n.strong,{children:"NullInjector"})}),', a word familiar to all Angular developers from the iconic "NullInjectorError: No provider for token". NullInjector is a special injector that is empty and always throws an error when asked for any token.']}),"\n",(0,a.jsxs)(n.p,{children:["this process is similar to how ",(0,a.jsx)(n.a,{href:"/docs/languages/javascript#object-prototypes",children:"prototypes work in JavaScript"}),". When we ask for a property in any object, it first looks into the object itself, then its prototype, and so on, until it reaches the Object.prototype, and then tries accessing its prototype, which is null, thus throwing an error. This is beautiful similarity that is useful to remember when we are dealing with DI."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"The process of hierarchical lookup of DI tokens can be modified by different options like Host, Optional, and so on."})}),"\n",(0,a.jsx)(n.h2,{id:"providing-dependencies",children:"Providing dependencies"}),"\n",(0,a.jsx)(n.p,{children:"Now this is the place where a lot of our DI magic happens. Obviously, following the lookup process, any dependency that want to inject must first be provided somewhere. Some dependencies, like ElementRef that we encountered previously, are automatically provided by Angular when the corresponding element and its injector are being created. Some, of course, more well known to us, have to be manually provided."}),"\n",(0,a.jsx)(n.p,{children:"Understanding what options we have when providing dependencies will help us utilize it in a way that minimizes boilerplate code everywhere in our application. Let's start with the simplest one: providing a dependency via a class:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"export const appConfig: ApplicationConfig = {\n  providers: [SomeService],\n};\n"})}),"\n",(0,a.jsx)(n.p,{children:"Same as:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"export const appConfig: ApplicationConfig = {\n  providers: [{ provide: SomeService, useClass: SomeService }],\n};\n"})}),"\n",(0,a.jsxs)(n.p,{children:["As this is self-describing, Angular just gives us a shorthand way to simply declare the class we want to provide. Of course, this is nowadays found only when some service is not provided in the root of our application(",(0,a.jsx)(n.code,{children:"providedIn: root"}),"), which is not often (although an absolutely valid case!)."]}),"\n",(0,a.jsx)(n.p,{children:"Now, we can also provide a value instead of a class that needs to be instantiated. This is useful for sharing some global configurations wile keeping the type-safety. For instance, lots of Angular apps utilize environments, special files that get replaced with specific values depending on the type of a build we perform (development, staging, production, etc.)."}),"\n",(0,a.jsx)(n.h3,{id:"usevalue",children:"useValue"}),"\n",(0,a.jsx)(n.p,{children:"A good practice is to create a token (or maybe a class) that has the same type as whatever data we have in the environment files, for instant, if we have an environment like this:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'export const environment = {\n  production: true,\n  apiUrl: "https://api.example.com",\n};\n'})}),"\n",(0,a.jsx)(n.p,{children:"We can create a class that reflects this data so we can inject it anywhere:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"export class ApplicationConfig {\n    readonly production: boolean;\n    readonly apiUrl: string;\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Finally, we can utilize the ",(0,a.jsx)(n.code,{children:"useValue"})," option to provide the value of the class we created:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'import { environment } from "./environments/environment";\n\nexport const appConfig: ApplicationConfig = [\n  { provide: ApplicationConfig, useValue: environment },\n];\n'})}),"\n",(0,a.jsx)(n.p,{children:"And then we can just inject the environment anywhere without the need to reference the environment file:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Injectable()\nexport class SomeService {\n    private readonly environment = inject(Environment);\n    private readonly http = inject(HttpClient);\n\n    getData() {\n        return this.http.get(this.environment.apiUrl + '/data');\n    }\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"useexisting",children:"useExisting"}),"\n",(0,a.jsxs)(n.p,{children:["Next option is the ",(0,a.jsx)(n.code,{children:"useExisting"}),". This is rarely used, however it can be useful if we want to limit our developers using a third-party API. For instance, some other Angular service that we do not own might have multiple methods and properties that can do dramatic things like manipulate the DOM structure of our application or maybe register multiple event listeners, affecting the change detection process."]}),"\n",(0,a.jsx)(n.p,{children:"However, we might only be interested in some utility methods from the service, and want to restrict unintended access to other, heavier methods. This way, we can create a shell class with the limited functionality we want to expose, and then provide it as is, while actually using the full-blown third-party service under the hood."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// list only the methods we want\ntype ExposedThirdPartyApi = Pick<ThirdPartyService, 'someMethod' | 'someOtherMethod'>;\n\nexport abstract class ShellService implements ExposedThirdPartyApi {\n    abstract someMethod(): void;\n    abstract someOtherMethod(): void;\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"And then we can just provide the third-party service through this shell service:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"export const appConfig: ApplicationConfig = {\n  providers: [{ provide: ShellService, useExisting: ThirdPartyService }],\n};\n"})}),"\n",(0,a.jsx)(n.p,{children:"And then, we can simply use the shell service to only access the methods that our application configuration allows:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Injectable()\nexport class SomeService {\n    private readonly shellService = inject(ShellService);\n\n    getData() {\n        return this.shellService.someMethod();\n    }\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"These options like useValue, useExisting and so on can be used anywhere where providers can be defined, like routes or specific components (in the metadata providers option), not just in the application config."})}),"\n",(0,a.jsx)(n.p,{children:"However, other methods are inaccessible. This approach is really good for making things private while not directly owning the code that defines them, as is the case with third-party APIs."}),"\n",(0,a.jsx)(n.h3,{id:"usefactory",children:"useFactory"}),"\n",(0,a.jsx)(n.p,{children:"Finally, we arrive at the most important and interesting piece of this puzzle, and that is providing a dependency dynamically, through the useFactory option. This option allows us to define a function that will be called when the dependency is requested, and it will return the instance which will be determined programmatically. For instance, a very basic example of this would be to determine which service to use depending on an environment."}),"\n",(0,a.jsx)(n.p,{children:"For example, we might have several different logging services; the one used in local development should just log messages to the console, while the one used in production should log to a third-party service. We can create a factory function that will return the correct service based on the environment:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:'import { environment } from "./environments/environment";\n\nexport const appConfig: ApplicationConfig = {\n  providers: [\n    {\n      provide: LoggerService,\n      useFactory: () => {\n        if (environment.production) {\n          return new ThirdPartyLoggerService();\n        }\n\n        return new ConsoleLoggerService();\n      },\n    },\n  ],\n};\n'})}),"\n",(0,a.jsx)(n.p,{children:"And then, we can simply inject the logger service anywhere in our application:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Injectable()\nexport class SomeService {\n    private readonly logger = inject(LoggerService);\n\n    getData() {\n        this.logger.log('Some data');\n    }\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"We should be careful to make the different implementation of the same service to have the same methods, for instance, through defining an interface and having both services implement it."})}),"\n",(0,a.jsx)(n.p,{children:"Now, as we are familiar with all options, we can further dive into the useFactory pattern and discover some scenarios."}),"\n",(0,a.jsx)(n.h3,{id:"dynamic-dependencies-with-query-parameters",children:"Dynamic dependencies with query parameters"}),"\n",(0,a.jsx)(n.p,{children:'When writing Angular apps, we are always careful to notice some "static" (for the lack of a better word) things like services and providers, and "dynamic" things like component state, routing data (like query parameters), and so on.\nUsually, we think of those as two separate worlds - services get provided and configured when the the app starts, and then components get injected with the services and data they need.'}),"\n",(0,a.jsx)(n.p,{children:"Let's review the following scenario. We have an app to show financial transactions, of which we have expenses and incomes. While the two are related, there are some internal concerns of how a service working with an expense should behave differently than one working with an income. Both services, however, have the same interface, and, furthermore, both the expenses and income components have absolutely the same UI. So, for us, it would make sense to have two services, but only one component, but determine which one to use based on a, for instance, query parameter."}),"\n",(0,a.jsx)(n.p,{children:"Let's see this in action. First, we need an interface that both services will strictly implement:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"export abstract class TransactionService {\n    abstract getTransactions(): Observable<Transaction[]>;\n    abstract addTransaction(transaction: Transaction): void;\n    abstract deleteTransaction(id: number): void;\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.em,{children:"We are using an abstract class instead of an interface because interfaces get removed when TypeScript compiles the code, so it cannot be used as a DI token. Abstract classes, on the other hand, are not removed, and can be used as a DI token, and also implemented like an interface, as we are going to do in this example."})}),"\n",(0,a.jsx)(n.p,{children:"Now, we can have two services, one for expenses and one for incomes:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Injectable()\nexport class ExpensesService implements TransactionService {\n    private readonly http = inject(HttpClient);\n\n    getTransactions() {\n        return this.http.get<Transaction[]>('/api/transactions');\n    }\n\n    addTransaction(transaction: Transaction) {\n        this.http.post('/api/transactions', transaction);\n    }\n\n    deleteTransaction(id: number) {\n        this.http.delete(`/api/transactions/${id}`);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Injectable()\nexport class IncomeService implements TransactionService {\n    private readonly http = inject(HttpClient);\n\n    getTransactions() {\n        return this.http.get<Transaction[]>('/api/transactions/income');\n    }\n\n    addTransaction(transaction: Transaction) {\n        this.http.post('/api/transactions/income', transaction);\n    }\n\n    deleteTransaction(id: number) {\n        this.http.delete(`/api/transactions/income/${id}`);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Now, all of this has been fairly simple, but how do we then provide the correct one for a specific component, and based on a query parameter no less? Turns out, factories can help us here massively."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"@Component({\n    providers: [\n        {\n            provide: TransactionService,\n            useFactory: (route: ActivatedRoute) => {\n                switch (route.snapshot.queryParamMap.get('type')) {\n                    case 'income':\n                        return new IncomeService();\n                    case 'expense':\n                        return new ExpensesService();\n                    default:\n                        throw new Error('Invalid query parameter');\n                }\n            },\n            deps: [ActivatedRoute],\n        }\n    ],\n})\nexport class TransactionsComponent {\n    private readonly transactionService = inject(TransactionService);\n\n    addTransaction(transaction: Transaction) {\n        this.transactionService.addTransaction(transaction);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"As you can see, we are using a factory function that will be called when the component is created. The component then injects the TransactionService abstract class, which is guaranteed to have the same interface as the two services we created. So, based on the query parameter we get, we can provide the correct service to the component."}),"\n",(0,a.jsx)(n.p,{children:"Now, this gives us a fantastic level of flexibility here. Now, next, let's tackle an issue that lots of people do not realized is essentially fixable with DI, and that is sharing complex data structures between components."})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var i=t(6540);const a={},s=i.createContext(a);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);
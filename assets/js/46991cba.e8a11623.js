"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[1760],{9384:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>g,frontMatter:()=>a,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"frontend/angular/design-patterns/creational-patterns/singleton","title":"Singleton Pattern","description":"Use case: Shared service instances across the application.","source":"@site/docs/frontend/angular/design-patterns/creational-patterns/singleton.md","sourceDirName":"frontend/angular/design-patterns/creational-patterns","slug":"/frontend/angular/design-patterns/creational-patterns/singleton","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/singleton","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend/angular/design-patterns/creational-patterns/singleton.md","tags":[],"version":"current","frontMatter":{},"sidebar":"frontendSidebar","previous":{"title":"Prototype","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/prototype"},"next":{"title":"Intro","permalink":"/av-docs/docs/frontend/angular/design-patterns/structural-patterns/"}}');var i=t(4848),s=t(8453);const a={},r="Singleton Pattern",c={},l=[{value:"Singleton Pattern",id:"singleton-pattern-1",level:3},{value:"When to use",id:"when-to-use",level:4},{value:"Advantages:",id:"advantages",level:5},{value:"Weaknesses:",id:"weaknesses",level:6}];function d(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",h4:"h4",h5:"h5",h6:"h6",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"singleton-pattern",children:"Singleton Pattern"})}),"\n",(0,i.jsx)(n.p,{children:"Use case: Shared service instances across the application."}),"\n",(0,i.jsx)(n.p,{children:"Example: Angular's built-in services like HttpClient provided via dependency injection."}),"\n",(0,i.jsxs)(n.p,{children:["How to find: Look for ",(0,i.jsx)(n.code,{children:"@Injectable({ providedIn: 'root' })"})," decorators."]}),"\n",(0,i.jsx)(n.p,{children:"In Angular, services are often singletons when provided in the root injector. This means there's only one instance of the service throughout the application. The Singleton pattern ensures a class has only one instance and provides a global point of access to it."}),"\n",(0,i.jsxs)(n.p,{children:["By using ",(0,i.jsx)(n.code,{children:"@Injectable({ providedIn: 'root' })"}),", Angular ensures that the service is registered with the root injector, making it a singleton. This is useful for services that maintain state or provide utility functions that need to be shared across multiple components."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"// logging.service.ts\nimport { Injectable } from '@angular/core';\n\n@Injectable({\n  providedIn: 'root',\n})\nexport class LoggingService {\n  private logs: string[] = [];\n\n  add(message: string) {\n    this.logs.push(message);\n    console.log('Log added:', message);\n  }\n\n  clear() {\n    this.logs = [];\n    console.log('Logs cleared');\n  }\n\n  getLogs() {\n    return this.logs;\n  }\n}\n\n// any-component.component.ts\nimport { Component } from '@angular/core';\nimport { LoggingService } from './logging.service';\n\n@Component({\n  selector: 'app-any-component',\n  template: `<button (click)=\"doSomething()\">Do Something</button>`,\n})\nexport class AnyComponent {\n  constructor(private loggingService: LoggingService) {}\n\n  doSomething() {\n    this.loggingService.add('AnyComponent did something.');\n  }\n}\n\n// another-component.component.ts\nimport { Component } from '@angular/core';\nimport { LoggingService } from './logging.service';\n\n@Component({\n  selector: 'app-another-component',\n  template: `<button (click)=\"doSomethingElse()\">Do Something Else</button>`,\n})\nexport class AnotherComponent {\n  constructor(private loggingService: LoggingService) {}\n\n  doSomethingElse() {\n    this.loggingService.add('AnotherComponent did something else.');\n  }\n}\n\n// app.component.ts\nimport { Component } from '@angular/core';\nimport { LoggingService } from './logging.service';\n\n@Component({\n  selector: 'app-root',\n  template: `\n    <app-any-component></app-any-component>\n    <app-another-component></app-another-component>\n    <button (click)=\"showLogs()\">Show Logs</button>\n  `,\n})\nexport class AppComponent {\n  constructor(private loggingService: LoggingService) {}\n\n  showLogs() {\n    console.log(this.loggingService.getLogs());\n  }\n}\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The LoggingService is provided in the root injector, making it a singleton."}),"\n",(0,i.jsx)(n.li,{children:"Multiple components inject LoggingService and interact with the same instance."}),"\n",(0,i.jsx)(n.li,{children:"The logs collected from different components are stored in the same service instance."}),"\n",(0,i.jsx)(n.li,{children:"This demonstrates the Singleton pattern by ensuring there's only one LoggingService instance shared across the application."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"singleton-pattern-1",children:"Singleton Pattern"}),"\n",(0,i.jsx)(n.p,{children:"There are two ways to make a service a singleton in Angular:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Set the providedIn property of the ",(0,i.jsx)(n.code,{children:"@Injectable()"})," to ",(0,i.jsx)(n.code,{children:'"root"'})]}),"\n",(0,i.jsx)(n.li,{children:"Include the service in the AppModule or in a module that is only imported by the AppModule"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://angular.io/guide/singleton-services",children:"https://angular.io/guide/singleton-services"})," ",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://www.geeksforgeeks.org/singleton-design-pattern/",children:"https://www.geeksforgeeks.org/singleton-design-pattern/"})," ",(0,i.jsx)("br",{})]}),"\n",(0,i.jsx)(n.p,{children:"A component or service that is instantiated only once and is available to all other components or services that need it. This way, all components can share the same information and work together in a coordinated manner."}),"\n",(0,i.jsx)(n.p,{children:"For example, we can create a singleton service that handles all the authentication and authorization logic in our application. To create a singleton service, we can use the providedIn property in the @Injectable decorator to set the value to \u2018root\u2019. This ensures that the service is only instantiated once and is available throughout the entire application."}),"\n",(0,i.jsx)(n.p,{children:"Here is an example implementation of a singleton service in Angular:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { Injectable } from "@angular/core";\n\n@Injectable({\n  providedIn: "root",\n})\nexport class AuthService {\n  // authentication and authorization logic\n\n  constructor() {}\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["By setting providedIn to \u2018root\u2019, we ensure that the service is only instantiated once and is available throughout the entire application. More in ",(0,i.jsx)(n.a,{href:"/av-docs/docs/frontend/angular/injectors#providedin-root",children:"Injectable providedIn root"})]}),"\n",(0,i.jsx)(n.h4,{id:"when-to-use",children:"When to use"}),"\n",(0,i.jsx)(n.h5,{id:"advantages",children:"Advantages:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Ensures that all components have access to the same information and avoids errors or inconsistencies in the application."}),"\n",(0,i.jsx)(n.li,{children:"Improves the efficiency and performance of the application, as unnecessary multiple instances of a component or service are not created."}),"\n",(0,i.jsx)(n.li,{children:"Facilitates problem-solving and code maintenance, as all components can access the same information and achieve a common goal."}),"\n"]}),"\n",(0,i.jsx)(n.h6,{id:"weaknesses",children:"Weaknesses:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Tight coupling, makes harder to refactor, considered anti-pattern."}),"\n",(0,i.jsx)(n.li,{children:"Singleton introduces global state into your application, which can make it difficult to manage and test. Changes to the Singleton instance affect the entire application, potentially leading to unintended consequences."}),"\n",(0,i.jsx)(n.li,{children:"Singletons can make unit testing difficult since they introduce a global state. This can complicate testing components that depend on a Singleton, as its state can influence the test results."}),"\n",(0,i.jsx)(n.li,{children:"Scalling issues, becomes overbloated."}),"\n",(0,i.jsx)(n.li,{children:"Singleton introduces global state into your application, which can make it difficult to manage and test."}),"\n",(0,i.jsx)(n.li,{children:"Changes to the Singleton instance affect the entire application, potentially leading to unintended consequences."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Examples of anti-pattern:"}),"\n",(0,i.jsx)(n.p,{children:"Global State and Hidden Dependencies:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"An application uses a Singleton for managing configuration settings. Any class can access and modify the configuration settings, leading to unexpected behaviors. The global state makes it hard to track which part of the code changes the settings, causing hidden dependencies and making debugging difficult.\nTesting Difficulties:"}),"\n",(0,i.jsx)(n.li,{children:"A logging system is implemented as a Singleton to ensure a single point of logging. During unit tests, it's challenging to isolate the logger from other parts of the application. Mocking the Singleton is complex, and tests might inadvertently affect each other due to shared state.\nConcurrency Problems:"}),"\n",(0,i.jsx)(n.li,{children:"A Singleton is used for managing database connections in a multi-threaded application. If the Singleton is not properly synchronized, it can lead to race conditions and inconsistent states. Multiple threads accessing the Singleton simultaneously can cause performance bottlenecks and data corruption.\nScalability Constraints:"}),"\n",(0,i.jsx)(n.li,{children:"An application uses a Singleton for a cache system to store frequently accessed data. As the application scales, the single cache instance becomes a bottleneck. It cannot efficiently handle a high volume of requests, leading to performance degradation.\nInflexibility:"}),"\n",(0,i.jsx)(n.li,{children:"A Singleton is used to manage service instances in a microservices architecture. The tight coupling introduced by the Singleton makes it difficult to change or replace the service implementation. It limits flexibility and slows down the ability to adapt to new requirements or technologies.\nMemory Leaks:"}),"\n",(0,i.jsx)(n.li,{children:"A Singleton is used to manage a pool of reusable objects. If the Singleton holds references to objects that are no longer needed, it can prevent them from being garbage collected, leading to memory leaks and increased memory usage over time.\nEnvironment-Specific Issues:"}),"\n",(0,i.jsx)(n.li,{children:"A Singleton is used for environment-specific configurations (e.g., development, testing, production). The Singleton's state can be inadvertently carried over from one environment to another, causing environment-specific bugs and making it hard to replicate issues consistently across different environments."}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var o=t(6540);const i={},s=o.createContext(i);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);
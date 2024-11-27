"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[746],{4233:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"frontend/angular/injectors","title":"Hierarchical Injectors","description":"https://angular.dev/guide/di/hierarchical-dependency-injection","source":"@site/docs/frontend/angular/injectors.md","sourceDirName":"frontend/angular","slug":"/frontend/angular/injectors","permalink":"/av-docs/docs/frontend/angular/injectors","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend/angular/injectors.md","tags":[],"version":"current","frontMatter":{},"sidebar":"frontendSidebar","previous":{"title":"Intro","permalink":"/av-docs/docs/frontend/angular/"},"next":{"title":"Dependency Injection in Angular","permalink":"/av-docs/docs/frontend/angular/dependency-injection"}}');var s=i(4848),r=i(8453);const o={},a="Hierarchical Injectors",c={},l=[{value:"Use cases",id:"use-cases",level:2},{value:"InjectionToken",id:"injectiontoken",level:3},{value:"providedIn: root",id:"providedin-root",level:4},{value:"Injectable default",id:"injectable-default",level:4},{value:"Mocking test services",id:"mocking-test-services",level:3},{value:"Scoped services for component and its children",id:"scoped-services-for-component-and-its-children",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"hierarchical-injectors",children:"Hierarchical Injectors"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://angular.dev/guide/di/hierarchical-dependency-injection",children:"https://angular.dev/guide/di/hierarchical-dependency-injection"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://www.geeksforgeeks.org/what-is-the-purpose-of-providedin-in-angular-services/",children:"https://www.geeksforgeeks.org/what-is-the-purpose-of-providedin-in-angular-services/"})}),"\n",(0,s.jsx)(n.p,{children:"The applications you build with Angular can become quite large, and one way to manage this complexity is to split up the application into a well-defined tree of components."}),"\n",(0,s.jsx)(n.p,{children:"There can be sections of your page that works in a completely independent way than the rest of the application, with its own local copies of the services and other dependencies that it needs. Some of the services that these sections of the application use might be shared with other parts of the application, or with parent components that are further up in the component tree, while other dependencies are meant to be private."}),"\n",(0,s.jsx)(n.p,{children:"With hierarchical dependency injection, you can isolate sections of the application and give them their own private dependencies not shared with the rest of the application, or have parent components share certain dependencies with its child components only but not with the rest of the component tree, and so on. Hierarchical dependency injection enables you to share dependencies between different parts of the application only when and if you need to."}),"\n",(0,s.jsx)(n.p,{children:"Here's a simplified algorithm:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Angular uses the current injector."}),"\n",(0,s.jsx)(n.li,{children:"Injector.get(token) is called with a service's token."}),"\n",(0,s.jsx)(n.li,{children:"If the injector finds the token, it either creates and returns a new instance of the service or provides an existing instance."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"use-cases",children:"Use cases"}),"\n",(0,s.jsx)(n.h3,{id:"injectiontoken",children:"InjectionToken"}),"\n",(0,s.jsx)(n.p,{children:"Injection tokens are an Angular concept which allow us to declare independent unique dependency injection tokens to inject values into other classes using the Inject decorator."}),"\n",(0,s.jsxs)(n.p,{children:["TODO: explore wide usage of InjectionToken's\n",(0,s.jsx)(n.a,{href:"https://kasiabiernat.github.io/blog/01-create-a-plugin-driven/",children:"Creating a plugin driven application"})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://angular.io/api/core/InjectionToken",children:"https://angular.io/api/core/InjectionToken"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Prevents circular dependencies."}),"\n",(0,s.jsx)(n.li,{children:"Offers type-safe configurations."}),"\n",(0,s.jsx)(n.li,{children:"Allows easy switching between implementations."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Having a logging system with different loggers (ConsoleLogger, FileLogger) and want to switch between them dynamically."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'export const LOGGER = new InjectionToken() < Logger > "Logger";\n\nexport class ConsoleLogger implements Logger {\n  log(message: string) {\n    console.log(message);\n  }\n}\n\nexport class FileLogger implements Logger {\n  log(message: string) {\n    console.log(`[File]: ${message}`);\n  }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Usage:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"providers: [\n  { provide: LOGGER, useClass: ConsoleLogger },\n  { provide: LOGGER, useClass: FileLogger, multi: true },\n];\n"})}),"\n",(0,s.jsx)(n.p,{children:"Base api url"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'import { InjectionToken } from "@angular/core";\nexport const BASE_API_TOKEN = new InjectionToken() < string > "Base API";\n\nexport const API_URL = "http://localhost:8080/api";\nexport const OTHER_API_URL = "http://localhost:9090/api";\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"providers: [{ provide: BASE_API_TOKEN, useValue: API_URL }],\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"@Injectable({\n  providedIn: 'root',\n})\nexport class CarplateService {\n  constructor(\n    private http: HttpClient,\n    @Inject(BASE_API_TOKEN) private apiUrl: string\n  ) {}\n\n  private endpointUrl = `${this.apiUrl}/carplates`;\n\n  ...\n}\n"})}),"\n",(0,s.jsx)(n.h4,{id:"providedin-root",children:"providedIn: root"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://angular.dev/api/core/Injectable",children:"https://angular.dev/api/core/Injectable"})}),"\n",(0,s.jsx)(n.p,{children:"When we use 'providedIn: root' we are telling Angular to provide the service in the root injector of the app. This means the following:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The service is ",(0,s.jsx)(n.strong,{children:"singleton"}),", a single instance is shared across the entire application."]}),"\n",(0,s.jsx)(n.li,{children:"The service is tree-shakable, if the service is not used anywhere, it will be removed during the build process."}),"\n",(0,s.jsx)(n.li,{children:"simplifies process of providing service, no need to add to providers array."}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"injectable-default",children:"Injectable default"}),"\n",(0,s.jsx)(n.p,{children:"Not using any options of injection results in encapsulated/scoped service within specific feature module. If the module is lazy-loaded, the service will be too. Useful if needs a new instance of a service for each component instance."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"@Injectable()\nexport class FeatureService {\n  // Service logic here\n}\n\n// In your feature module\n@NgModule({\n  providers: [FeatureService], // register as a provider\n  // Other module metadata\n})\nexport class FeatureModule {}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["With providedIn: 'root' If the service isn't injected anywhere, it will be ",(0,s.jsx)(n.a,{href:"https://webpack.js.org/guides/tree-shaking/",children:"tree-shaken"}),".\nWith Module Providers are included in the bundle when the module is imported, even if the service isn't used. If a service is provided in a module, and the module is imported, the service is included in the bundle, even if it's not used."]}),"\n",(0,s.jsx)(n.h3,{id:"mocking-test-services",children:"Mocking test services"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"beforeEach(() => {\n  TestBed.configureTestingModule({\n    providers: [\n      { provide: AuthService, useClass: MockAuthService }, // Override AuthService\n    ],\n  });\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"scoped-services-for-component-and-its-children",children:"Scoped services for component and its children"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'@Component({\n  selector: "app-tab",\n  template: `<div>Tab Content</div>`,\n  providers: [TabService], // Scoped to this component and its children for features like polling each tab resources individually\n})\nexport class TabComponent {}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>a});var t=i(6540);const s={},r=t.createContext(s);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[2414],{4455:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"frontend/angular/design-patterns/creational-patterns/factory-method","title":"Factory Method Pattern","description":"https://dev.to/coly010/the-factory-pattern-design-patterns-meet-the-frontend-1p2l","source":"@site/docs/frontend/angular/design-patterns/creational-patterns/factory-method.md","sourceDirName":"frontend/angular/design-patterns/creational-patterns","slug":"/frontend/angular/design-patterns/creational-patterns/factory-method","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/factory-method","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend/angular/design-patterns/creational-patterns/factory-method.md","tags":[],"version":"current","frontMatter":{},"sidebar":"frontendSidebar","previous":{"title":"Builder","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/builder"},"next":{"title":"Prototype","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/prototype"}}');var r=n(4848),a=n(8453);const s={},i="Factory Method Pattern",c={},l=[{value:"When should it be used",id:"when-should-it-be-used",level:2},{value:"Pros &amp; Cons",id:"pros--cons",level:2},{value:"FormFactory example",id:"formfactory-example",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"factory-method-pattern",children:"Factory Method Pattern"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://dev.to/coly010/the-factory-pattern-design-patterns-meet-the-frontend-1p2l",children:"https://dev.to/coly010/the-factory-pattern-design-patterns-meet-the-frontend-1p2l"})}),"\n",(0,r.jsx)(t.p,{children:"The Factory Pattern is a creational design pattern that adds an abstraction layer over common base behaviour between multiple objects of a generic type.\nThe client code, the code that will use this layer, does not need to know the specifics of the implementation of the behaviour, as long as it exists."}),"\n",(0,r.jsx)(t.p,{children:"Angular allows the usage of Factories in their Module Providers. Developers can provide dependencies to modules using a factory, which is extremely useful when information required for the provider is not available until Runtime."}),"\n",(0,r.jsx)(t.p,{children:"UML Diagram to illustrate it:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fhmeoq57v3cj12a329sng.png",children:"uml-diagram-factory-pattern"})}),"\n",(0,r.jsx)(t.h2,{id:"when-should-it-be-used",children:"When should it be used"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Any situation where at or during runtime you do not know the exact type or dependency a specific portion of your code needs to work with."}),"\n",(0,r.jsx)(t.li,{children:"If you are developing a library, using the Factory Pattern allows you to provide a method for consuming developers to extend its internal components without requiring access to the source itself!"}),"\n",(0,r.jsx)(t.li,{children:"If you need to save system resources, you can use this Pattern to create an Object Pool, where new objects are stored when they do not already exist, and will be retrieved from when they do exist, instead of creating a new one."}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"pros--cons",children:"Pros & Cons"}),"\n",(0,r.jsx)(t.p,{children:"Advantages:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"It avoids tight coupling between the Consumer of the Factory and the Concrete Implementations."}),"\n",(0,r.jsx)(t.li,{children:"In a way it meets the Single Responsibility Principle by allowing the creation code to be maintained in one area."}),"\n",(0,r.jsx)(t.li,{children:"It also meets the Open/Closed Principle by allowing new Concrete Implementations to be added without breaking the existing code."}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"Disadvantages:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"It can increase the complexity and maintainability of the codebase as it requires a lot of new subclasses for each Factory and Concrete Implementation"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"formfactory-example",children:"FormFactory example"}),"\n",(0,r.jsx)(t.p,{children:"Use case: Creating objects without specifying the exact class of object to be created."}),"\n",(0,r.jsx)(t.p,{children:"Example: Using a service to create different types of form controls."}),"\n",(0,r.jsx)(t.p,{children:"How to find: Look for methods that return instances of a common interface or base class."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"// form-control.factory.ts\nimport { Injectable } from '@angular/core';\nimport { FormControl, FormGroup, Validators } from '@angular/forms';\n\n@Injectable({\n  providedIn: 'root',\n})\nexport class FormControlFactory {\n  createControl(config: any): FormControl | FormGroup {\n    switch (config.type) {\n      case 'text':\n        return new FormControl('', Validators.required);\n      case 'email':\n        return new FormControl('', [Validators.required, Validators.email]);\n      case 'group':\n        const groupControls = {};\n        config.controls.forEach((ctrlConfig: any) => {\n          groupControls[ctrlConfig.name] = this.createControl(ctrlConfig);\n        });\n        return new FormGroup(groupControls);\n      default:\n        return new FormControl('');\n    }\n  }\n}\n\n// dynamic-form.component.ts\nimport { Component, OnInit } from '@angular/core';\nimport { FormControlFactory } from './form-control.factory';\nimport { FormGroup } from '@angular/forms';\n\n@Component({\n  selector: 'app-dynamic-form',\n  template: `\n    <form [formGroup]=\"formGroup\">\n      \x3c!-- form fields here --\x3e\n    </form>\n  `,\n})\nexport class DynamicFormComponent implements OnInit {\n  formGroup: FormGroup;\n\n  constructor(private formControlFactory: FormControlFactory) {}\n\n  ngOnInit() {\n    const formConfig = {\n      type: 'group',\n      controls: [\n        { name: 'name', type: 'text' },\n        { name: 'email', type: 'email' },\n      ],\n    };\n\n    this.formGroup = this.formControlFactory.createControl(formConfig) as FormGroup;\n  }\n}\n"})})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>i});var o=n(6540);const r={},a=o.createContext(r);function s(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:t},e.children)}}}]);
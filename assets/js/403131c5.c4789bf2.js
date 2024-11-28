"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[5499],{3125:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"frontend/angular/design-patterns/creational-patterns/builder","title":"Builder","description":"Use case: Complex object construction.","source":"@site/docs/frontend/angular/design-patterns/creational-patterns/builder.md","sourceDirName":"frontend/angular/design-patterns/creational-patterns","slug":"/frontend/angular/design-patterns/creational-patterns/builder","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/builder","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend/angular/design-patterns/creational-patterns/builder.md","tags":[],"version":"current","frontMatter":{},"sidebar":"frontendSidebar","previous":{"title":"Abstract Factory","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/abstract-factory"},"next":{"title":"Factory Method Pattern","permalink":"/av-docs/docs/frontend/angular/design-patterns/creational-patterns/factory-method"}}');var o=t(4848),a=t(8453);const s={},i="Builder",c={},l=[];function d(e){const n={code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"builder",children:"Builder"})}),"\n",(0,o.jsx)(n.p,{children:"Use case: Complex object construction."}),"\n",(0,o.jsx)(n.p,{children:"Example: Using FormBuilder to create complex reactive forms."}),"\n",(0,o.jsx)(n.p,{children:"How to find: Look for FormBuilder injection and usage in component files."}),"\n",(0,o.jsx)(n.p,{children:"The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. Angular's FormBuilder is an excellent example of this pattern, providing a fluent API to construct complex FormGroup instances."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"// user-form.component.ts\nimport { Component, OnInit } from '@angular/core';\nimport { FormBuilder, FormGroup, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-user-form',\n  template: `\n    <form [formGroup]=\"userForm\">\n      <label>\n        Name:\n        <input formControlName=\"name\" />\n      </label>\n\n      <div formGroupName=\"address\">\n        <label>\n          Street:\n          <input formControlName=\"street\" />\n        </label>\n        <label>\n          City:\n          <input formControlName=\"city\" />\n        </label>\n      </div>\n\n      <button [disabled]=\"!userForm.valid\">Submit</button>\n    </form>\n  `,\n})\nexport class UserFormComponent implements OnInit {\n  userForm: FormGroup;\n\n  constructor(private fb: FormBuilder) {}\n\n  ngOnInit() {\n    this.userForm = this.fb.group({\n      name: ['', Validators.required],\n      address: this.fb.group({\n        street: ['', Validators.required],\n        city: ['', Validators.required],\n      }),\n    });\n  }\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"The FormBuilder service is injected into the component.\nIt provides methods like group() to build a complex form structure in a readable and maintainable way.\nThis approach simplifies form creation and adheres to the Builder pattern by abstracting the construction logic."})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var r=t(6540);const o={},a=r.createContext(o);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);
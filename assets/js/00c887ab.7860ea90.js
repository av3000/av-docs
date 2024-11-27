"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[5648],{1545:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"system-design/concepts/index","title":"System Design Concepts","description":"Message Queue","source":"@site/docs/system-design/concepts/index.md","sourceDirName":"system-design/concepts","slug":"/system-design/concepts/","permalink":"/av-docs/docs/system-design/concepts/","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/system-design/concepts/index.md","tags":[],"version":"current","frontMatter":{},"sidebar":"systemDesignSidebar","previous":{"title":"RabbitMQ","permalink":"/av-docs/docs/system-design/software/rabbitmq/"},"next":{"title":"Cloud","permalink":"/av-docs/docs/system-design/concepts/cloud"}}');var i=n(4848),a=n(8453);const r={},c="System Design Concepts",o={},l=[{value:"Request: Stateful vs Stateless",id:"request-stateful-vs-stateless",level:2},{value:"<strong>Stateless</strong>",id:"stateless",level:3},{value:"<strong>Stateful</strong>",id:"stateful",level:3}];function d(e){const s={a:"a",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"system-design-concepts",children:"System Design Concepts"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/av-docs/docs/system-design/concepts/message-queue",children:"Message Queue"})}),"\n",(0,i.jsx)(s.h2,{id:"request-stateful-vs-stateless",children:"Request: Stateful vs Stateless"}),"\n",(0,i.jsx)(s.h3,{id:"stateless",children:(0,i.jsx)(s.strong,{children:"Stateless"})}),"\n",(0,i.jsx)(s.p,{children:"In stateless communication, each request from a client to a server is independent. The server does not retain any session information or status about the client between requests."}),"\n",(0,i.jsx)(s.p,{children:"Characteristics are:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Scalability: Easier to scale horizontally because any server can handle any request."}),"\n",(0,i.jsx)(s.li,{children:"Simplicity: Simplifies server design as there is no need to manage session state."}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Idempotency"}),": Requests can be repeated without side effects (in certain cases), making error recovery simpler."]}),"\n",(0,i.jsxs)(s.li,{children:["Easier to implement ",(0,i.jsx)(s.strong,{children:"caching"})," mechanisms since responses depend solely on the request."]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"stateful",children:(0,i.jsx)(s.strong,{children:"Stateful"})}),"\n",(0,i.jsx)(s.p,{children:"In stateful communication, the server maintains state information (session data) about the client across multiple requests."}),"\n",(0,i.jsx)(s.p,{children:"Characteristics are:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Session Management: Requires mechanisms to store and retrieve session data."}),"\n",(0,i.jsx)(s.li,{children:"Complexity: Increased complexity in handling and synchronizing session state."}),"\n",(0,i.jsx)(s.li,{children:"Server Affinity: May require clients to interact with the same server (session stickiness)."}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Use case could be:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"User Sessions: Applications where user authentication and session data are critical (shopping carts, user dashboards, online banking)."}),"\n",(0,i.jsx)(s.li,{children:"Real-Time Communication: Chat applications or games where continuous interaction is necessary."}),"\n",(0,i.jsx)(s.li,{children:"Transactions: Multi-step transactions that need to maintain context between steps."}),"\n"]})]})}function u(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>r,x:()=>c});var t=n(6540);const i={},a=t.createContext(i);function r(e){const s=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(a.Provider,{value:s},e.children)}}}]);
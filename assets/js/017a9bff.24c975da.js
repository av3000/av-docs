"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[595],{208:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"system-design/software/informatica-power-center","title":"Informatica PowerCenter","description":"Documentations:","source":"@site/docs/system-design/software/informatica-power-center.md","sourceDirName":"system-design/software","slug":"/system-design/software/informatica-power-center","permalink":"/av-docs/docs/system-design/software/informatica-power-center","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/system-design/software/informatica-power-center.md","tags":[],"version":"current","frontMatter":{},"sidebar":"systemDesignSidebar","previous":{"title":"Intro","permalink":"/av-docs/docs/system-design/software/"},"next":{"title":"Kafka","permalink":"/av-docs/docs/system-design/software/kafka/"}}');var i=n(4848),s=n(8453);const r={},o="Informatica PowerCenter",c={},d=[{value:"Data Extraction",id:"data-extraction",level:2},{value:"Data Transformation",id:"data-transformation",level:2},{value:"Load",id:"load",level:2}];function l(e){const a={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.header,{children:(0,i.jsx)(a.h1,{id:"informatica-powercenter",children:"Informatica PowerCenter"})}),"\n",(0,i.jsxs)(a.p,{children:["Documentations:\n",(0,i.jsx)(a.a,{href:"https://docs.informatica.com/data-integration/powercenter.html",children:"https://docs.informatica.com/data-integration/powercenter.html"}),"\n",(0,i.jsx)(a.a,{href:"https://www.javatpoint.com/informatica-powercenter",children:"https://www.javatpoint.com/informatica-powercenter"}),"\n",(0,i.jsx)(a.a,{href:"https://www.oracle.com/autonomous-database/what-is-data-mart/",children:"What is a data mart | Oracle"}),"\nModern alternative - ",(0,i.jsx)(a.a,{href:"https://cloud.google.com/bigquery/",children:"Google BigQuery"}),"\n",(0,i.jsx)(a.a,{href:"https://aws.amazon.com/compare/the-difference-between-a-data-warehouse-data-lake-and-data-mart/",children:"What's the Difference Between a Data Warehouse, Data Lake, and Data Mart?"})]}),"\n",(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.strong,{children:"Informatica PowerCenter"})," is an ETL (Extract, Transform, Load) tool used for integrating and managing data from multiple sources, such as recent changes or new entries, allowing organizations to build enterprise Data Warehouses or Data Marts and enable data analytics.\nIt provides functionalities for data extraction, transformation, and loading, also known as ETL pipelines, to support data-driven decision-making."]}),"\n",(0,i.jsx)(a.h2,{id:"data-extraction",children:"Data Extraction"}),"\n",(0,i.jsx)(a.p,{children:"The Extract phase involves gathering raw data from various source systems. In this CRM architecture, the source data can include:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Transactional Databases (customer interactions, financial transactions, product details)."}),"\n",(0,i.jsx)(a.li,{children:"External Systems (other banking services or client records)."}),"\n",(0,i.jsx)(a.li,{children:'Kafka Events: Events, like the "snooze" action, are captured and stored temporarily as messages in Kafka topics and may be pulled in by Informatica to ensure the CRM Data Mart is up-to-date.'}),"\n"]}),"\n",(0,i.jsx)(a.p,{children:"Informatica extracts data by connecting to these sources (Oracle, flat files, or Kafka), typically by running scheduled or triggered jobs that pull only the necessary data, such as recent changes or new entries."}),"\n",(0,i.jsx)(a.p,{children:"Example:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"A new client interaction record is created in a transactional database or logged as an event in Kafka."}),"\n",(0,i.jsx)(a.li,{children:"Informatica connects to the source, queries this new interaction, and extracts the raw data fields (client ID, interaction type, date, advisor ID, etc.)"}),"\n"]}),"\n",(0,i.jsx)(a.h2,{id:"data-transformation",children:"Data Transformation"}),"\n",(0,i.jsx)(a.p,{children:"The Transform phase is where business logic is applied. This is where Informatica cleans, formats, and enriches the data to make it consistent and useful for CRM analysis. Transformations may include:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsx)(a.li,{children:"Data Cleansing: Removing duplicates, handling missing data, and standardizing formats (dates or names)."}),"\n",(0,i.jsx)(a.li,{children:"Business Logic Application: Converting raw data into meaningful insights (categorizing interaction types, adding calculated fields like \u201cdays since last contact\u201d)."}),"\n",(0,i.jsx)(a.li,{children:"Aggregation: Summing or averaging values to create summary records (monthly interaction counts per client)."}),"\n",(0,i.jsx)(a.li,{children:"Joining Data: Merging data from different sources, like combining client transaction records with profile information."}),"\n",(0,i.jsx)(a.li,{children:"Data Enrichment: Adding derived fields (identifying a high-value client based on transaction frequency)."}),"\n"]}),"\n",(0,i.jsx)(a.p,{children:"Informatica performs these transformations within its ETL pipelines. These pipelines are designed with transformations that may contain SQL queries, functions, or built-in data processing operations to meet business needs."}),"\n",(0,i.jsx)(a.p,{children:"Example:"}),"\n",(0,i.jsx)(a.p,{children:"If the snooze action was triggered, Informatica might:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsxs)(a.li,{children:["Update or calculate fields like ",(0,i.jsx)(a.code,{children:"next_contact_date"})," based on the snooze duration."]}),"\n",(0,i.jsx)(a.li,{children:"Convert the snooze date into a format compatible with the CRM Data Mart."}),"\n",(0,i.jsx)(a.li,{children:"Link the snooze action with the advisor\u2019s ID, so future reports can show who delayed client interactions."}),"\n"]}),"\n",(0,i.jsx)(a.h2,{id:"load",children:"Load"}),"\n",(0,i.jsx)(a.p,{children:"The Load phase involves loading the transformed data into the target database (in this case, the CRM Data Mart within Oracle DB)."}),"\n",(0,i.jsx)(a.p,{children:"The Load step can be incremental (loading only the new or updated data) or full (loading all data), depending on requirements. Once data is loaded, it becomes available for querying, reporting, or analytics."}),"\n",(0,i.jsx)(a.p,{children:"Example:"}),"\n",(0,i.jsxs)(a.ul,{children:["\n",(0,i.jsxs)(a.li,{children:["After processing a client snooze event, Informatica inserts or updates the client\u2019s ",(0,i.jsx)(a.code,{children:"next_contact_date"})," field in the CRM Data Mart."]}),"\n",(0,i.jsx)(a.li,{children:"This updated field will inform reports and applications when the advisor should contact the client next."}),"\n"]})]})}function h(e={}){const{wrapper:a}={...(0,s.R)(),...e.components};return a?(0,i.jsx)(a,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,a,n)=>{n.d(a,{R:()=>r,x:()=>o});var t=n(6540);const i={},s=t.createContext(i);function r(e){const a=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:a},e.children)}}}]);
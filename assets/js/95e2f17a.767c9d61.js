"use strict";(self.webpackChunkav_docusaurus_classic=self.webpackChunkav_docusaurus_classic||[]).push([[8707],{8164:(e,i,s)=>{s.r(i),s.d(i,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"frontend/testing/accessibility-testing/index","title":"Accessibility Testing","description":"Inspired by https://www.netguru.com/blog/accessibility-testing","source":"@site/docs/frontend/testing/accessibility-testing/index.md","sourceDirName":"frontend/testing/accessibility-testing","slug":"/frontend/testing/accessibility-testing/","permalink":"/av-docs/docs/frontend/testing/accessibility-testing/","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend/testing/accessibility-testing/index.md","tags":[],"version":"current","frontMatter":{},"sidebar":"frontendSidebar","previous":{"title":"E2E Testing","permalink":"/av-docs/docs/frontend/testing/e2e-testing/"},"next":{"title":"Intro","permalink":"/av-docs/docs/frontend/styling/"}}');var n=s(4848),a=s(8453);const o={},r="Accessibility Testing",l={},c=[{value:"Benefits of accessibility testing",id:"benefits-of-accessibility-testing",level:2},{value:"Accessibility audit vs. usability testing for accessibility",id:"accessibility-audit-vs-usability-testing-for-accessibility",level:2},{value:"Accessibility audit",id:"accessibility-audit",level:2},{value:"Tips on how to run an accessibility audit",id:"tips-on-how-to-run-an-accessibility-audit",level:2},{value:"Usability testing for accessibility",id:"usability-testing-for-accessibility",level:2},{value:"Pros and cons of usability testing for accessibility",id:"pros-and-cons-of-usability-testing-for-accessibility",level:2},{value:"Tips on how to run usability testing for accessibility",id:"tips-on-how-to-run-usability-testing-for-accessibility",level:2}];function d(e){const i={a:"a",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"accessibility-testing",children:"Accessibility Testing"})}),"\n",(0,n.jsxs)(i.p,{children:["Inspired by ",(0,n.jsx)(i.a,{href:"https://www.netguru.com/blog/accessibility-testing",children:"https://www.netguru.com/blog/accessibility-testing"})]}),"\n",(0,n.jsxs)(i.p,{children:[(0,n.jsx)(i.a,{href:"https://www.w3.org/WAI/standards-guidelines/wcag/",children:"Web Content Accessibility Guidelines (WCAG) 2"})," is developed through the W3C process in cooperation with individuals and organizations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally."]}),"\n",(0,n.jsx)(i.h2,{id:"benefits-of-accessibility-testing",children:"Benefits of accessibility testing"}),"\n",(0,n.jsx)(i.p,{children:"Organizations are increasingly realizing that meeting digital accessibility standards is an opportunity to grow their business, show where they stand from an ethical perspective, and outshine the competition. How?"}),"\n",(0,n.jsxs)(i.p,{children:["For starters, those who benefit from accessibility testing aren\u2019t a negligible minority. Alongside the 15% of the population who experience some form of disability, there are temporary and situational impairments to consider, such as new parents, someone with an ear infection or laryngitis, people with heavy accents, and even those exposed to bright sunlight who ",(0,n.jsx)(i.a,{href:"https://www.netguru.com/blog/mobile-accessibility-testing",children:"can\u2019t see the screen on their mobile device properly"}),"."]}),"\n",(0,n.jsx)(i.p,{children:(0,n.jsx)(i.img,{alt:"accesibility-testing-reasons",src:s(2606).A+"",width:"538",height:"802"})}),"\n",(0,n.jsxs)(i.p,{children:["Source: ",(0,n.jsx)(i.a,{href:"https://www.microsoft.com/design/inclusive",children:"https://www.microsoft.com/design/inclusive"})]}),"\n",(0,n.jsx)(i.p,{children:"As a side-effect there are other reasons how accesibility is important and affects the product:"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"The customer and user experience improves for everyone, because accessible design makes navigation, text clarity, and appearance more user-friendly."}),"\n",(0,n.jsx)(i.li,{children:"People with disabilities tend to be loyal customers (as are their families) \u2013 by attracting long-term users you extend your market reach."}),"\n",(0,n.jsx)(i.li,{children:"Accessibility tests can reduce development costs, according to a Forrester Research Economic Impact Study commissioned by Microsoft."}),"\n",(0,n.jsx)(i.li,{children:"Because accessibility often enhances the digital experience for all users, loyalty and market share further increases."}),"\n",(0,n.jsx)(i.li,{children:"By keeping accessibility and formats like rich text in mind, SEO improves and it\u2019s easier for search engines to find your website, potentially moving you up the rankings."}),"\n",(0,n.jsx)(i.li,{children:"Accessibility features often solve unanticipated problems, driving innovation in other areas."}),"\n",(0,n.jsx)(i.li,{children:"If done right from the outset, incorporating digital accessibility standards doesn\u2019t add too much time to your web developers\u2019 workloads."}),"\n"]}),"\n",(0,n.jsx)(i.p,{children:"There\u2019s a strong business case for digital accessibility and an array of powerful case studies supporting that, spanning companies like Apple, Google, and Barclays."}),"\n",(0,n.jsx)(i.h2,{id:"accessibility-audit-vs-usability-testing-for-accessibility",children:"Accessibility audit vs. usability testing for accessibility"}),"\n",(0,n.jsx)(i.p,{children:"When an audit takes place, an accessibility specialist evaluates and validates your website against WCAG guidelines, highlighting accessibility issues and making recommendations around how to fix them."}),"\n",(0,n.jsx)(i.p,{children:"Meanwhile, usability testing for accessibility involves people who use assistive technology in their everyday lives completing common tasks on your website or application; any issues they experience are investigated."}),"\n",(0,n.jsx)(i.h2,{id:"accessibility-audit",children:"Accessibility audit"}),"\n",(0,n.jsx)(i.p,{children:"An accessibility audit is a combination of manual and automated accessibility testing. The expert uses assistive technologies like screen readers and magnification software to perform the accessibility testing audit. They also use automated tools like WAVE and AXE to check page structure, low contrast, missing alt text, etc. A thorough accessibility audit provides full coverage that automated testing alone can\u2019t offer."}),"\n",(0,n.jsx)(i.p,{children:"During an audit, it\u2019s important to differentiate between accessibility and usability: The two terms are quite different."}),"\n",(0,n.jsx)(i.p,{children:"Website accessibility is all about ensuring the same access to information for everyone, and involves adhering to standards like WCAG. Meanwhile, the goal of usability is to deliver effective experiences for all users, including intuitive and seamless user interface design.\nWhen to run an accessibility audit"}),"\n",(0,n.jsx)(i.p,{children:"The short answer is always! An accessibility audit is less expensive than usability testing for accessibility, and can uncover more accessibility issues, assuming your audit is carried out by an expert (who also keeps usability in mind)."}),"\n",(0,n.jsx)(i.h2,{id:"tips-on-how-to-run-an-accessibility-audit",children:"Tips on how to run an accessibility audit"}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Identify templates. Before starting an audit, understand the mechanism you\u2019re auditing. Find common patterns and pinpoint web pages that are built using the same template. By doing that, you avoid duplication of work."}),"\n",(0,n.jsx)(i.li,{children:"Prepare assistive technologies. Choose the products or systems you want to use \u2013 keyboards, screen readers, voice-overs, etc. These help you look at the website from a wider angle and identify accessibility issues."}),"\n",(0,n.jsx)(i.li,{children:"Create relevant documents. Prepare a spreadsheet with WCAG guidelines and a presentation template (if you need one), before you start your analysis."}),"\n",(0,n.jsx)(i.li,{children:"Start with what\u2019s familiar to you. Explore the website as a user: Go through each page and look for problems that are visible at a glance."}),"\n",(0,n.jsx)(i.li,{children:"Explore the website with a WCAG list. Get familiar with the WCAG guidelines, find violations, and include them in your report. At Netguru, we use assistive technology to navigate and check the site."}),"\n",(0,n.jsx)(i.li,{children:"Use Web Inspector \u2013 a lot! That may seem overwhelming at first, especially if you\u2019re not familiar with HTML and CSS. Do a course if you need to, because without basic knowledge of these languages, your accessibility report will be less valuable."}),"\n",(0,n.jsx)(i.li,{children:"Use automated web accessibility testing tools. There are a variety of resources that support auditing and testing for accessibility. Many are Chrome extensions, making them effortless to use."}),"\n",(0,n.jsx)(i.li,{children:"Double-check automated tools\u2019 findings. Checking accessibility is NOT solely for a bot or a robot. Tools may report false information, highlight a different number of errors for the same product, or misunderstand accessibility requirements. Automated tools are a starting point, but not the only area you should focus on."}),"\n",(0,n.jsx)(i.li,{children:"Prioritize your findings. Give issues an impact and priority score \u2013 for example, high, medium, or minor. That makes it easier to identify which problems are the most important and helps you rank them correctly."}),"\n",(0,n.jsx)(i.li,{children:"Provide one recommendation per finding. At Netguru, when we carry out accessibility audits we want our customers to know exactly what action to take, so we only offer one best solution per issue."}),"\n",(0,n.jsx)(i.li,{children:"Summarize your thoughts in a report or presentation. In addition to providing a detailed description of your findings, also provide a summary of issues, recommendations, and next steps. Try to make your summary as actionable as possible and prioritize issues."}),"\n"]}),"\n",(0,n.jsx)(i.h2,{id:"usability-testing-for-accessibility",children:"Usability testing for accessibility"}),"\n",(0,n.jsx)(i.p,{children:"Accessibility audits don\u2019t always catch every WCAG issue, and more than that, even if every WCAG issue is caught, that doesn\u2019t mean the website is usable for people who need assistive technology."}),"\n",(0,n.jsx)(i.p,{children:"There are various assistive technologies, many bespoke or tailored to specific situations, so it\u2019s impossible to create accessible software by blindly following a set of rules. That\u2019s why testing with people who actually rely on assistive technologies is such an important part of accessibility testing."}),"\n",(0,n.jsx)(i.p,{children:"Accessibility-related usability improvements not only enhance the experience for people who need assistive technology, but they also raise usability levels across the board, for all users.\nDifferences between usability testing and usability testing for accessibility"}),"\n",(0,n.jsx)(i.p,{children:"Usability testing helps you understand how real people interact with digital products, and highlights features to add or improve. Usability testing for accessibility is about how users with disabilities and impairments interact with a website or app when they use assistive technologies."}),"\n",(0,n.jsx)(i.p,{children:"In general, these two types of usability testing are more connected than most people think. For example, many pages and apps have text that's too small or bright, meaning you don't need a vision impairment to have issues reading it. Similarly, if there\u2019s an error message but no way to close the pop-up, it will cause trouble to everyone, regardless of their abilities."}),"\n",(0,n.jsx)(i.p,{children:"In general, you should invite people with disabilities or impairments to participate in every usability test, because products that are accessible are easy to use by everyone, not only people who need to use assistive technologies."}),"\n",(0,n.jsx)(i.h2,{id:"pros-and-cons-of-usability-testing-for-accessibility",children:"Pros and cons of usability testing for accessibility"}),"\n",(0,n.jsx)(i.p,{children:"Because this type of accessibility testing involves real people, there\u2019s a side benefit of uncovering general usability issues. Moreover, accessibility testing sessions are an excellent learning experience for team members and stakeholders, particularly if they watch the testing live."}),"\n",(0,n.jsx)(i.p,{children:"That being said, as previously mentioned, usability testing for accessibility is expensive (when done properly). Why? It means recruiting at least five people who use assistive technology, meeting with them in surroundings that may need improvements for their comfort, and then running the test session."}),"\n",(0,n.jsx)(i.p,{children:"Additionally, the testers often require testing apps or websites on their own devices. Clickable prototypes are created in Figma or Sketch and don\u2019t support assistive technologies, so if you want to test new features, a prototype needs to be coded first, adding another cost. However, you\u2019ll likely find different issues with usability testing, compared to accessibility audit.\nWhen to run usability testing for accessibility"}),"\n",(0,n.jsx)(i.p,{children:"This type of accessibility testing is more expensive than an audit and harder to conduct, thus usability testing for accessibility is often skipped. But it\u2019s a necessary step, ensuring your product can actually be used by people relying on assistive technologies."}),"\n",(0,n.jsx)(i.p,{children:"We recommend carrying out an audit first. That way, you can highlight and fix compliance-related accessibility issues, before forging ahead with usability testing."}),"\n",(0,n.jsx)(i.h2,{id:"tips-on-how-to-run-usability-testing-for-accessibility",children:"Tips on how to run usability testing for accessibility"}),"\n",(0,n.jsx)(i.p,{children:"To optimize your usability testing for accessibility, there are three stages to consider:"}),"\n",(0,n.jsxs)(i.ol,{children:["\n",(0,n.jsx)(i.li,{children:"Preparation"}),"\n"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Include people who use assistive technology in your user profiles and personas."}),"\n",(0,n.jsx)(i.li,{children:"Plan to conduct your test with real products or finished code."}),"\n",(0,n.jsx)(i.li,{children:"Adjust to people's needs and meet where it\u2019s comfortable for them."}),"\n",(0,n.jsx)(i.li,{children:"Before a testing session, study the websites you\u2019re testing to familiarise yourself."}),"\n",(0,n.jsx)(i.li,{children:"Make sure you\u2019ve used the assistive technology before going to a testing session, so you can understand what the user is doing during the sessions."}),"\n",(0,n.jsx)(i.li,{children:"Prepare a script and practice it, to ensure all testers hear the same information."}),"\n",(0,n.jsx)(i.li,{children:"Conduct pilot tests for clarity, and expect to make changes as a result."}),"\n"]}),"\n",(0,n.jsxs)(i.ol,{start:"2",children:["\n",(0,n.jsx)(i.li,{children:"Before testing"}),"\n"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"Get in touch with potential participants \u2013 they\u2019re generally cautious but receptive."}),"\n",(0,n.jsx)(i.li,{children:"Prepare simple and standardized screening documents, so it\u2019s quick and easy to recruit, schedule, or disqualify people."}),"\n",(0,n.jsx)(i.li,{children:"Ask users to sign a consent form, outlining things like how you\u2019ll use the information you collect."}),"\n",(0,n.jsx)(i.li,{children:"Adapt the consent form to the needs of your participants: read it out loud, send a copy before the study, or offer Braille consent forms if needed."}),"\n"]}),"\n",(0,n.jsxs)(i.ol,{start:"3",children:["\n",(0,n.jsx)(i.li,{children:"During the test"}),"\n"]}),"\n",(0,n.jsxs)(i.ul,{children:["\n",(0,n.jsx)(i.li,{children:"If speech synthesizers or computer speakers are being used, sit as close as possible so you know what\u2019s going on."}),"\n",(0,n.jsx)(i.li,{children:"It may sound silly, but don\u2019t be overly sensitive or act differently around testers."}),"\n",(0,n.jsx)(i.li,{children:"Evaluate your methods for responding to and encouraging participants, ensuring there\u2019s not too much discussion and they concentrate on the task at hand \u2013 testing."}),"\n",(0,n.jsx)(i.li,{children:"For consistency, concisely read tasks aloud to all users."}),"\n",(0,n.jsx)(i.li,{children:"When taking pictures or a video, let participants know what you\u2019ll use them for."}),"\n",(0,n.jsx)(i.li,{children:"Where possible, conduct studies at the user\u2019s home or office, and let people use technology they\u2019re familiar with \u2013 for example, their own screen readers or magnifiers."}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,a.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},2606:(e,i,s)=>{s.d(i,{A:()=>t});const t=s.p+"assets/images/accesibility-testing-reasons-49c6efa7785527790fa2d2bf3791fc2f.png"},8453:(e,i,s)=>{s.d(i,{R:()=>o,x:()=>r});var t=s(6540);const n={},a=t.createContext(n);function o(e){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function r(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),t.createElement(a.Provider,{value:i},e.children)}}}]);
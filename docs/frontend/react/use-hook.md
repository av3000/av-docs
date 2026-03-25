<!-- use() hook -->

https://www.linkedin.com/posts/max-lypchak_react-activity-7432078104614891521-8DgD?utm_source=share&utm_medium=member_desktop&rcm=ACoAACRgqxABwetit9PsJXupWXfDewuJl9_froo

Post:
`use() is just a worse useEffect().

It is basically useEffect but with more magic and less control.

useEffect was simple:
useEffect(() => {
fetch("/api/data") .then(r => r.json()) .then(setData);
}, []);

Now we have use():
const userPromise = fetch("/api/user") .then(res => res.json());
const data = use(userPromise);

It:

- throws promises
- crashes without Suspense
- needs error boundaries
- no dependency control
- and people call it “cleaner”

Cleaner for who?
Most of the time, in client components, use() is just useEffect without dependency control.
If it is not a replacement… is it worth using it?

Maybe I'm missing something.
But right now I don't see a worthful case where I could use it and simplify the flow.

Example:

useEffect(()=> {
fetch("/api/data")
.then((r) => r.json())
.then(setData);
}, [])

vs

const userPromise = fetch("/api/user)
.then((res) => res.json());

const data = use(userPromise);
`

comments are:

Commenter A:
`In real projects, neither `useEffect`nor`use()`for direct fetching is commonly used - there's useQuery and both examples from the post become irrelevant right away 😊
If you look at the docs https://react.dev/reference/react/use , the priorities are laid out nicely: the first use case isn't "fetching data" but Reading context with use - meaning you can finally call a hook inside if/else. For complex components that's genuinely useful.
Then comes Streaming data from server to client, where`use()`works together with server components. And right there it's written what to do with rejected promises - no need to wrap everything in ErrorBoundary, a simple .catch() on the promise works fine: https://react.dev/reference/react/use#dealing-with-rejected-promises
So I think the main idea is that`use()`isn't a replacement for`useEffect`, it's a different tool for different jobs. If you use it where it doesn't belong, of course it'll feel awkward 🙂
By the way, if you're curious how similar things are solved conceptually in a different way - SolidJS has its own take on this story: https://www.youtube.com/watch?v=hw3Bx5vxKl0`

Author reply:
`Thanks, but I agree on one thing: use() is not a 1:1 replacement for useEffect, for sure.
Regarding usequery: what if you don't want react query / don't have it in the stack?
Not every app ships with a query library. In those cases the comparison is valid, because people will reach for either useEffect or use().
About the docs use cases:

- reading context inside if/else. this is actually the only case where I use() might be useful. Being able to read context conditionally is nice. But realistically? In most non-trivial apps, once state gets complex, you're usually already using: zustand, redux or some other state layer
- streaming data from server to client. This is the one I'm most skeptical about. If I’m already in a server component and I fetched the data there… why would I pass a promise to the client and resolve it with use() instead of just passing the resolved data?
  So yeah, I get that it's a different tool. I just question how often that tool actually makes code simpler.
  Maybe I’m missing a killer use case. But today I still don’t see a worthful case where I could use it and simplify the flow`

Commenter A reply:

`If useQuery didn't exist, you'd write your own wrapper anyway. What are the actual reasons not to use it?

On "people will reach for use() instead of useEffect" - the docs clearly define the intent of the hook

Also, you mentioned Zustand/Redux as a reason use() isn't useful for context, but earlier the argument was "I don't want to add libraries". Can I assume you're okay with adding libraries after all?

If a component needs useState, useEffect, or interactivity, it must be client-side. Before use(), data was either awaited on the server (blocking render) or refetched on the client (extra request). use() connects server-owned data with client-side behavior without duplication. Similar in goal to Remix link prefetching

Honestly, use() doesn't promise to simplify everything. Neither did useEffect, neither does Context (which has its own re-rendering problems). React itself has known tradeoffs with its reactivity model and virtual DOM. The question is always whether the tool fits the problem`

Author reply:

`“you'd write your own wrapper anyway.” - yes, but that wrapper would still internally use useEffect, wouldnt it? At the end of the day, even reactquery is built on top of effects + state. So the model is still explicit side-effects with dependency control. That's my point: use() changes the model (promises, suspense) instead of just abstracting it.
And i am not against query. I use it in my current project. But in previous projects: legacy codebases, simple SPAs - teams that don’t want another dependency. Rewriting half the data layer just to introduce query was simply not worth it. And yes, there are real-world apps without it.
Regarding intent: sure, but docs defining intent doesnt mean developers wont use it differently. We have seen this with: useEffect being used as a lifecycle dump, memoization everywhere “just in case”
The fact that use() can fetch means people will fetch with it
Regarding libs: did i say i don’t want libs?😆 i said there are projects where adding one isnt justified. There are plenty of reasons: bundle size constraints, long-lived code, architectural constraints, business not wanting refactors, very simple data needs`

Author reply again:
`And i fully agree with your last point:
The question is always whether the tool fits the problem. My position isn’t "use() is bad". It just feels like added abstraction + tighter coupling to suspense rather than a practical improvement for most apps`

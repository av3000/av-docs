# Proxy

Use case: Controlling access to an object, adding a layer of indirection.

Example: Using Angular's router for lazy loading feature modules.

How to find: Check RouterModule configurations in app routing files for lazy-loaded routes.

Explanation:

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. In Angular, lazy loading modules act as proxies. The actual module isn't loaded until it's needed, which can improve the application's initial load time.

```js
// app-routing.module.ts
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "feature",
    loadChildren: () =>
      import("./feature/feature.module").then((m) => m.FeatureModule),
  },
  // Other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

- The loadChildren property is a function that returns a Promise resolving to the module.
- Angular uses this configuration to lazy load the FeatureModule when the user navigates to the /feature route.
- Until then, a proxy placeholder exists, deferring the actual loading of the module.

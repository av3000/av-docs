# PrimeNG, PrimeReact, and PrimeVue (PrimeFaces)

Prime UI libraries are a comprehensive suite of rich UI components for Angular, React, and Vue. Developed by PrimeTek Informatics, these libraries provide a complete solution for creating professional, enterprise-grade user interfaces across different JavaScript frameworks.

## Overview

The Prime family of UI component libraries includes:

- **PrimeNG**: UI component suite for Angular
- **PrimeReact**: UI component suite for React
- **PrimeVue**: UI component suite for Vue
- **PrimeFaces**: The original UI library for JavaServer Faces (JSF)

These libraries share a common design philosophy and feature set, offering a consistent experience across different frontend frameworks.

### Key Features

- **Comprehensive Component Set**: Over 90+ UI components in each library
- **Theme System**: Extensive theming capabilities with pre-built themes
- **Accessibility**: WCAG 2.0 compliant components
- **Responsive Design**: Mobile-friendly components
- **Professional Support**: Paid support options available
- **Active Development**: Regular updates and improvements
- **Enterprise Focus**: Designed for business applications
- **Rich Documentation**: Detailed guides and examples

## Installation and Setup

### PrimeNG (Angular)

```bash
npm install primeng primeicons
```

Add the required styles to your `angular.json`:

```json
"styles": [
  "node_modules/primeicons/primeicons.css",
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css"
]
```

Import modules in your `app.module.ts`:

```typescript
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@NgModule({
  imports: [
    ButtonModule,
    TableModule,
    // Other PrimeNG modules...
  ],
  // ...
})
export class AppModule {}
```

### PrimeReact (React)

```bash
npm install primereact primeicons
```

Import the required CSS files in your main application file:

```javascript
// Import PrimeReact components
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

// Import required CSS
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
```

### PrimeVue (Vue)

```bash
npm install primevue primeicons
```

Register PrimeVue in your main.js:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import DataTable from "primevue/datatable";

// Import required CSS
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);

// Register components globally
app.component("Button", Button);
app.component("DataTable", DataTable);

app.mount("#app");
```

## Core Components

### Button

**PrimeNG (Angular)**

```html
<p-button label="Submit" icon="pi pi-check" iconPos="right"></p-button>
<p-button label="Secondary" styleClass="p-button-secondary"></p-button>
<p-button label="Success" styleClass="p-button-success"></p-button>
<p-button label="Info" styleClass="p-button-info"></p-button>
<p-button label="Warning" styleClass="p-button-warning"></p-button>
<p-button label="Danger" styleClass="p-button-danger"></p-button>
```

**PrimeReact (React)**

```jsx
<Button label="Submit" icon="pi pi-check" iconPos="right" />
<Button label="Secondary" className="p-button-secondary" />
<Button label="Success" className="p-button-success" />
<Button label="Info" className="p-button-info" />
<Button label="Warning" className="p-button-warning" />
<Button label="Danger" className="p-button-danger" />
```

**PrimeVue (Vue)**

```html
<button label="Submit" icon="pi pi-check" icon-pos="right" />
<button label="Secondary" class="p-button-secondary" />
<button label="Success" class="p-button-success" />
<button label="Info" class="p-button-info" />
<button label="Warning" class="p-button-warning" />
<button label="Danger" class="p-button-danger" />
```

### Data Table

**PrimeNG (Angular)**

```html
<p-table [value]="products" [paginator]="true" [rows]="10">
  <ng-template pTemplate="header">
    <tr>
      <th>Code</th>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-product>
    <tr>
      <td>{{product.code}}</td>
      <td>{{product.name}}</td>
      <td>{{product.category}}</td>
      <td>{{product.price | currency:'USD'}}</td>
    </tr>
  </ng-template>
</p-table>
```

**PrimeReact (React)**

```jsx
<DataTable value={products} paginator rows={10}>
  <Column field="code" header="Code"></Column>
  <Column field="name" header="Name"></Column>
  <Column field="category" header="Category"></Column>
  <Column
    field="price"
    header="Price"
    body={(rowData) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rowData.price)
    }
  ></Column>
</DataTable>
```

**PrimeVue (Vue)**

```html
<DataTable :value="products" :paginator="true" :rows="10">
  <Column field="code" header="Code"></Column>
  <Column field="name" header="Name"></Column>
  <Column field="category" header="Category"></Column>
  <Column field="price" header="Price">
    <template #body="slotProps">
      {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'
      }).format(slotProps.data.price) }}
    </template>
  </Column>
</DataTable>
```

### Form Components

**PrimeNG (Angular)**

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div class="p-field">
    <label for="firstname">First Name</label>
    <input id="firstname" type="text" pInputText formControlName="firstname" />
    <small
      *ngIf="userForm.get('firstname').invalid && userForm.get('firstname').touched"
      class="p-error"
      >First name is required.</small
    >
  </div>

  <div class="p-field">
    <label for="lastname">Last Name</label>
    <input id="lastname" type="text" pInputText formControlName="lastname" />
  </div>

  <div class="p-field">
    <label for="country">Country</label>
    <p-dropdown
      id="country"
      [options]="countries"
      formControlName="country"
      optionLabel="name"
      optionValue="code"
    ></p-dropdown>
  </div>

  <div class="p-field-checkbox">
    <p-checkbox
      formControlName="accept"
      [binary]="true"
      inputId="accept"
    ></p-checkbox>
    <label for="accept">I accept the terms</label>
  </div>

  <p-button
    type="submit"
    label="Submit"
    [disabled]="userForm.invalid"
  ></p-button>
</form>
```

**PrimeReact (React)**

```jsx
<form onSubmit={handleSubmit}>
  <div className="p-field">
    <label htmlFor="firstname">First Name</label>
    <InputText
      id="firstname"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
    {submitted && !firstName && (
      <small className="p-error">First name is required.</small>
    )}
  </div>

  <div className="p-field">
    <label htmlFor="lastname">Last Name</label>
    <InputText
      id="lastname"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
  </div>

  <div className="p-field">
    <label htmlFor="country">Country</label>
    <Dropdown
      id="country"
      value={country}
      options={countries}
      onChange={(e) => setCountry(e.value)}
      optionLabel="name"
    />
  </div>

  <div className="p-field-checkbox">
    <Checkbox
      inputId="accept"
      checked={accept}
      onChange={(e) => setAccept(e.checked)}
    />
    <label htmlFor="accept">I accept the terms</label>
  </div>

  <Button type="submit" label="Submit" disabled={!firstName || !accept} />
</form>
```

**PrimeVue (Vue)**

```html
<form @submit.prevent="onSubmit">
  <div class="p-field">
    <label for="firstname">First Name</label>
    <InputText
      id="firstname"
      v-model="user.firstname"
      :class="{'p-invalid': submitted && !user.firstname}"
    />
    <small v-if="submitted && !user.firstname" class="p-error"
      >First name is required.</small
    >
  </div>

  <div class="p-field">
    <label for="lastname">Last Name</label>
    <InputText id="lastname" v-model="user.lastname" />
  </div>

  <div class="p-field">
    <label for="country">Country</label>
    <Dropdown
      id="country"
      v-model="user.country"
      :options="countries"
      optionLabel="name"
    />
  </div>

  <div class="p-field-checkbox">
    <Checkbox id="accept" v-model="user.accept" :binary="true" />
    <label for="accept">I accept the terms</label>
  </div>

  <button
    type="submit"
    label="Submit"
    :disabled="!user.firstname || !user.accept"
  />
</form>
```

## Advanced Components

The Prime libraries include numerous advanced components for complex UI requirements:

### Data Visualization

**PrimeNG (Angular)**

```html
<p-chart type="pie" [data]="chartData" [options]="chartOptions"></p-chart>

<p-organizationChart [value]="data">
  <ng-template let-node pTemplate="default">
    <div class="p-2">
      <div>{{node.label}}</div>
    </div>
  </ng-template>
</p-organizationChart>
```

**PrimeReact (React)**

```jsx
<Chart type="pie" data={chartData} options={chartOptions} />

<OrganizationChart value={data} nodeTemplate={(node) => (
  <div className="p-2">
    <div>{node.label}</div>
  </div>
)} />
```

**PrimeVue (Vue)**

```html
<Chart type="pie" :data="chartData" :options="chartOptions" />

<OrganizationChart :value="data">
  <template #default="slotProps">
    <div class="p-2">
      <div>{{ slotProps.node.label }}</div>
    </div>
  </template>
</OrganizationChart>
```

### Complex UI Components

**PrimeNG (Angular)**

```html
<!-- Calendar with time -->
<p-calendar
  [(ngModel)]="date"
  [showTime]="true"
  [showSeconds]="true"
></p-calendar>

<!-- File upload -->
<p-fileUpload
  name="demo[]"
  url="./upload.php"
  (onUpload)="onUpload($event)"
  [multiple]="true"
  accept="image/*"
  maxFileSize="1000000"
>
  <ng-template pTemplate="content">
    <p>Drag and drop files to here to upload.</p>
  </ng-template>
</p-fileUpload>

<!-- Data table with filters -->
<p-table
  [value]="customers"
  [paginator]="true"
  [rows]="10"
  [globalFilterFields]="['name','country.name','representative.name','status']"
>
  <ng-template pTemplate="caption">
    <div class="p-d-flex">
      <span class="p-input-icon-left p-ml-auto">
        <i class="pi pi-search"></i>
        <input
          pInputText
          type="text"
          (input)="dt.filterGlobal($event.target.value, 'contains')"
          placeholder="Search..."
        />
      </span>
    </div>
  </ng-template>
  <!-- Table content... -->
</p-table>
```

**PrimeReact (React)**

```jsx
{
  /* Calendar with time */
}
<Calendar
  value={date}
  onChange={(e) => setDate(e.value)}
  showTime
  showSeconds
/>;

{
  /* File upload */
}
<FileUpload
  name="demo[]"
  url="./upload.php"
  onUpload={onUpload}
  multiple
  accept="image/*"
  maxFileSize={1000000}
  emptyTemplate={<p>Drag and drop files to here to upload.</p>}
/>;

{
  /* Data table with filters */
}
<DataTable
  value={customers}
  paginator
  rows={10}
  globalFilterFields={["name", "country.name", "representative.name", "status"]}
  header={
    <div className="p-d-flex p-jc-end">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  }
>
  {/* Table content... */}
</DataTable>;
```

**PrimeVue (Vue)**

```html
<!-- Calendar with time -->
<Calendar v-model="date" :showTime="true" :showSeconds="true" />

<!-- File upload -->
<FileUpload
  name="demo[]"
  url="./upload.php"
  @upload="onUpload"
  :multiple="true"
  accept="image/*"
  :maxFileSize="1000000"
>
  <template #empty>
    <p>Drag and drop files to here to upload.</p>
  </template>
</FileUpload>

<!-- Data table with filters -->
<DataTable
  :value="customers"
  :paginator="true"
  :rows="10"
  :globalFilterFields="['name','country.name','representative.name','status']"
>
  <template #header>
    <div class="p-d-flex p-jc-end">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="globalFilter" placeholder="Search..." />
      </span>
    </div>
  </template>
  <!-- Table content... -->
</DataTable>
```

## Theming System

One of the most powerful features of Prime libraries is their extensive theming system.

### Built-in Themes

All Prime libraries come with several built-in themes:

- **Material Design Themes**: md-light-indigo, md-light-deeppurple, md-dark-indigo, md-dark-deeppurple
- **Bootstrap Themes**: bootstrap4-light-blue, bootstrap4-light-purple, bootstrap4-dark-blue, bootstrap4-dark-purple
- **Lara Themes (Default)**: lara-light-indigo, lara-light-purple, lara-light-blue, lara-light-teal, lara-dark-indigo, lara-dark-purple, lara-dark-blue, lara-dark-teal
- **Legacy Themes**: saga-blue, saga-green, saga-orange, saga-purple, vela-blue, vela-green, vela-orange, vela-purple, arya-blue, arya-green, arya-orange, arya-purple

**PrimeNG (Angular)**

Import in styles in `angular.json`:

```json
"styles": [
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css"
]
```

**PrimeReact (React)**

Import themes in your app:

```javascript
// Import theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
```

**PrimeVue (Vue)**

Import themes in your app:

```javascript
// Import theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
```

### Theme Customization

Prime libraries allow for extensive theme customization:

#### Using CSS Variables

Modern Prime themes use CSS variables which can be overridden:

```css
:root {
  --primary-color: #3b82f6;
  --primary-color-text: #ffffff;
  --surface-ground: #eff3f8;
  --surface-section: #ffffff;
  --surface-card: #ffffff;
  --surface-overlay: #ffffff;
  --surface-border: #dfe7ef;
  --text-color: #1e293b;
  --text-color-secondary: #64748b;
}
```

#### Designer API

All Prime libraries include a web-based Designer API to create custom themes:

- [PrimeNG Designer](https://designer.primeng.org/)
- [PrimeReact Designer](https://designer.primereact.org/)
- [PrimeVue Designer](https://designer.primevue.org/)

#### Theme SCSS Files

You can also create custom themes by modifying SCSS files:

```scss
// variables.scss
$primaryColor: #3b82f6 !default;
$primaryLightColor: #93c5fd !default;
$primaryDarkColor: #2563eb !default;
$primaryDarkerColor: #1d4ed8 !default;
$primaryTextColor: #ffffff !default;

// Import theme base and extensions
@import "~primeng/resources/themes/saga-blue/theme.css";
```

## Prime UI Extensions

The Prime ecosystem includes several extensions:

### PrimeBlocks

PrimeBlocks provides a collection of 250+ pre-designed UI blocks for all Prime libraries, including:

- Page sections
- Application templates
- Data display patterns
- Form layouts

```jsx
// PrimeReact example of a PrimeBlock
<div className="grid grid-nogutter surface-section text-800">
  <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
    <section>
      <span className="block text-6xl font-bold mb-1">
        Create stunning websites
      </span>
      <div className="text-6xl text-primary font-bold mb-3">
        with PrimeBlocks
      </div>
      <p className="mt-0 mb-4 text-700 line-height-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Button label="Learn More" type="button" className="mr-3" />
      <Button label="Live Demo" type="button" className="p-button-outlined" />
    </section>
  </div>
  <div className="col-12 md:col-6 overflow-hidden">
    <img
      src="/hero-image.png"
      alt="hero-1"
      className="md:ml-auto block md:h-full"
      style={{ clipPath: "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" }}
    />
  </div>
</div>
```

### PrimeFlex

PrimeFlex is a CSS utility library to accompany Prime UI component libraries:

```html
<!-- Flex layout with PrimeFlex -->
<div class="p-d-flex p-jc-between p-ai-center">
  <div class="p-mr-2">Item 1</div>
  <div>Item 2</div>
</div>

<!-- Responsive grid with PrimeFlex -->
<div class="p-grid">
  <div class="p-col-12 p-md-6 p-lg-3">Col 1</div>
  <div class="p-col-12 p-md-6 p-lg-3">Col 2</div>
  <div class="p-col-12 p-md-6 p-lg-3">Col 3</div>
  <div class="p-col-12 p-md-6 p-lg-3">Col 4</div>
</div>

<!-- Spacing utilities -->
<div class="p-m-3 p-p-4">
  <div class="p-mb-2">Margin bottom 2</div>
  <div class="p-mt-3">Margin top 3</div>
</div>
```

### PrimeIcons

PrimeIcons is an icon library with 200+ icons:

```html
<!-- Basic icon -->
<i class="pi pi-check"></i>

<!-- Sized icon -->
<i class="pi pi-check" style="font-size: 2rem"></i>

<!-- Colored icon -->
<i class="pi pi-check" style="color: #2196F3"></i>

<!-- Spinning icon -->
<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
```

## Performance Considerations

### Lazy Loading

For large applications, consider lazy loading PrimeNG modules:

**PrimeNG (Angular)**

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];
```

### Tree-Shaking

Prime libraries support tree-shaking to reduce bundle size:

```javascript
// Only import what you need
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
```

### Production Builds

Ensure you use production builds:

```bash
# Angular
ng build --prod

# React
npm run build

# Vue
npm run build
```

## Common Patterns

### Dashboard Layout

**PrimeReact (React)**

```jsx
<div className="grid">
  <div className="col-12 md:col-6 lg:col-3">
    <div className="surface-card shadow-2 p-3 border-round">
      <div className="flex justify-content-between mb-3">
        <div>
          <span className="block text-500 font-medium mb-3">Orders</span>
          <div className="text-900 font-medium text-xl">152</div>
        </div>
        <div
          className="flex align-items-center justify-content-center bg-blue-100 border-round"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
        </div>
      </div>
      <span className="text-green-500 font-medium">24 new </span>
      <span className="text-500">since last visit</span>
    </div>
  </div>

  {/* More dashboard widgets... */}

  <div className="col-12">
    <div className="card">
      <h5>Recent Sales</h5>
      <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
        <Column field="name" header="Name" sortable></Column>
        <Column
          field="price"
          header="Price"
          body={(data) => formatCurrency(data.price)}
          sortable
        ></Column>
        <Column field="category" header="Category" sortable></Column>
        <Column
          field="rating"
          header="Reviews"
          body={(data) => (
            <Rating value={data.rating} readOnly cancel={false} />
          )}
        ></Column>
        <Column
          header="Status"
          body={(data) => (
            <Tag
              value={data.inventoryStatus}
              severity={getStatusSeverity(data.inventoryStatus)}
            />
          )}
        ></Column>
      </DataTable>
    </div>
  </div>
</div>
```

### Admin Menu

**PrimeVue (Vue)**

```html
<template>
  <div class="layout-wrapper">
    <div class="layout-sidebar" :class="{'active': sidebarActive}">
      <div class="sidebar-logo">
        <img src="logo.svg" alt="Logo" />
        <span>ADMIN PANEL</span>
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <menu :model="menu" />
    </div>

    <div class="layout-main">
      <div class="layout-topbar">
        <button class="menu-button" @click="toggleSidebar">
          <i class="pi pi-bars"></i>
        </button>

        <div class="topbar-menu">
          <button
            icon="pi pi-bell"
            class="p-button-rounded p-button-text p-button-plain"
            badge="3"
            badgeClass="p-badge-danger"
          />
          <button
            icon="pi pi-user"
            class="p-button-rounded p-button-text p-button-plain"
            @click="toggleUserMenu"
          />

          <menu ref="userMenu" :model="userMenuItems" :popup="true" />
        </div>
      </div>

      <div class="layout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sidebarActive: false,
        menu: [
          {
            label: "Dashboard",
            icon: "pi pi-home",
            to: "/",
          },
          {
            label: "Users",
            icon: "pi pi-users",
            to: "/users",
          },
          {
            label: "Products",
            icon: "pi pi-shopping-cart",
            to: "/products",
          },
          {
            label: "Reports",
            icon: "pi pi-chart-bar",
            items: [
              {
                label: "Sales",
                icon: "pi pi-dollar",
                to: "/reports/sales",
              },
              {
                label: "Traffic",
                icon: "pi pi-chart-line",
                to: "/reports/traffic",
              },
            ],
          },
        ],
        userMenuItems: [
          {
            label: "Profile",
            icon: "pi pi-user-edit",
          },
          {
            label: "Settings",
            icon: "pi pi-cog",
          },
          {
            separator: true,
          },
          {
            label: "Sign Out",
            icon: "pi pi-sign-out",
          },
        ],
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarActive = !this.sidebarActive;
      },
      toggleUserMenu(event) {
        this.$refs.userMenu.toggle(event);
      },
    },
  };
</script>
```

### Advanced Data Table

**PrimeNG (Angular)**

```html
<p-table
  #dt
  [value]="products"
  dataKey="id"
  [rows]="10"
  [showCurrentPageReport]="true"
  [rowsPerPageOptions]="[10,25,50]"
  [paginator]="true"
  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
  [globalFilterFields]="['name','country.name','representative.name','status']"
  [tableStyle]="{'min-width': '75rem'}"
  [rowHover]="true"
  [rowClass]="rowClass"
>
  <ng-template pTemplate="caption">
    <div class="flex justify-content-between flex-column sm:flex-row">
      <button
        pButton
        label="Clear"
        class="p-button-outlined mb-2"
        icon="pi pi-filter-slash"
        (click)="clear(dt)"
      ></button>
      <span class="p-input-icon-left mb-2">
        <i class="pi pi-search"></i>
        <input
          pInputText
          type="text"
          #filter
          (input)="onGlobalFilter(dt, $event)"
          placeholder="Search Keyword"
          class="w-full"
        />
      </span>
    </div>
  </ng-template>

  <ng-template pTemplate="header">
    <tr>
      <th style="width: 3rem">
        <div class="flex justify-content-center">
          <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
        </div>
      </th>
      <th pSortableColumn="name" style="min-width: 14rem">
        <div class="flex justify-content-between align-items-center">
          Name
          <p-sortIcon field="name"></p-sortIcon>
          <p-columnFilter
            type="text"
            field="name"
            display="menu"
            class="ml-auto"
          ></p-columnFilter>
        </div>
      </th>
      <th pSortableColumn="price">
        <div class="flex justify-content-between align-items-center">
          Price
          <p-sortIcon field="price"></p-sortIcon>
          <p-columnFilter
            type="numeric"
            field="price"
            display="menu"
            currency="USD"
            class="ml-auto"
          ></p-columnFilter>
        </div>
      </th>
      <th pSortableColumn="category" style="min-width: 10rem">
        <div class="flex justify-content-between align-items-center">
          Category
          <p-sortIcon field="category"></p-sortIcon>
          <p-columnFilter
            field="category"
            matchMode="equals"
            display="menu"
            class="ml-auto"
          >
            <ng-template
              pTemplate="filter"
              let-value
              let-filter="filterCallback"
            >
              <p-dropdown
                [ngModel]="value"
                [options]="categories"
                (onChange)="filter($event.value)"
                placeholder="Any"
              >
                <ng-template let-option pTemplate="item">
                  <span>{{option.label}}</span>
                </ng-template>
              </p-dropdown>
            </ng-template>
          </p-columnFilter>
        </div>
      </th>
      <th pSortableColumn="inventoryStatus" style="min-width: 10rem">
        <div class="flex justify-content-between align-items-center">
          Status
          <p-sortIcon field="inventoryStatus"></p-sortIcon>
          <p-columnFilter
            field="inventoryStatus"
            matchMode="equals"
            display="menu"
            class="ml-auto"
          >
            <ng-template
              pTemplate="filter"
              let-value
              let-filter="filterCallback"
            >
              <p-dropdown
                [ngModel]="value"
                [options]="statuses"
                (onChange)="filter($event.value)"
                placeholder="Any"
              >
                <ng-template let-option pTemplate="item">
                  <p-tag
                    [value]="option.value"
                    [severity]="getSeverity(option.value)"
                  ></p-tag>
                </ng-template>
              </p-dropdown>
            </ng-template>
          </p-columnFilter>
        </div>
      </th>
      <th style="width: 5rem"></th>
    </tr>
  </ng-template>

  <ng-template pTemplate="body" let-product>
    <tr>
      <td>
        <div class="flex justify-content-center">
          <p-tableCheckbox [value]="product"></p-tableCheckbox>
        </div>
      </td>
      <td>
        <span class="p-column-title">Name</span>
        {{product.name}}
      </td>
      <td>
        <span class="p-column-title">Price</span>
        {{product.price | currency:'USD'}}
      </td>
      <td>
        <span class="p-column-title">Category</span>
        {{product.category}}
      </td>
      <td>
        <span class="p-column-title">Status</span>
        <p-tag
          [value]="product.inventoryStatus"
          [severity]="getSeverity(product.inventoryStatus)"
        ></p-tag>
      </td>
      <td>
        <button
          pButton
          pRipple
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success mr-2"
          (click)="editProduct(product)"
        ></button>
        <button
          pButton
          pRipple
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          (click)="deleteProduct(product)"
        ></button>
      </td>
    </tr>
  </ng-template>
  <ng-template pTemplate="emptymessage">
    <tr>
      <td colspan="8">No products found.</td>
    </tr>
  </ng-template>
</p-table>
```

## Prime vs. Other Component Libraries

### Prime vs. Material UI

| Feature               | Prime                           | Material UI              |
| --------------------- | ------------------------------- | ------------------------ |
| **Design System**     | Multiple themes                 | Material Design          |
| **Component Count**   | 90+ (more complete)             | 30+                      |
| **Framework Support** | Angular, React, Vue             | React (primarily)        |
| **Enterprise Focus**  | Yes, business-oriented          | More general-purpose     |
| **License**           | MIT (free) with premium options | MIT (free)               |
| **Theming**           | More flexible, multiple themes  | Material Design focused  |
| **Customization**     | Theme Designer API              | Theme Provider           |
| **Company Support**   | PrimeTek (commercial support)   | Material-UI Organization |

### Prime vs. Bootstrap

| Feature                   | Prime                             | Bootstrap                    |
| ------------------------- | --------------------------------- | ---------------------------- |
| **Framework Integration** | Deep framework integration        | Framework adaptations        |
| **Component Richness**    | Feature-rich components           | Simpler components           |
| **Data Components**       | Extensive data components         | Limited, requires extensions |
| **JavaScript**            | Framework-specific implementation | jQuery or custom JS          |
| **Theming**               | Theme Designer, multiple themes   | Sass variables               |
| **Enterprise Focus**      | Enterprise-ready                  | General-purpose              |
| **Learning Curve**        | Steeper                           | Flatter                      |

## When to Use Prime Libraries

### Ideal Use Cases

1. **Enterprise Applications**: Data-heavy business applications
2. **Admin Dashboards**: Rich controls and data visualization
3. **Complete Ecosystems**: When you need a comprehensive solution
4. **Framework-specific Projects**: Deep integration with Angular/React/Vue
5. **Complex UIs**: Advanced components like data tables, charts, trees
6. **Consistent Theming**: Need for design system consistency

### Less Ideal Cases

1. **Simple Websites**: May be overkill for brochure sites
2. **Minimalist Designs**: Comes with distinct visual style
3. **Small Projects**: Might add unnecessary weight
4. **Custom Design Systems**: If you need a highly custom look
5. **Bleeding-edge Design Trends**: Focuses on enterprise standards

## Resources

- [PrimeNG Documentation](https://primeng.org/)
- [PrimeReact Documentation](https://primereact.org/)
- [PrimeVue Documentation](https://primevue.org/)
- [PrimeFaces Documentation](https://primefaces.org/)
- [PrimeBlocks](https://blocks.primeng.org/) (UI blocks and templates)
- [PrimeFlex Documentation](https://primeflex.org/)
- [PrimeIcons](https://primeng.org/icons)
- [GitHub Repositories](https://github.com/primefaces)
- [Prime YouTube Channel](https://www.youtube.com/channel/UCTgmp69aBOlLnPEqlA1dxkw)
- [PrimeLand](https://primeland.app/) (Online IDE)

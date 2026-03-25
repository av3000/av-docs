<!-- Why enums are actually wrong to use -->

<!-- The const type way -->

```
export const DASHBOARD_TYPES = {
	ADMIN: 'ADMIN',
	COMMON_USER: 'COMMON_USER',
} as const;

export type DashboardType = (typeof DASHBOARD_TYPES)[keyof typeof DASHBOARD_TYPES];
```

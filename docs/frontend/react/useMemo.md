<!-- Why use it and when -->

memoizes the result so React only recomputes the array when the input changes.

Example of query data that has items in each page. Pages are cached on react query side, and useMemo recalculates only when pages change

```
const allCatalogues = useMemo<Catalogue[]>(
  () => data?.pages.flatMap(
          (page) => page.items
        ) ?? [], [data?.pages]
);
```

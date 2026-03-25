<!-- When to use it and why -->

useCallback for function with zero dependencies list.

2 reasons here to use it:

- On every render the function is recreated as it gets a new reference, which then can cause rerender of the component that uses this method.
- filterResults may be used in useEffect in <SearchBarDashboard> which then may be retriggered because of this function.

```
const handleFilterResults = useCallback((newFilters: SearchFilters) => {
  const keyword = newFilters.keyword.trim();
  const mappedSort = newFilters.sortByWhat === 'pop' ? 'views' : 'created_at';
  const parsedType = Number(newFilters.filterType);

  setFilters({
    search: keyword || undefined,
    sort_by: mappedSort,
    sort_dir: 'desc',
    type: LIST_FILTER_TYPES.has(parsedType) ? parsedType : undefined,
  });
}, []);


<div className="ml-3 mt-2">
  <SearchBarDashboard searchType="lists" filterResults={handleFilterResults} />
</div>

```

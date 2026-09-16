import { ref, unref, computed, watch } from "vue";

export function useDataTable(items, options = {}) {

  const {
    searchFields = [],
    itemsPerPage: initialItemsPerPage = 10,
  } = options;

  const search = ref('');
  const currentPage = ref(1);
  const itemsPerPage = ref(initialItemsPerPage);
  const sortKey = ref('');
  const sortDirection = ref('asc');

  const filteredItems = computed(() => {
    const data = unref(items) ?? [];
    const query = String(search.value ?? '').trim().toLowerCase();

    if (!query) return data;

    return data.filter((item) => {
      return searchFields.some((field) => {
        return String(item[field] ?? '').toLowerCase().includes(query);
      });
    });
  });

  const sortedItems = computed(() => {
    const data = [...filteredItems.value];

    if (!sortKey.value) return data;

    return data.sort((firstItem, secondItem) => {
      const firstValue = firstItem = String(firstItem[sortKey.value] ?? '').toLowerCase();
      const secondValue = secondItem = String(secondItem[sortKey.value] ?? '').toLowerCase();
      const comparison = firstValue.localeCompare(secondValue, undefined, { numeric: true, sensitivity: 'base' });
      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  });

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedItems.value.slice(start, end);
  });

  const handleSearch = (value) => {
    search.value = value;
    currentPage.value = 1;
  }

  const handleSort = ({ key, direction }) => {
    sortKey.value = key;
    sortDirection.value = direction;
    currentPage.value = 1;
  }

  const handlePageChange = (page) => {
    currentPage.value = Number(page);
  }

  const handleItemsPerPageChange = (value) => {
    itemsPerPage.value = Number(value);
    currentPage.value = 1;
  }

  watch(
    () => sortedItems.value.length,
    (totalItems) => {
      const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage.value));
      if (currentPage.value > totalPages) currentPage.value = totalPages;
    }
  );

  return {
    search,
    currentPage,
    itemsPerPage,
    sortKey,
    sortDirection,
    filteredItems,
    sortedItems,
    paginatedItems,
    handleSearch,
    handleSort,
    handlePageChange,
    handleItemsPerPageChange
  };

}

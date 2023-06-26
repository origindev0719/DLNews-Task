export const getUniqueChains = (data) => {
  const tempChainsItems = data.reduce((chains, item) => {
    const chainsItems = item.chains.filter((chain) => {
      const chainLabel = chain.label || chain;
      return !chains.includes(chainLabel);
    });

    return chains.concat(chainsItems);
  }, []);

  const uniqueChains = tempChainsItems.map((chainItem) => ({
    label: chainItem,
    key: chainItem,
  }));

  return uniqueChains.sort((a, b) => a.label.localeCompare(b.label));
};

export const getUniqueCategories = (data) => {
  const uniqueCategories = [];
  data.forEach((item) => {
    if (
      !uniqueCategories.some((category) => category.label === item.category)
    ) {
      uniqueCategories.push({ label: item.category, key: item.category });
    }
  });
  return uniqueCategories.sort((a, b) => a.label.localeCompare(b.label));
};

export const filterProtocols = (data, setting) => {
  const { chain, category } = setting.filterItems;

  const filteredData = data.filter(
    (item) =>
      (chain ? item.chains.includes(chain) : true) &&
      (category ? item.category === category : true)
  );
  return filteredData;
};

export const sortProtocols = (data, setting) => {
  const sortedData = [...data].sort((a, b) => {
    if (setting.sortDir === "asc") {
      if (setting.sortKeyword === "id") {
        return b[setting.sortKeyword] - a[setting.sortKeyword];
      }
      return a[setting.sortKeyword] > b[setting.sortKeyword] ? 1 : -1;
    } else {
      if (setting.sortKeyword === "id") {
        return a[setting.sortKeyword] - b[setting.sortKeyword];
      }
      return a[setting.sortKeyword] < b[setting.sortKeyword] ? 1 : -1;
    }
  });
  return sortedData;
};

export const paginateProtocols = (sortedData, setting) => {
  const startIndex = (setting.currentPage - 1) * setting.pagePer;
  const endIndex = startIndex + setting.pagePer;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  return paginatedData;
};

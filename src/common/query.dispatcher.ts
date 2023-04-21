export const getFilterQuery = (params: object): object | null => {
  if (params) {
    const filter = {};
    Object.keys(params).map((e) => {
      if (params[e]) {
        filter[e] = params[e];
      }
    });
    return Object.keys(filter).length > 0 ? filter : null;
  } else {
    return null;
  }
};
export const getSortQuery = (sortField: string, sortOrder: string) => {
  if (sortField && sortOrder) {
    // convert sortOrder
    const convertedSortOrder = sortOrder === 'asc' ? 0 : 1;
    // create query and return
    const query = {};
    query[sortField] = convertedSortOrder;
    return query;
  } else {
    return undefined;
  }
};

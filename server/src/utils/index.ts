
export function generateSearchQuery<T>(fields: T) {
  return Object
    .entries(fields)
    .reduce((query, [key, value]) => {
      query[key] = { $regex: value }
      return query;
    }, {});
}
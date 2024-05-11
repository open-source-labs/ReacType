/**
 * Deeply clones an object or an array, including nested objects and arrays.
 * @param {object | any[]} value - The object or array to be cloned.
 * @returns {object | any[]} Returns a deep clone of the input value.
 */
function cloneDeep(
  value: { [key: string]: any } | any[]
): { [key: string]: any } | any {
  if (Array.isArray(value)) {
    const result: any[] = [];
    value.forEach((el) => {
      if (typeof el === 'object') {
        result.push(cloneDeep(el));
      } else {
        result.push(el);
      }
    });
    return result;
  }
  if (typeof value === 'object' && value !== null) {
    const result: { [key: string]: any } = {};
    Object.keys(value).forEach((key) => {
      if (typeof value[key] === 'object') {
        result[key] = cloneDeep(value[key]);
      } else {
        result[key] = value[key];
      }
    });
    return result;
  }
  return value;
}
export default cloneDeep;

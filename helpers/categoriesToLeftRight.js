export function categoriesToLeftRight(categories) {
  let result = [];
  if (categories.length % 2 === 0) {
    for (let i = 0; i < categories.length; i += 2) {
      // Slice the array from the current index and grab the next two elements
      result.push(categories.slice(i, i + 2));
    }
    return result;
    // const leftCategories = categories.slice(0, (categories.length + 1) / 2);
    // const rightCategories = categories.slice((categories.length + 1) / 2);
    // return {
    //   leftCategories,
    //   rightCategories,
    // };
  } else {
    for (let i = 0; i < categories.length; i += 2) {
      if (i === categories.length - 1) {
        result.push(categories.slice(i, i + 1));
      }
      // Slice the array from the current index and grab the next two elements
      result.push(categories.slice(i, i + 2));
    }
    return result;
    // const leftCategories = categories.slice(0, categories.length / 2);
    // const rightCategories = categories.slice(categories.length / 2);
    // return {
    //   leftCategories,
    //   rightCategories,
    // };
  }
}

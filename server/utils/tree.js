function toTree(id, arr) {
  let children = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.pid == id) {
      children.push(item);
      item.children = toTree(item.id, arr);
    }
  }
  return children;
}

exports = module.exports = (id, arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  let result = toTree(id, arr);
  return result;
};

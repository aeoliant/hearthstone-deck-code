Array.prototype.stableSort = function(f) {
  return this.map((ele, i) => ({ele: ele, i: i}))
  .sort((a, b) => {
    var val = f(a.ele, b.ele);
    if (val === 0) {
      return a.i - b.i;
    }
    return val;
  }).map(ele => {
    return ele.ele;
  });
};

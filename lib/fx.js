export const log = console.log;

export const L = {};

const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }

  return res;
});

export const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }

  return res;
});

export const reduce = curry((f, s, iter) => {
  if (!iter) {
    iter = s[Symbol.iterator]();
    s = iter.next().value;
  }

  for (const a of iter) {
    s = f(a, s);
  }

  return s;
});

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

export const go = (...fs) => reduce((f, s) => f(s), fs);
export const pipe = (f, ...fs) => (a, ...as) => go(f(a, ...as), ...fs);

export const take = curry((l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) break;
  }

  return res;
});
export const takeAll = take(Infinity);

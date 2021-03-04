import { Deta } from 'deta';

function getCookieValue(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

const pk = getCookieValue('pk');

const putItems = async (base, items) => {
  const l = items.length;
  if (l <= 24) {
    return base.putMany(items);
  }
  // putMany op supports only 25 items max
  // send in batches of 25 items if more than 25 items
  let start = 0,
    end = 0;
  while (end != l) {
    end += 24;
    if (end > l) {
      end = l;
    }
    try {
      base.putMany(items.slice(start, end));
    } catch (err) {
      return Promise.reject(err);
    }
    start = end;
  }
  return Promise.resolve(tasks);
};

const tasks = Deta(pk).Base('tasks');
const config = Deta(pk).Base('config');

const db = {
  tasks: tasks,
  config: config,
  putItems: putItems,
};

export default db;

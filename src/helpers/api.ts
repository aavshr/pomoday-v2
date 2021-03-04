import db from './db';
import { TaskStatus } from './utils';

export const pullTasksFromDB = async () => {
  const storedTasks = db.tasks.fetch();
  var tasks = [];
  for await (const taskItems of storedTasks) {
    for (const task of taskItems) {
      tasks.push(task);
    }
  }
  if (tasks.length === 0) {
    return Promise.resolve(null);
  }
  return Promise.resolve(tasks);
};

export const pushTasksToDB = (tasks, deletedTasks) => {
  let toPush = [];
  tasks.forEach(task => {
    if (task.status !== TaskStatus.NONE) {
      toPush.push(task);
    }
  });
  // delete each deleted task
  deletedTasks.forEach(async task => {
    await db.tasks.delete(task.key);
  });
  if (toPush.length) {
    return db.putItems(db.tasks, toPush);
  }
};

export const pullConfigFromDB = () => {
  return db.config.get('pomoday');
};

export const pushConfigToDB = config => {
  return db.config.put({ config: config }, 'pomoday');
};

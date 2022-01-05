import {db} from '../config';

export function addWorkHour(whour) {
  db.ref('/tasks').push({
    id: whour.id,
    title: whour.title,
  });
}

export async function getWorkHour(tasksRetrieved) {
  let taskList = [];

  db.ref('/tasks').on('value', querySnapShot => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    taskList = {...data};
  });

  tasksRetrieved(taskList);
}

import firebase from 'react-native-firebase';

export function addWorkHour(whour, addComplete) {
  firebase
    .firestore()
    .collection('tasks')
    .add({
      id: whour.id,
      title: whour.title,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(data => addComplete(data))
    .catch(error => console.log(error));
}

export async function getWorkHour(tasksRetrieved) {
  var taskList = [];

  var snapshot = await firebase
    .firestore()
    .collection('tasks')
    .orderBy('createdAt')
    .get();

  snapshot.forEach(doc => {
    taskList.push(doc.data());
  });

  tasksRetrieved(taskList);
}

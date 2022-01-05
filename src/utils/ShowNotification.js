import {
  NotifierWrapper,
  Notifier,
  Easing,
  NotifierComponents,
} from 'react-native-notifier';

const showNotification = items => {
  console.log(items);
  console.log(items.text);
  Notifier.showNotification({
    title: items.title,
    description: items.text,
    duration: 10000,
    showAnimationDuration: 800,
    showEasing: Easing.bounce,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: items.type,
    },
  });
};

export default showNotification;

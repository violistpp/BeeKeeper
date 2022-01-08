import {
  NotifierWrapper,
  Notifier,
  Easing,
  NotifierComponents,
} from 'react-native-notifier';

export const showNotification = items => {
  Notifier.showNotification({
    title: items.title,
    description: items.text,
    duration: 10000,
    showAnimationDuration: 800,
    showEasing: Easing.bounce,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: items.type,
      backgroundColor: 'mediumseagreen',
    },
  });
};

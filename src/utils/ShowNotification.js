import {Notifier, Easing, NotifierComponents} from 'react-native-notifier';

export const showNotification = () => {
  Notifier.showNotification({
    title: 'John Doe',
    description: 'Hello! Can you help me with notifications?',
    duration: 10000,
    showAnimationDuration: 800,
    showEasing: Easing.bounce,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: 'warn',
    },
  });
};

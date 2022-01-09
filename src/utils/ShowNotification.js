import {Notifier, Easing, NotifierComponents} from 'react-native-notifier';

export const showNotification = items => {
  Notifier.showNotification({
    title: items.title,
    description: items.text,
    duration: 10000,
    showAnimationDuration: 800,
    showEasing: Easing.bounce,
    Component: NotifierComponents.Notification,
    componentProps: {
      alertType: items.type,
      containerStyle: {
        backgroundColor:
          items.type === 'success' ? 'mediumseagreen' : 'indianred',
      },
      descriptionStyle: {color: 'snow'},
      titleStyle: {color: 'snow'},
    },
  });
};

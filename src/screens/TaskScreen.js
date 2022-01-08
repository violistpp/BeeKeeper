import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import Header from '../containers/Header';
import Scanner from '../components/Scanner';
import DateSelection from '../components/DateSelection';
import TimeSelection from '../components/TimeSelection';
import DrawLine from '../components/DrawLine';
import uuid from 'react-native-uuid';
import ButtonHexagon from '../components/ButtonHexagon';
import WorkHourItem from '../containers/WorkHourItem';
import {addWorkHour, getWorkHour} from '../api/FirebaseApi';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Notifier, Easing, NotifierComponents} from 'react-native-notifier';
import {showNotification} from '../utils/ShowNotification';

const DATA = [
  {id: uuid.v4(), title: 'Sumokėjau už medieną', interval: '00:04:01'},
  {id: uuid.v4(), title: 'Atvežiau medienos gabalus', interval: '00:05:46'},
  {id: uuid.v4(), title: 'Supjausčiau medį į dalis', interval: '02:15:15'},
  {id: uuid.v4(), title: 'Paruošiau įrankius darbui', interval: '01:10:07'},
];

const screen = Dimensions.get('window');
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const hours = Math.floor(time / 60 / 60);
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

const TaskScreen = item => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [items, setItems] = useState(DATA);
  const [sortBy, setSortBy] = useState(['id', 'title']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [modalInputText, setModalInputText] = useState('');
  const [editItem, setEditItem] = useState();
  const [isRender, setIsRender] = useState(false);
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const {hours, mins, secs} = getRemaining(remainingSecs);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonLocale = useState(new Animated.ValueXY({x: -270, y: 0}))[0];

  const toggle = item => {
    setIsActive(!isActive);
    moveButton();
    if (isActive) {
      setItems(prevItems => {
        return [
          {
            id: uuid.v4(),
            title: 'NEW WORK HOUR',
            interval: `${hours}:${mins}:${secs}`,
          },
          ...prevItems,
        ];
      });
      setRemainingSecs(0);
    }
  };

  function moveButton() {
    Animated.timing(buttonLocale, {
      toValue: {x: isActive ? -270 : 0, y: 0},
      duration: 700,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isActive ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, isActive]);

  const editItemFn = item => {
    setIsModalVisible(true);
    setModalInputText(item.title);
    setEditItem(item.id);
  };

  const scannerFn = () => {
    setIsModalVisible2(true);
  };

  const handleEditItem = editItem => {
    const newData = items.map(item => {
      if (item.id == editItem) {
        item.title = modalInputText;
        return item;
      }
      return item;
    });
    setItems(newData);
    setIsRender(!isRender);
  };

  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setIsModalVisible(false);
  };

  const onPressCancleEdit = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    if (isModalVisible2) {
      setIsModalVisible2(false);
    }
  };

  const onSuccessScan = item => {
    setIsModalVisible2(false);
    console.log(item);
    showNotification({
      title: 'Good!',
      text: 'Scanned successfully ',
      type: 'success',
    });
    toggle();
  };

  const goBackFn = () => {
    item.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title={item.route.params.item.item.title}
        leftFn={goBackFn}
        rightFn={scannerFn}
      />
      <Text style={styles.littleHeader}>Term of delivery</Text>
      <DateSelection
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <TimeSelection
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <DrawLine />
      <Text style={styles.littleHeader}>Description</Text>
      <TextInput
        multiline
        editable
        maxLength={40}
        numberOfLines={4}
        onChangeText={text => setDescription(text)}
        value={description}
        placeholder="description..."
        style={{paddingHorizontal: 20}}
      />
      <View style={styles.actionContainer}>
        <Animated.View style={{opacity: fadeAnim}}>
          <Text style={styles.timerText}>{`${hours}:${mins}:${secs}`}</Text>
        </Animated.View>
        <Animated.View style={buttonLocale.getLayout()}>
          <ButtonHexagon toggle={toggle} isActive={isActive} />
        </Animated.View>
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <WorkHourItem item={item} editItem={editItemFn} />
        )}
        extraData={isRender}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Change Title: </Text>
          <TextInput
            style={styles.modalTextInput}
            onChangeText={text => setModalInputText(text)}
            defaultValue={modalInputText}
            editable={true}
            maxLength={200}
          />
          <TouchableOpacity
            onPress={() => onPressSaveEdit()}
            style={[styles.buttonStyle, {backgroundColor: 'goldenrod'}]}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressCancleEdit()}
            style={[styles.buttonStyle, {backgroundColor: 'darkgrey'}]}>
            <Text style={styles.text}>Cancle</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={isModalVisible2}
        onRequestClose={() => setIsModalVisible2(false)}>
        <View style={[styles.modalView, {backgroundColor: 'black'}]}>
          <Scanner onSuccess={onSuccessScan} flashMode={flashOn} />
          <View style={styles.buttonsLine}>
            <TouchableOpacity
              onPress={() => onPressCancleEdit()}
              style={[
                styles.buttonStyle,
                {backgroundColor: 'goldenrod', marginTop: 0, margin: 10},
              ]}>
              <Text style={styles.text}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFlashOn(!flashOn)}
              style={[
                styles.buttonStyle,
                {backgroundColor: 'darkgrey', marginTop: 0, margin: 10},
              ]}>
              <Icon name="flash" size={20} color="snow" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'snow',
  },
  littleHeader: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    backgroundColor: 'oldlace',
    height: 43.99,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonStyle: {
    paddingHorizontal: 30,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  timerText: {
    fontSize: 30,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  modalText: {
    fontSize: 20,
  },
  modalTextInput: {
    width: '90%',
    height: 70,
    borderColor: 'goldenrod',
    borderWidth: 1,
    fontSize: 25,
    marginTop: 10,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

export default TaskScreen;

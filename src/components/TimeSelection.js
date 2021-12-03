import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeSelection = ({startTime, setStartTime, endTime, setEndTime}) => {
  const [mode, setMode] = useState('time');
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const onChangeStartTime = (event, selectedTime) => {
    const currentDate = selectedTime || startTime;
    setStartTime(currentDate);
    setShowStartTime(false);
  };
  const onChangeEndTime = (event, selectedTime) => {
    const currentDate = selectedTime || endTime;
    setEndTime(currentDate);
    setShowEndTime(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateTimeStyle}
        onPress={() => setShowStartTime(true)}>
        <View>
          <Text style={styles.dataTime}>
            {startTime.getHours()}:{startTime.getMinutes()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dateTimeStyle}
        onPress={() => setShowEndTime(true)}>
        <View>
          <Text style={styles.dataTime}>
            {endTime.getHours()}:{endTime.getMinutes()}
          </Text>
        </View>
      </TouchableOpacity>
      {showStartTime && (
        <DateTimePicker
          testID="startDateTimePicker"
          value={startTime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />
      )}
      {showEndTime && (
        <DateTimePicker
          testID="EndDateTimePicker"
          value={endTime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
  },
  dateTimeStyle: {
    width: '50%',
    alignItems: 'center',
  },
  dataTime: {
    fontSize: 20,
  },
});

export default TimeSelection;

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelection = ({startDate, setStartDate, endDate, setEndDate}) => {
  const [mode, setMode] = useState('date');
  const [startShow, setStartShow] = useState(false);
  const [endShow, setEndShow] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setStartShow(false);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setEndShow(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        id="startDate"
        style={styles.dateTimeStyle}
        onPress={() => setStartShow(true)}>
        <View>
          <Text style={styles.dataTime}>
            {startDate.getFullYear()}-{startDate.getMonth() + 1}-
            {startDate.getDate()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        id="endDate"
        style={styles.dateTimeStyle}
        onPress={() => setEndShow(true)}>
        <View>
          <Text style={styles.dataTime}>
            {endDate.getFullYear()}-{endDate.getMonth() + 1}-{endDate.getDate()}
          </Text>
        </View>
      </TouchableOpacity>
      {startShow && (
        <DateTimePicker
          testID="startDateTimePicker"
          value={startDate}
          mode={mode}
          display="default"
          onChange={onChangeStart}
        />
      )}
      {endShow && (
        <DateTimePicker
          testID="endDateTimePicker"
          value={endDate}
          mode={mode}
          display="default"
          onChange={onChangeEnd}
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

export default DateSelection;

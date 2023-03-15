import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TitleBar} from '../../components/TitleBar';
import themes from '../../themes';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import ModalSelectReport from '../../components/ModalSelectReport';
import MonthPicker from 'react-native-month-year-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useCallback} from 'react';
import {
  reportDay,
  reportMonth,
  reportQuarter,
  reportYear,
} from '../../api/reportApi';
import formatCash from '../../utils/formatCash';
import {useEffect} from 'react';
import {getFormattedDate} from '../../utils/dateTime';
import SpinnerCustom from '../../components/Spinner';

const data = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      data: [600, 500, 120, 140, 1000, 5],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional

      strokeWidth: 2, // optional
    },
  ],
  legend: ['Tổng hóa đơn'], // optional
};

const StatisticManager = (props) => {
  const [visibleModal, setViSibleModal] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [valueReport, setValueReport] = useState({
    sumOrder: 0,
    totalMoney: 0,
  });
  const [option, setOption] = useState({
    day: false,
    month: false,
    year: false,
    quarter: false,
  });
  const [dateCalender, setDateCalender] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const showPicker = useCallback((value) => setShowMonth(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || dateCalender;
      showPicker(false);
      setDateCalender(selectedDate);
      setOption({
        day: false,
        month: false,
        year: false,
        quarter: false,
      });
    },
    [dateCalender, showPicker],
  );

  const onChangeCalendar = (event, selectedDate) => {
    const currentDate = selectedDate || dateCalender;
    setDateCalender(currentDate);
    setOption({
      day: false,
      month: false,
      year: false,
      quarter: false,
    });
  };

  const handleSubmit = (value) => {
    setViSibleModal(false);
    setOption(value);
    if (value.month || value.year || value.quarter) {
      showPicker(true);
    }
  };

  const sumTotalReport = (orders) => {
    let sumTotal = 0;
    if (orders.length > 0) {
      orders.map((item) => {
        sumTotal += item.total;
      });
    }
    return sumTotal;
  };

  const loadReportDay = () => {
    setLoading(true);
    reportDay({
      date: getFormattedDate(dateCalender),
    })
      .then((response) => {
        setLoading(false);
        setOrder(response.data);
        setValueReport({
          sumOrder: response.data.length,
          totalMoney: sumTotalReport(response.data),
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const loadReportMonth = () => {
    setLoading(true);
    reportMonth({
      month: dateCalender.getMonth() + 1,
      year: dateCalender.getFullYear(),
    })
      .then((response) => {
        setLoading(false);
        setOrder(response.data);
        setValueReport({
          sumOrder: response.data.length,
          totalMoney: sumTotalReport(response.data),
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const loadReportYear = () => {
    setLoading(true);

    reportYear({
      year: dateCalender.getFullYear(),
    })
      .then((response) => {
        setLoading(false);
        setOrder(response.data);
        setValueReport({
          sumOrder: response.data.length,
          totalMoney: sumTotalReport(response.data),
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const loadReportQuarter = () => {
    setLoading(true);

    reportQuarter({
      quarter: 2,
      year: dateCalender.getFullYear(),
    })
      .then((response) => {
        setLoading(false);
        setOrder(response.data);
        setValueReport({
          sumOrder: response.data.length,
          totalMoney: sumTotalReport(response.data),
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const updateData = () => {
    if (option.day) {
      loadReportDay();
    } else if (option.month) {
      loadReportMonth();
    } else if (option.year) {
      loadReportYear();
    } else if (option.quarter) {
      loadReportQuarter();
    }
  };

  useEffect(() => {
    updateData();
  }, [dateCalender]);

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerCustom isVisible={loading} />
      {option.day && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateCalender}
          mode="date"
          is24Hour={true}
          display={
            Platform.OS === 'ios' && Platform.Version >= 14.4
              ? 'inline'
              : 'default'
          }
          onChange={onChangeCalendar}
          dateFormat="day month year"
        />
      )}
      {showMonth && (
        <MonthPicker
          onChange={onValueChange}
          value={dateCalender}
          // minimumDate={new Date()}
          // maximumDate={new Date(2025, 5)}
          locale="vi"
        />
      )}
      <ModalSelectReport
        visible={visibleModal}
        eventButtonCancel={() => setViSibleModal(false)}
        eventButtonConfirm={(value) => handleSubmit(value)}
      />
      <TitleBar
        name="Báo cáo doanh thu"
        eventButton={() => props.navigation.goBack()}
      />
      <ScrollView
        style={styles.contentView}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: '10%'}}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => setViSibleModal(true)}>
            <View style={styles.titleButton}>
              <Text style={{fontSize: themes.Text.titleText}}>
                Chọn lọc doanh thu theo
              </Text>
              <Icon name={'chevron-down'} size={15} />
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: themes.Text.titleText}}>
            Báo cáo ngày: {getFormattedDate(dateCalender)}
          </Text>
          <View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>● Tổng số hóa đơn:</Text>
              <Text style={styles.detailText}>
                {valueReport.sumOrder} hóa đơn
              </Text>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>● Tổng tiền:</Text>
              <Text style={styles.detailText}>
                {formatCash(valueReport.totalMoney + '')} VNĐ
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.titleView,
                {marginTop: themes.Spacing.large, alignItems: 'center'},
              ]}
              onPress={()=>  props.navigation.navigate('listOrder', {orders: order})}
              >
              <Text style={styles.titleText}>Xem danh sách hóa đơn</Text>
              <Icon name={'chevron-right'} size={15} />
            </TouchableOpacity>
          </View>
        </View>

        <LineChart
          style={{borderRadius: 10, marginVertical: themes.Spacing.medium}}
          data={data}
          yAxisSuffix=" HĐ"
          width={Dimensions.get('window').width - themes.Spacing.extra_large}
          height={220}
          bezier
          chartConfig={{
            backgroundColor: themes.Colors.white,
            backgroundGradientFrom: '#E4E4E4',
            backgroundGradientTo: '#E4E4E4',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  contentView: {
    marginHorizontal: themes.Spacing.large,
  },
  buttonView: {
    marginVertical: themes.Spacing.medium,
    backgroundColor: '#f2f2f2',
    padding: themes.Spacing.medium,
    borderRadius: 5,
  },
  titleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  titleText: {
    marginLeft: themes.Spacing.medium,
    marginVertical: themes.Spacing.small,
  },
  detailText: {
    fontWeight: 'bold',
    marginVertical: themes.Spacing.small,
  },
});
export default StatisticManager;

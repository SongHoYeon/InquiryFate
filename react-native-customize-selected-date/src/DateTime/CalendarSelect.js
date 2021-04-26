import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import CommonFn from './commonFn'
import moment from 'moment'
import styles from './styles/CalendarSelectStyles'
import _ from 'lodash'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CalendarSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            viewMode: 'day',
            lunar: [],
            lunarLoading: false,
        }
        props.socket.send('RequestMonthData', props.calendarMonth);
        props.socket.listen('ResponseMonthData', (res) => {
            this.setState({ lunar: res })
            this.setState({ lunarLoading: true })
        });
    }
    renderDay(day) {
        const { calendarMonth, date, warpDayStyle, dateSelectedWarpDayStyle,
            textDayStyle, currentDayStyle, notCurrentDayOfMonthStyle } = this.props
        const isCurrentMonth = calendarMonth === CommonFn.ym()
        const isCurrent = isCurrentMonth && CommonFn.ymd() === day.key
        const dateSelected = date && CommonFn.ymd(date) === day
        const notCurrentMonth = day.indexOf(calendarMonth) !== 0
        return (
            <TouchableOpacity onPress={() => this.selectDate(day)}
                style={[styles.warpDay, warpDayStyle,
                dateSelected ? { backgroundColor: '#2C1F23', dateSelectedWarpDayStyle } : {}]}>
                <View>
                    <Text style={[styles.day, textDayStyle,
                    isCurrent ? { color: 'red', ...currentDayStyle } : {},
                    notCurrentMonth ? { color: '#493D40', ...notCurrentDayOfMonthStyle } : {}]}>
                        {day.split('-')[2]}
                    </Text>
                    <Text style={[styles.lunarDay]}>
                        {
                            notCurrentMonth ? " " :
                                this.state.lunarLoading === true ?
                                    this.state.lunar.map(item => item.cd_sd === day.split('-')[2].replace(/(^0+)/, "") ?
                                        (item.cd_ld === '1' || day.split('-')[2].replace(/(^0+)/, "") === '1' ?
                                            item.cd_lm + "." + item.cd_ld : item.cd_ld) : "") : ""
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    selectDate(date) {
        if (this.isDateEnable(date)) {
            this.props.selectDate(date)
        }
    }

    yearMonthChange(type, unit) {
        let { viewMode, currentYear } = this.state
        if (viewMode === 'day') {
            this.props.calendarChange(type, unit)
        } else {
            this.setState({
                currentYear: currentYear + (type < 0 ? -12 : 12)
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { calendarMonth } = this.props;
        if (calendarMonth !== prevProps.calendarMonth) {
            this.props.socket.send('RequestMonthData', calendarMonth);
            this.props.socket.listen('ResponseMonthData', (res) => {
                this.setState({ lunar: res })
            });
        }
    }
    isDateEnable(date) {
        const { minDate, maxDate } = this.props
        return date >= minDate && date <= maxDate
    }

    render() {
        const {
            calendarMonth, renderPrevYearButton, renderPrevMonthButton,
            renderNextYearButton, renderNextMonthButton,
            weekdayStyle, customWeekdays, warpRowWeekdays,
            warpRowControlMonthYear
        } = this.props
        const weekdays = customWeekdays || ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat']
        const data = CommonFn.calendarArray(calendarMonth)
        var dayOfWeek = []
        _.forEach(weekdays, element => {
            dayOfWeek.push(<Text key={element} style={[styles.weekdays, weekdayStyle]}>{element}</Text>)
        })

        return (
            <View style={styles.container}>
                {<Text style={[{ color: "#fff" }]}>{this.state.lunarLoading}</Text>}
                <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }, warpRowControlMonthYear]}>
                    <TouchableOpacity onPress={() => this.yearMonthChange(-1, 'year')}>
                        {renderPrevYearButton ? renderPrevYearButton() : <MCIcons name='chevron-double-left' size={30} color='#ff2121' />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.yearMonthChange(-1, 'month')}>
                        {renderPrevMonthButton ? renderPrevMonthButton() : <MCIcons name='chevron-left' size={30} color='#ff2121' />}
                    </TouchableOpacity>
                    <Text style={styles.txtHeaderDate}>{calendarMonth.split('-')[1]}</Text>
                    <Text style={styles.txtHeaderDate}>{calendarMonth.split('-')[0]}</Text>
                    <TouchableOpacity onPress={() => this.yearMonthChange(1, 'month')}>
                        {renderNextYearButton ? renderNextYearButton() : <MCIcons name='chevron-right' size={30} color='#ff2121' />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.yearMonthChange(1, 'year')}>
                        {renderNextMonthButton ? renderNextMonthButton() : <MCIcons name='chevron-double-right' size={30} color='#ff2121' />}
                    </TouchableOpacity>
                </View>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-around' }, warpRowWeekdays]}>
                    {dayOfWeek}
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item}
                    renderItem={({ item }) => this.renderDay(item)}
                    extraData={this.state}
                    numColumns={7}
                />
            </View>
        )
    }
}

const propTypes = {
    customWeekdays: PropTypes.array,
    renderPrevYearButton: PropTypes.func,
    renderPrevMonthButton: PropTypes.func,
    renderNextYearButton: PropTypes.func,
    renderNextMonthButton: PropTypes.func,
    //style
    warpRowControlMonthYear: PropTypes.object,
    warpRowWeekdays: PropTypes.object,
    weekdayStyle: PropTypes.object,
    textDayStyle: PropTypes.object,
    currentDayStyle: PropTypes.object,
    notCurrentDayOfMonthStyle: PropTypes.object,
    warpDayStyle: PropTypes.object,
    dateSelectedWarpDayStyle: PropTypes.object,

}

const defaultProps = {
    customWeekdays: ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat']
}

CalendarSelect.propTypes = propTypes
CalendarSelect.defaultProps = defaultProps
export default CalendarSelect;
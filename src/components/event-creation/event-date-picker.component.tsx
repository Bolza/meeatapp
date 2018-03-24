import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
// import DatePicker from 'react-native-datepicker'
import moment from "moment";

import { EventCreationSetDateAction } from "./event-creation.actions";
import { INITIAL_STATE } from "./event-creation.reducer";

interface State {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
}

// const DEFAULT_DATE = moment().format('LT');

class DatePickerComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { date: INITIAL_STATE.date };
  }

  render() {
    return (
      <View />
      // <DatePicker
      //     style={[{flex: 1}, this.props.style]}
      //     date={this.props.date}
      //     mode='time'
      //     placeholder='select date'
      //     format='hh:mm'
      //     is24Hour={true}
      //     confirmBtnText='Confirm'
      //     cancelBtnText='Cancel'
      //     minuteInterval={30}
      //     customStyles={{
      //         dateIcon: {
      //             display: 'none'
      //         },
      //         dateText: {
      //             fontSize: 24,
      //         },
      //         dateInput: {
      //             borderWidth: 0,
      //             flex: 1,
      //             alignSelf: 'flex-end'
      //         },
      //         datePicker: {
      //             minWidth: 320
      //         },
      //         container: {
      //             minWidth: 320
      //         }
      //     }}
      //     onDateChange={date => this.setDate(date)}
      // />
    );
  }

  private setDate(date: string) {
    this.props.dispatch(EventCreationSetDateAction(date));
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    paddingLeft: 20
  }
} as any);

const mapStateToProps = state => {
  return { date: state.eventCreation.date };
};

export default connect(mapStateToProps)(DatePickerComponent);

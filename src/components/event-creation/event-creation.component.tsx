import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { isEmpty } from "lodash";

import {
  EventCreationSetDateAction,
  CreateEventAction,
  EventCreationSetSlotsAction
} from "./event-creation.actions";
import {
  Card,
  CardSection,
  Input,
  Stepper,
  HideableView,
  Container,
  LocationCard
} from "../common";
import { GeoRegion } from "../../types";
import EventLocation from "./event-location.component";
import DatePicker from "./event-date-picker.component";
import { LONDON } from "./event-location.component";
import { INITIAL_STATE } from "./event-creation.reducer";

interface State {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
}

class EventCreationComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
    if (nextProps.date !== this.props.date) {
      this.setState({ date: nextProps.date });
    }
    if (nextProps.people !== this.props.people) {
      this.setState({ people: nextProps.people });
    }
    if (nextProps.slots !== this.props.slots) {
      this.setState({ slots: nextProps.slots });
    }
  }

  render() {
    return (
      <Container fade style={{ flex: 1 }} success={this.state.completeVisible}>
        <View style={{ flex: 1 }}>
          <EventLocation
            style={{ flex: 1 }}
            onListVisibility={visible => this.setListVisibility(visible)}
          />
          <LocationCard item={this.props.details} />
        </View>
        <HideableView
          style={{ height: 300 }}
          removeWhenHidden
          visible={!this.state.listVisible}
        >
          <Card style={{ borderWidth: 3 }}>
            <CardSection>
              <Text style={styles.label}>How Many People?</Text>
              <Stepper
                style={{ width: 120 }}
                startFrom={INITIAL_STATE.slots}
                min={2}
                max={20}
                onChange={n => this.setSlots(n)}
              />
            </CardSection>
            <CardSection>
              <Text style={styles.label}>When?</Text>
              <DatePicker style={{ alignSelf: "center" }} />
            </CardSection>
            <CardSection style={{ flex: 0 }}>
              <Button
                raised
                containerViewStyle={styles.creationButton}
                backgroundColor="#1faadb"
                icon={{ name: "done" }}
                onPress={() => this.createTheEvent()}
              />
            </CardSection>
          </Card>
        </HideableView>
      </Container>
    );
  }

  private createTheEvent() {
    this.props.dispatch(CreateEventAction(this.state));
    this.setState({ completeVisible: true });
  }

  private closeComplete() {
    this.setState({ completeVisible: false });
  }

  private setListVisibility(visible) {
    this.setState({ listVisible: visible });
  }

  private setSlots(n) {
    this.props.dispatch(EventCreationSetSlotsAction(n));
  }
}

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontSize: 18,
    alignSelf: "center",
    color: "#333333"
  },
  creationButton: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  details: {
    fontSize: 13
  }
} as any);

const mapStateToProps = state => {
  return { ...state.eventCreation };
};

export default connect(mapStateToProps)(EventCreationComponent);

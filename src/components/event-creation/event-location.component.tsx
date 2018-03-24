import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
// import MapView from 'react-native-maps';
// import { GooglePlacesAutocomplete } from "../common/GooglePlacesAutocomplete.js";

import { EventCreationSetLocationAction } from "./event-creation.actions";
import { GeoRegion } from "../../types";
import { INITIAL_STATE } from "./event-creation.reducer";

interface State {
  current: GeoRegion;
  listOpen: boolean;
}
interface Props {
  [key: string]: any;
}

const ZOOM_CITY = 0.3;
const ZOOM_PLACE = 0.001;

export const LONDON: GeoRegion = {
  latitude: 51.531, // 37.78825,
  longitude: -0.12, // -122.4324,
  latitudeDelta: ZOOM_CITY,
  longitudeDelta: ZOOM_CITY
};

class EventLocation extends Component<Props, State> {
  map: any;
  initialRegion = {
    latitude: LONDON.latitude,
    longitude: LONDON.longitude,
    latitudeDelta: ZOOM_CITY,
    longitudeDelta: ZOOM_CITY
  };

  constructor(props) {
    super(props);
    this.state = {
      current: LONDON,
      listOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.current.latitude !== nextProps.current.latitude) {
      this.animateTo(nextProps.current);
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style] as any}>
        {/* <MapView
                    style={{flex: 1}}
                    ref={ref => { this.map = ref; }}
                    initialRegion={this.initialRegion}
                    onRegionChangeComplete={this.onRegionChange}
                    onPress={this.onMapPress}
                /> */}
        {/* <GooglePlacesAutocomplete
          textInputProps={{ autoCorrect: false }}
          placeholder="Enter Location"
          minLength={3}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
            container: { flex: 1 }
          }}
          currentLocation
          debounce={200}
          query={this.composeLocalQuery()}
          GooglePlacesSearchQuery={{
            rankby: "distance",
            types: "establishment"
          }}
          onListVisibility={visible =>
            this.onListVisibility.call(this, visible)
          }
          onPress={(data, details) =>
            this.onPlaceSelection.call(this, details, data)
          }
        /> */}
      </View>
    );
  }

  private onRegionChange(region) {
    // console.log('onRegionChangex', region);
  }

  private onListVisibility(isVisible) {
    this.setState({ listOpen: isVisible });
    if (this.props.onListVisibility) {
      this.props.onListVisibility(isVisible);
    }
  }

  private composeLocalQuery() {
    return {
      // available options: https://developers.google.com/places/web-service/autocomplete
      key: "AIzaSyBvTWMfJksaVNBhMnYpuNddgunzP1KUMIw",
      language: "en", // language of the results
      types: "establishment",
      location: {
        latitude: this.state.current.latitude,
        longitude: this.state.current.longitude
      },
      components: "country:uk|country:it"
    };
  }

  private onPlaceSelection(details) {
    this.props.dispatch(
      EventCreationSetLocationAction({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        id: details.place_id,
        name: details.name,
        address: details.formatted_address,
        phone: details.formatted_phone_number,
        rating: details.rating
      })
    );
  }

  // TODO should we kill the map selection?
  private onMapPress(e) {
    // console.log(e.nativeEvent.coordinate);
  }

  private animateTo(coords: GeoRegion) {
    const { latitude, longitude } = coords;
    this.map.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: ZOOM_PLACE,
        longitudeDelta: ZOOM_PLACE
      },
      200
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  }
} as any);

const mapStateToProps = state => {
  // console.log('state', state);
  return { current: state.eventCreation.location };
};

export default connect(mapStateToProps)(EventLocation);

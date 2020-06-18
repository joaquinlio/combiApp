import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const Buscador = (props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar destino"
      minLength={2}
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
        },
        listView: {
          backgroundColor: '#eef1f3',
          marginBottom: 200,
        },
        container: {
          margin: 10,
        },
        poweredContainer: {
          height: 10,
        },
      }}
      query={{
        key: 'AIzaSyCOTJJEIpdf0ahq6g5FWcSxvpPQLRas2P0',
        language: 'es',
        components: 'country:ar',
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        let coordenada = details.geometry.location;
        coordenada = {latitude: coordenada.lat, longitude: coordenada.lng};
        props.setRegion({
          latitude: coordenada.latitude,
          longitude: coordenada.longitude,
          latitudeDelta: 0.00522,
          longitudeDelta: (width / height) * 0.00522,
        });
        props.setDestSelect(coordenada);
        props.findRutas(coordenada);
      }}
    />
  );
};

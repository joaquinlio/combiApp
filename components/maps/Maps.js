import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {Confirmacion} from './Confirmacion';
import {Buscador} from './Buscador';
import {RoutesCarousel} from './RoutesCarousel';
const {width, height} = Dimensions.get('window');

export const Maps = () => {
  const carouselRef = useRef(null);
  const ASPECT_RATIO = width / height;
  const [region, setRegion] = useState();
  const [userRegion, setUserRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [rutas, setRutas] = useState();
  const [rutaSelect, setRutaSelect] = useState();
  const [destSelect, setDestSelect] = useState();
  useEffect(async () => {
    /* let usuario = await AsyncStorage.getItem('usuario');
    usuario = JSON.parse(usuario);

    this.setState({
      usuario,
    }); */
    //await navigator.geolocation.requestAuthorization();
    return await navigator.geolocation.getCurrentPosition(
      (position) => {
        /* setUserRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }); */
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00522,
          longitudeDelta: (width / height) * 0.00522,
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);
  const findRutas = async (lat, lng) => {
    setRutaSelect(null);
    let res = await fetch(
      //`http://192.168.0.109:3000/rutas/cercanas?latitude=${lat}&longitude=${lng}`,
      `https://combi-api.now.sh/rutas/cercanas?latitude=${lat}&longitude=${lng}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    res = await res.json();
    setRutas(res.body);
  };
  const onRegionChange = (region) => {
    setRegion(region);
  };
  const onPressRuta = (idRuta) => {
    let ruta = rutas.filter((ruta) => ruta.id == idRuta);
    setRutaSelect(ruta[0]);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView.Animated
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChange}
          followUserLocation={true}
          showsUserLocation={true}>
          {rutas && (
            <React.Fragment>
              <Marker
                coordinate={rutas[0].coordenadas[0]}
                title={'Adrogue Bus'}
              />
              <Polyline
                coordinates={rutas[0].coordenadas}
                strokeColor="#206cc6" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
              />
            </React.Fragment>
          )}
          {destSelect && <MapView.Marker.Animated coordinate={destSelect} />}
        </MapView.Animated>
      )}
      <Buscador
        region={region}
        setRegion={setRegion}
        setDestSelect={setDestSelect}
        findRutas={findRutas}
      />

      {rutas ? (
        <RoutesCarousel rutas={rutas} onPressRuta={onPressRuta} />
      ) : null}
      {rutaSelect && <Confirmacion height={height} ruta={rutaSelect} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

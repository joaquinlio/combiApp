import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from '../utils/carousel/carousel';
import {Avatar} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

export const RoutesCarousel = (props) => {
  const carouselRef = useRef(null);
  const renderItem = ({item, index}) => {
    const {logo, empresa, nombre} = item;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          props.onPressRuta(item.id);
        }}>
        <View style={styles.rutaContainer}>
          <Text style={styles.ruta}>{nombre}</Text>
        </View>

        <View style={styles.rutaContainer}>
          <Text style={styles.precio}>ARS $180</Text>
        </View>
        <View style={styles.rutaContainer}>
          <Text style={styles.empresa}>{empresa}</Text>
        </View>
        <View style={styles.rutaContainer}>
          <Text style={styles.textoTiempo}>Proxima Combi</Text>
          <Text style={styles.tiempo}> 10 min</Text>
        </View>
        {logo && (
          <Avatar
            rounded
            source={{
              uri: logo,
            }}
            size={70}
            containerStyle={styles.logo}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        style={styles.carousel}
        data={props.rutas}
        renderItem={renderItem}
        itemWidth={0.5 * width}
        inActiveOpacity={1}
        containerWidth={width - 20}
        separatorWidth={-15}
        ref={carouselRef}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  carouselContainer: {
    height: 100,
    margin: 10,
  },
  carousel: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  logo: {
    marginLeft: 125,
    marginTop: 5,
    position: 'absolute',
    shadowColor: '#000',
    elevation: 3,
  },
  ruta: {
    fontSize: 12,
    marginLeft: 10,
    position: 'absolute',
    color: '#a2a2a2',
    marginTop: 5,
  },
  empresa: {
    fontSize: 12,
    marginLeft: 130,
    position: 'absolute',
    marginTop: 80,
    color: '#a2a2a2',
  },
  precio: {
    fontSize: 20,
    marginLeft: 10,
    position: 'absolute',
    marginTop: 25,
    fontFamily: 'serif',
  },
  tiempo: {
    fontSize: 15,
    marginLeft: 3,
    position: 'absolute',
    marginTop: 78,
  },
  textoTiempo: {
    fontSize: 15,
    marginLeft: 8,
    position: 'absolute',
    color: '#a2a2a2',
    marginTop: 60,
  },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Picker,
} from 'react-native';
const {width, height} = Dimensions.get('window');
export const Confirmacion = (props) => {
  const {ruta} = props;
  return (
    <View style={styles.rutaSelectContainer}>
      <Text style={styles.ruta}>{ruta.nombre}</Text>
      <Text style={styles.precio}>ARS 180</Text>
      <Picker selectedValue="" style={styles.selectMethod}>
        <Picker.Item label="Metodo de pago" value="Seleccionar" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirmar viaje</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  rutaSelectContainer: {
    backgroundColor: '#FFFFFF',
    height: height / 4,
    borderTopColor: '#a2a2a2',
    borderTopWidth: 0.2,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#206cc6',
    height: 30,
    width: 250,
    marginTop: 120,
    position: 'absolute',
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ruta: {
    fontSize: 20,
    color: '#a2a2a2',
    position: 'absolute',
    marginTop: 10,
  },
  precio: {
    fontSize: 20,
    position: 'absolute',
    marginTop: 50,
  },
  selectMethod: {height: 50, width: 200, position: 'absolute', marginTop: 70},
});

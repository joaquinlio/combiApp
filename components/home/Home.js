import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from "react-native";

export default class Home extends Component {
  state = {};
  async componentDidMount() {
    let sesion = await AsyncStorage.getItem("sesion");
    sesion = JSON.parse(sesion);
    this.setState({
      sesion,
    });
  }
  cerrarSesion = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  maps = () => {
    this.props.navigation.navigate("Maps");
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>
          Hola {this.state.sesion ? this.state.sesion.name : null}
        </Text> */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={this.maps}>
            <Text style={styles.textBtn}>Buscar Viaje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.textBtn} onPress={this.cerrarSesion}>
              Cerrar sesion
            </Text>
          </TouchableOpacity>
        </View> */}
        {this.props.children}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "#fff",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
  },
  userBtn: {
    backgroundColor: "#fff",
    padding: 15,
    width: "45%",
  },
  textBtn: {
    fontSize: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});

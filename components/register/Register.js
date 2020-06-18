import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from "react-native";
export default class Register extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    nombre: "probando",
    apellido: "probando",
    email: "probando@gmail.com",
    password: "admin"
  };
  register = async () => {
    let res = await fetch("http://192.168.0.111:3001/usuarios/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    res = await res.json();
    if (!res.error) {
      //console.log();
      AsyncStorage.setItem("token", res.token);
      AsyncStorage.setItem(
        "usuario",
        JSON.stringify({
          nombre: res.nombre,
          apellido: res.apellido
        })
      );
      this.props.navigation.navigate("Home");
    } else {
      alert(res.error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1e98ff" barStyle="light-content" />
        <Text style={styles.welcome}>CombiApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={nombre => this.setState({ nombre })}
          value={this.state.nombre}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={apellido => this.setState({ apellido })}
          value={this.state.apellido}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={this.register}>
            <Text style={styles.textBtn}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.textBtn}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e98ff"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "#fff"
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10
  },
  userBtn: {
    backgroundColor: "#fff",
    padding: 15,
    width: "45%"
  },
  textBtn: {
    fontSize: 15,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  }
});

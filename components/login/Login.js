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
export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    email: "joaquinlio97@gmail.com",
    password: "1234",
  };

  login = async () => {
    let res = await fetch("http://186.19.36.123:3000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    res = await res.json();
    //console.log(res.body.sesion);
    if (!res.error) {
      await AsyncStorage.setItem("token", res.body.token);
      await AsyncStorage.setItem("sesion", JSON.stringify(res.body.sesion));
      this.props.navigation.navigate("Home");
    } else {
      alert(res.body);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1e98ff" barStyle="light-content" />
        <Text style={styles.welcome}>CombiApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={this.login}>
            <Text style={styles.textBtn}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.textBtn}>Registrarse</Text>
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
    backgroundColor: "#1e98ff",
  },
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

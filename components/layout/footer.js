import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Footer extends Component {
  state = {};

  render() {
    return (
      <View>
        {this.props.children}
        <View style={styles.container}>
          <Text style={styles.welcome}>ESTO ES EL FOOTER</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
  },
});

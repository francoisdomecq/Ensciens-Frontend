import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface CLassPropsType {
  textForm: string;
  modify: Function;
  security: boolean;
  height?: number;
}

//Input utilisé pour l'authentification
export default class InputContainer extends Component<CLassPropsType, {}> {
  render() {
    const { height = 60 } = this.props;
    return (
      <View style={styles.containerInput}>
        <TextInput
          secureTextEntry={this.props.security}
          style={stylesBis(height).input}
          placeholder={this.props.textForm}
          onChange={(event) => {
            this.props.modify(event.nativeEvent.text);
          }}
          placeholderTextColor={"rgba(0,0,0,0.5)"}
        ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerInput: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: { width: 50, height: 50, marginRight: 15 },
});

const stylesBis = (height: number | undefined) =>
  StyleSheet.create({
    input: {
      height: height,
      width: "90%",
      fontSize: 25,
      borderRadius: 20,
      justifyContent: "center",
      padding: "5%",
      backgroundColor: "#e2e2e2",
    },
  });

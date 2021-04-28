
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions, View, Image } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth / 4.75;

/**
 * Round Calculatorbutton
 * @param {function} onPress | function called onPress
 * @param {string} text | title of button
 * @param {string} type | "controller", "number" or "operator"
 * @param {bool} extraWidth | mainly used so "0" button can take double-the-space
 * @param {bool} isActive | used to display operator-buttons in active-mode
 */
export default function CalcButton({ onPress, text, type, extraWidth, isActive }) {

  //If this button is the plus/minus button use the plus_minus.png instead of '+/-' for better looking button.
  const child = text === "+/-" ?
    <Image source={require('../assets/plus_minus.png')} style={styles.image} /> :
    <Text style={[styles.text, { color: type == "control" ? "#000" : (isActive ? "#FF9500" : "#fff") }]}>{text}</Text>

  return (
    <View style={[styles.container, styles.viewContainer, styles[extraWidth + "Container"]]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPressOut={onPress}
        style={[styles.container, styles[type + "Button"], styles[extraWidth], isActive ? styles["activeOperatorButton"] : {}]}>
        {child}
      </TouchableOpacity>
    </View>
  );
};

const margin = 3;
const styles = StyleSheet.create({
  viewContainer: { backgroundColor: "#fff" },
  container: {
    width: buttonWidth,
    height: buttonWidth,
    justifyContent: 'center',
    alignItems: 'center',
    margin: margin,
    borderRadius: buttonWidth,
  },
  extraWidthContainer: {
    width: buttonWidth * 2 + 5 * margin,
  },
  extraWidth: {
    width: buttonWidth * 2 + 5 * margin,
    alignItems: "flex-start",
    paddingLeft: buttonWidth / 2 - 10,
  },
  activeOperatorButton: {
    backgroundColor: "#fff",
  },
  numberButton: {
    backgroundColor: '#505050',
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  controlButton: {
    backgroundColor: '#D4D4D2',
  },
  text: { fontSize: 35 },
  image: { marginTop: 5, width: 30, height: 30 },
});
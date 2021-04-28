import React, { useState} from 'react';
import { View } from 'react-native';
import { CalcButton, AdjustLabel, Row, PanDetector } from '../components'
import Calculator from '../controller/Calculator'
let calculator = new Calculator();

export default function CalculatorScreen({ }) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isHiglight, setIsHighlight] = useState(false) //Bool for whether or not operator buttons should be higlighted
  const [operator, setOperator] = useState('')//Only used to force new rendering when pressing operators (to change color of button)

  //For backspace (i.e. user can swipe on the displayd (written) digits to remove the last one they typed)
  onPanDetection = () => {
    calculator.handleBackSpace()
    setDisplayValue(calculator.displayValue())
  }

  /**
   * Handles button presses.
   * @param {string} type | one of "control", "operator" and "number"
   * @param {string/number} value | Value of button pressed
   * @param {string} operator | the operator pressed; "+", "-", "+", "x", "+/-" or "%". Undefined if button pressed is not operator-btn
   */
  const onPress = (type, value, operator) => {

    let shouldHighlight = false
    switch (type) {
      case "number": calculator.addNumber(value)
        break

      case "operator":
        if (value === '=') { calculator.handleEquals() }
        else {
          calculator.addBinaryOperator(operator)
          shouldHighlight = true
        }
        break

      case "control":
        if (value === "C") calculator.handleClear()
        else calculator.handleUnaryOperator(operator)
        shouldHighlight = true
        break
    }
    setIsHighlight(shouldHighlight)
    setOperator(calculator.currentOperator)
    setDisplayValue(calculator.displayValue())
  }

  const data = [
    { "text": calculator.isAllClear ? "AC" : "C", "onPress": () => onPress("control", "C"), "type": "control" },
    { "text": "+/-", "onPress": () => onPress("control", "+/-", calculator.operationsEnum.plusMinus), "type": "control" },
    { "text": "%", "onPress": () => onPress("control", "%", calculator.operationsEnum.percentage), "type": "control" },
    {
      "text": "÷", "onPress": () => onPress("operator", "÷", calculator.operationsEnum.division),
      "type": "operator", "isActive": (calculator.currentOperator == '÷' && isHiglight)
    },

    { "text": "7", "onPress": () => onPress("number", 7), "type": "number" },
    { "text": "8", "onPress": () => onPress("number", 8), "type": "number" },
    { "text": "9", "onPress": () => onPress("number", 9), "type": "number" },
    {
      "text": "x", "onPress": () => onPress("operator", "x", calculator.operationsEnum.multiplication),
      "type": "operator", "isActive": (calculator.currentOperator == 'x' && isHiglight)
    },

    { "text": "4", "onPress": () => onPress("number", 4), "type": "number" },
    { "text": "5", "onPress": () => onPress("number", 5), "type": "number" },
    { "text": "6", "onPress": () => onPress("number", 6), "type": "number" },
    {
      "text": "-", "onPress": () => onPress("operator", "'", calculator.operationsEnum.subtraction),
      "type": "operator", "isActive": (calculator.currentOperator == '-' && isHiglight)
    },

    { "text": "1", "onPress": () => onPress("number", 1), "type": "number" },
    { "text": "2", "onPress": () => onPress("number", 2), "type": "number" },
    { "text": "3", "onPress": () => onPress("number", 3), "type": "number" },
    {
      "text": "+", "onPress": () => onPress("operator", "+", calculator.operationsEnum.addition),
      "type": "operator", "isActive": (calculator.currentOperator == '+' && isHiglight)
    },

    { "text": "0", "onPress": () => onPress("number", 0), "type": "number" },
    { "text": ",", "onPress": () => onPress("number", "."), "type": "number" },
    { "text": "=", "onPress": () => onPress("operator", "="), "type": "operator" },
  ]
  const listItems = data.map((d) => <CalcButton key={d.text} onPress={d.onPress} text={d.text}
    type={d.type} isActive={d.isActive} extraWidth={d.text === "0" ? "extraWidth" : ""} />);

  return (

    <View >
      <PanDetector onPan={onPanDetection}>
        <AdjustLabel text={displayValue} fontSize={115} numberOfLines={1} />
      </PanDetector>

      <View style={{ flexDirection: "column" }}>
        <Row>{listItems.slice(0, 4)}</Row>
        <Row>{listItems.slice(4, 8)}</Row>
        <Row>{listItems.slice(8, 12)}</Row>
        <Row>{listItems.slice(12, 16)}</Row>
        <Row>{listItems.slice(16, 19)}</Row>
      </View>

    </View>
  )
}
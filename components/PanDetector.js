import React, { useEffect } from 'react';
import { PanResponder, View } from 'react-native';
let panResponder;
/**
 * Pan detector. Detects pan-gestures on children and calls the given "onPan"-function.
 */
export default PanDetector = ({ children, onPan }) => {

  useEffect(() => {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => { },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          onPan()
        }
      },
    })
  }, [onPan])

  //If panResponder has not been set.
  const handlers = panResponder ? panResponder.panHandlers : []

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 15 }} {...handlers}>
      {children}
    </View>
  );
};
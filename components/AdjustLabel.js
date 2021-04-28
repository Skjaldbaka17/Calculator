import React, { useState } from 'react';
import { Text } from 'react-native';

/**
 * Textview that adjusts its font-size according to given props. (most important: numberOfLines)
 */
export default AdjustLabel = ({
  fontSize, text, style, numberOfLines
}) => {
  const [currentFont, setCurrentFont] = useState(fontSize);

  return (
    <Text
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit
      style={[style, { fontSize: currentFont, color: "#fff", fontFamily: 'System', fontWeight: "200" }]}
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
        }
      }}
    >
      { text}
    </Text>
  );
};
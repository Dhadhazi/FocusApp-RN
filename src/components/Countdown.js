import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

function minutesToMillis(min) {
  return min * 1000 * 60;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

export default function Countdown({ minutes = 20, isPaused }) {
  function countDown() {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  }

  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const interval = useRef(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  });
  return (
    <View>
      <Text style={styles.text}>
        {" "}
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    padding: spacing.lg,
    backgroundColor: "rgba(94,132,226,0.3)",
  },
});

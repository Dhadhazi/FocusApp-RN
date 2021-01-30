import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

function minutesToMillis(min) {
  return min * 1000 * 60;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

export default function Countdown({
  minutes = 20,
  isPaused = true,
  onEnd,
  onProgress,
}) {
  function countDown() {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  }

  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const interval = useRef(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={styles.textBox}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    padding: spacing.lg,
    backgroundColor: "rgba(94,132,226,0.3)",
  },
});

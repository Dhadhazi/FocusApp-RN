import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import Countdown from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import Timing from "./Timing";

export const Timer = ({ focusSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(0.1);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.focusSubject}>{focusSubject}</Text>
      </View>
      <View style={styles.countdown}>
        <Countdown isPaused={!isStarted} minutes={minutes} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing changeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? "Pause" : "Start"}
          onpress={() => {
            setIsStarted(!isStarted);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  focusSubject: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  countdown: {
    flex: 0.5,
    alignItems: "stretch",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
});

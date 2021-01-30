import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import Countdown from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";
import Timing from "./Timing";
import { STATUS, DEFAULT_TIME } from "../../../Const";

export const Timer = ({ focusSubject, focusFinished }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  function vibrate() {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate("5s");
    }
  }

  function onEnd() {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setIsStarted(false);
    focusFinished(STATUS.COMPLETE);
  }

  function changeTime(time) {
    setMinutes(time);
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.focusSubject}>{focusSubject}</Text>
      </View>

      <View style={styles.countdown}>
        <Countdown isPaused={!isStarted} minutes={minutes} onEnd={onEnd} />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing changeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? "Pause" : "Start"}
          onpress={() => {
            setIsStarted(!isStarted);
          }}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title={"Cancel"}
          size={50}
          onpress={() => focusFinished(STATUS.CANCELLED)}
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
  clearSubject: {
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
  },
});

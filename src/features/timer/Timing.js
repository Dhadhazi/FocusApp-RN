import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";

export default function Timing({ changeTime }) {
  const TIMES = [10, 15, 20];
  const timeButtons = TIMES.map((time) => (
    <View style={styles.timingButton} key={time}>
      <RoundedButton size={75} title={time} onpress={() => changeTime(time)} />
    </View>
  ));
  return timeButtons;
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center",
  },
});

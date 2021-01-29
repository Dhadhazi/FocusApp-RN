import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";

export const Timer = ({ focusSubject }) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.focusSubject}>{focusSubject}</Text>
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
});

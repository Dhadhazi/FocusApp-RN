import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { STATUS } from "../../../Const";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";

export default function FocusHistory({ focusHistory, clearHistory }) {
  function HistoryItem({ item, index }) {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}>Things we focused on</Text>

          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1 }}
            data={focusHistory}
            renderItem={HistoryItem}
            keyExtractor={(item) => item.subject}
          />
          <View style={styles.clearHistory}>
            <RoundedButton
              size={75}
              title="Clear"
              onpress={() => clearHistory()}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status === STATUS.CANCELLED ? "red" : "green",
    fontSize: fontSizes.md,
  }),
  title: {
    color: "white",
    fontSize: fontSizes.lg,
  },
  clearHistory: {
    alignItems: "center",
    padding: spacing.md,
  },
});

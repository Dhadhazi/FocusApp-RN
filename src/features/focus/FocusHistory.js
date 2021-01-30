import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { STATUS } from "../../../Const";
import { fontSizes } from "../../utils/sizes";

export default function FocusHistory({ focusHistory, clearHistory }) {
  function HistoryItem({ item, index }) {
    return (
      <Text style={styles.historyItem(item.status)} key={index}>
        {item.subject}
      </Text>
    );
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
          />
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
});

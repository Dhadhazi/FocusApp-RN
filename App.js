import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Platform } from "react-native";
import { Focus } from "./src/features/focus/Focus";
import FocusHistory from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  function addFocusHistorySubjectWithState(subject, status) {
    setFocusHistory([...focusHistory, { subject, status }]);
  }

  function focusFinished(status) {
    addFocusHistorySubjectWithState(focusSubject, status);

    setFocusSubject(null);
  }

  function clearHistory() {}

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {focusSubject ? (
          <Timer focusSubject={focusSubject} focusFinished={focusFinished} />
        ) : (
          <>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory
              focusHistory={focusHistory}
              clearHistory={clearHistory}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
  safeArea: {
    flex: 2,
    backgroundColor: colors.darkBlue,
  },
});

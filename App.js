import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  function clearHistory() {
    setFocusHistory([]);
  }

  async function saveFocusHistory() {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  }

  async function loadFocusHistory() {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

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

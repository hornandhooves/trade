import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { modules } from './src/modules';
import { colors, spacing } from './src/ui/theme';

export default function App() {
  const [activeId, setActiveId] = useState(modules[0].id);
  const active = modules.find((m) => m.id === activeId) ?? modules[0];
  const Screen = active.Screen;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Screen key={active.id} />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.tabBar}>
        {modules.map((m) => (
          <Pressable key={m.id} style={styles.tab} onPress={() => setActiveId(m.id)}>
            <Text style={styles.tabIcon}>{m.icon}</Text>
            <Text style={[styles.tabLabel, m.id === active.id && { color: colors.accent }]}>{m.title}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: 40 },
  tabBar: {
    flexDirection: 'row',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    backgroundColor: colors.card,
    paddingBottom: spacing.sm,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  tabIcon: { fontSize: 20 },
  tabLabel: { color: colors.muted, fontSize: 12, marginTop: 2 },
});

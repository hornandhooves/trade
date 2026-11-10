import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, spacing } from './theme';

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function Title({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Field({
  label,
  value,
  onChangeText,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
        />
        {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
      </View>
    </View>
  );
}

export function Result({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'good' | 'bad' | 'warn';
}) {
  const color =
    tone === 'good' ? colors.good : tone === 'bad' ? colors.bad : tone === 'warn' ? colors.warn : colors.text;
  return (
    <View style={styles.resultRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.resultValue, { color }]}>{value}</Text>
    </View>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return <Text style={styles.notice}>{children}</Text>;
}

/** Collapsible educational section shown next to a calculator. */
export function Lesson({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Pressable onPress={() => setOpen(!open)} style={styles.lessonHeader}>
        <Text style={styles.lessonTitle}>📘 {title}</Text>
        <Text style={styles.muted}>{open ? '−' : '+'}</Text>
      </Pressable>
      {open ? <View style={{ marginTop: spacing.md, gap: spacing.sm }}>{children}</View> : null}
    </Card>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  field: { gap: spacing.xs },
  label: { color: colors.muted, fontSize: 13 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
  },
  input: { flex: 1, color: colors.text, fontSize: 17, paddingVertical: 10 },
  suffix: { color: colors.muted, marginLeft: spacing.sm },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultValue: { fontSize: 17, fontWeight: '600' },
  notice: { color: colors.warn, fontSize: 13 },
  lessonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lessonTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  muted: { color: colors.muted, fontSize: 18 },
  paragraph: { color: colors.text, fontSize: 14, lineHeight: 21 },
});

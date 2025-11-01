import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { getDatabase } from '../src/db';
import { colors } from '../src/theme/colors';

type HomeCounts = {
  plannerBlocks: number;
  faithEntries: number;
};

export default function HomeScreen() {
  const [counts, setCounts] = useState<HomeCounts>({
    plannerBlocks: 0,
    faithEntries: 0,
  });
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const db = getDatabase();

      const plannerResult = db.getFirstSync<{ count: number }>(
        'SELECT COUNT(*) AS count FROM planner_blocks'
      );
      const faithResult = db.getFirstSync<{ count: number }>(
        'SELECT COUNT(*) AS count FROM faith_entries'
      );

      setCounts({
        plannerBlocks: plannerResult?.count ?? 0,
        faithEntries: faithResult?.count ?? 0,
      });
    } catch (error) {
      console.error('Failed to initialize database', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Unknown initialization error'
      );
    } finally {
      setIsReady(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MySilentPlan</Text>
        <Text style={styles.subtitle}>Daily Snapshot</Text>
      </View>

      {isReady ? (
        <View style={styles.content}>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.cardLabel}>Planner Blocks</Text>
                <Text style={styles.cardValue}>{counts.plannerBlocks}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardLabel}>Faith Entries</Text>
                <Text style={styles.cardValue}>{counts.faithEntries}</Text>
              </View>
            </>
          )}
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    paddingBottom: 24,
  },
  title: {
    color: colors.backgroundLight,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.accent,
    fontSize: 16,
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardValue: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
    marginTop: 12,
  },
  loadingText: {
    color: colors.backgroundLight,
    fontSize: 16,
  },
  errorText: {
    color: colors.backgroundLight,
    fontSize: 14,
  },
});


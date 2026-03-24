import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const QUESTION = {
  type: 'ab-battle' as const,
  date: '24 martie 2026',
  text: 'Ar trebui să existe o limită minimă de viteză pe autostradă sau nu?',
  totalVotes: 1102,
  sideA: { label: 'Da', votes: 641 },
  sideB: { label: 'Nu', votes: 461 },
};

export default function TodayScreen() {
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleVote = (side: 'A' | 'B') => {
    if (hasVoted) return;
    setSelectedSide(side);
    setHasVoted(true);
  };

  const totalVotes = hasVoted ? QUESTION.totalVotes + 1 : QUESTION.totalVotes;
  const votesA = selectedSide === 'A' ? QUESTION.sideA.votes + 1 : QUESTION.sideA.votes;
  const votesB = selectedSide === 'B' ? QUESTION.sideB.votes + 1 : QUESTION.sideB.votes;
  const pctA = Math.round((votesA / totalVotes) * 100);
  const pctB = 100 - pctA;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.dateLabel}>{QUESTION.date}</Text>
          <Text style={styles.headerTitle}>Întrebarea zilei</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.question}>{QUESTION.text}</Text>

          {/* A/B Battle sides */}
          <View style={styles.abRow}>
            {/* Side A */}
            <TouchableOpacity
              style={[
                styles.abSide,
                styles.abSideA,
                selectedSide === 'A' && styles.abSideASelected,
              ]}
              onPress={() => handleVote('A')}
              activeOpacity={hasVoted ? 1 : 0.75}
            >
              <Text style={styles.abSideLabel}>SIDE A</Text>
              {hasVoted && (
                <Text style={[styles.abPct, styles.abPctA]}>{pctA}%</Text>
              )}
              <View style={[styles.abPill, styles.abPillA, selectedSide === 'A' && styles.abPillASelected]}>
                <Text style={[styles.abPillText, styles.abPillTextA]}>{QUESTION.sideA.label}</Text>
              </View>
            </TouchableOpacity>

            {/* VS divider */}
            <View style={styles.vsDivider}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            {/* Side B */}
            <TouchableOpacity
              style={[
                styles.abSide,
                styles.abSideB,
                selectedSide === 'B' && styles.abSideBSelected,
              ]}
              onPress={() => handleVote('B')}
              activeOpacity={hasVoted ? 1 : 0.75}
            >
              <Text style={styles.abSideLabel}>SIDE B</Text>
              {hasVoted && (
                <Text style={[styles.abPct, styles.abPctB]}>{pctB}%</Text>
              )}
              <View style={[styles.abPill, styles.abPillB, selectedSide === 'B' && styles.abPillBSelected]}>
                <Text style={[styles.abPillText, styles.abPillTextB]}>{QUESTION.sideB.label}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Split progress bar */}
          <View style={styles.splitBar}>
            <View style={[styles.splitBarA, { flex: hasVoted ? pctA : 50 }]} />
            <View style={[styles.splitBarB, { flex: hasVoted ? pctB : 50 }]} />
          </View>

          <Text style={styles.voteCount}>{totalVotes.toLocaleString('ro-RO')} voturi</Text>
        </View>

        {/* Rating card */}
        <View style={styles.card}>
          <Text style={styles.ratingLabel}>Cum ți s-a părut întrebarea?</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.star, star <= rating && styles.starActive]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && <Text style={styles.ratingThanks}>Mulțumim pentru feedback!</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TEAL = '#4DB6AC';
const TEAL_LIGHT = '#E8F5F3';
const TEAL_MID = '#B2DFDB';
const CORAL = '#E57373';
const CORAL_LIGHT = '#FDECEA';
const CORAL_MID = '#FFCDD2';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scroll: { padding: 16, gap: 12 },
  header: { paddingVertical: 8 },
  dateLabel: {
    fontSize: 13,
    color: '#9E9E9E',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#212121', marginTop: 2 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    lineHeight: 26,
    marginBottom: 20,
  },

  // A/B Battle layout
  abRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0,
    marginBottom: 14,
  },
  abSide: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  abSideA: {
    backgroundColor: TEAL_LIGHT,
    borderColor: TEAL_LIGHT,
    marginRight: 8,
  },
  abSideASelected: {
    borderColor: TEAL,
    backgroundColor: '#D4EFEC',
  },
  abSideB: {
    backgroundColor: CORAL_LIGHT,
    borderColor: CORAL_LIGHT,
    marginLeft: 8,
  },
  abSideBSelected: {
    borderColor: CORAL,
    backgroundColor: '#FADADD',
  },
  abSideLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#9E9E9E',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  abPct: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 40,
  },
  abPctA: { color: TEAL },
  abPctB: { color: CORAL },
  abPill: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  abPillA: { backgroundColor: '#C8E6E3' },
  abPillASelected: { backgroundColor: TEAL_MID },
  abPillB: { backgroundColor: '#F9C8C8' },
  abPillBSelected: { backgroundColor: CORAL_MID },
  abPillText: { fontSize: 14, fontWeight: '600' },
  abPillTextA: { color: '#2E7D74' },
  abPillTextB: { color: '#B94040' },

  // VS divider
  vsDivider: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#BDBDBD',
    letterSpacing: 1,
  },

  // Split progress bar
  splitBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  splitBarA: { backgroundColor: TEAL },
  splitBarB: { backgroundColor: CORAL },

  voteCount: { fontSize: 13, color: '#BDBDBD', textAlign: 'center' },

  // Rating
  ratingLabel: { fontSize: 15, fontWeight: '600', color: '#424242', marginBottom: 12 },
  stars: { flexDirection: 'row', gap: 8 },
  star: { fontSize: 32, color: '#E0E0E0' },
  starActive: { color: '#FFC107' },
  ratingThanks: { marginTop: 8, fontSize: 13, color: '#9E9E9E' },
});

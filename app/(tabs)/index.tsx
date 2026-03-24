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
  date: '24 martie 2026',
  text: 'Cum te descurci cu echilibrul dintre viața profesională și cea personală?',
  totalVotes: 1247,
  options: [
    { id: 1, label: 'Foarte bine', votes: 312 },
    { id: 2, label: 'Destul de bine', votes: 489 },
    { id: 3, label: 'Cu dificultate', votes: 298 },
    { id: 4, label: 'Deloc bine', votes: 148 },
  ],
};

export default function AziScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [rating, setRating] = useState(0);

  const handleVote = (optionId: number) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    setHasVoted(true);
  };

  const totalVotes = hasVoted ? QUESTION.totalVotes + 1 : QUESTION.totalVotes;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.dateLabel}>{QUESTION.date}</Text>
          <Text style={styles.headerTitle}>Întrebarea zilei</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.question}>{QUESTION.text}</Text>

          <View style={styles.options}>
            {QUESTION.options.map((option) => {
              const votes = option.id === selectedOption ? option.votes + 1 : option.votes;
              const pct = Math.round((votes / totalVotes) * 100);
              const isSelected = selectedOption === option.id;

              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                  ]}
                  onPress={() => handleVote(option.id)}
                  activeOpacity={hasVoted ? 1 : 0.7}
                >
                  {hasVoted && (
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${pct}%` as any },
                        isSelected && styles.progressSelected,
                      ]}
                    />
                  )}
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {option.label}
                    </Text>
                    {hasVoted && (
                      <Text style={[styles.optionPct, isSelected && styles.optionLabelSelected]}>
                        {pct}%
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.voteCount}>{totalVotes.toLocaleString('ro-RO')} voturi</Text>
        </View>

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
    fontWeight: '600',
    color: '#212121',
    lineHeight: 26,
    marginBottom: 20,
  },
  options: { gap: 10 },
  option: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 50,
    justifyContent: 'center',
  },
  optionSelected: { borderColor: '#1a73e8' },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#EEF3FD',
    borderRadius: 10,
  },
  progressSelected: { backgroundColor: '#D2E3FC' },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    zIndex: 1,
  },
  optionLabel: { fontSize: 15, color: '#424242', fontWeight: '500' },
  optionLabelSelected: { color: '#1a73e8', fontWeight: '600' },
  optionPct: { fontSize: 14, color: '#757575', fontWeight: '600' },
  voteCount: { marginTop: 12, fontSize: 13, color: '#BDBDBD', textAlign: 'center' },
  ratingLabel: { fontSize: 15, fontWeight: '600', color: '#424242', marginBottom: 12 },
  stars: { flexDirection: 'row', gap: 8 },
  star: { fontSize: 32, color: '#E0E0E0' },
  starActive: { color: '#FFC107' },
  ratingThanks: { marginTop: 8, fontSize: 13, color: '#9E9E9E' },
});

import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const HISTORY = [
  {
    id: 1,
    date: '23 martie 2026',
    question: 'Ce ai face cu 1 milion de euro?',
    userAnswer: 'Aș investi în imobiliare',
    totalVotes: 2103,
  },
  {
    id: 2,
    date: '22 martie 2026',
    question: 'Care este cel mai mare regret al tău din 2025?',
    userAnswer: 'Nu am călătorit suficient',
    totalVotes: 1876,
  },
  {
    id: 3,
    date: '21 martie 2026',
    question: 'Cum te relaxezi după o zi grea?',
    userAnswer: 'Mă uit la seriale',
    totalVotes: 1654,
  },
  {
    id: 4,
    date: '20 martie 2026',
    question: 'Ce preferi: mare sau munte?',
    userAnswer: 'Munte',
    totalVotes: 3201,
  },
];

export default function IstoricScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Istoricul tău</Text>
          <Text style={styles.headerSub}>{HISTORY.length} întrebări la care ai răspuns</Text>
        </View>

        {HISTORY.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.question}>{item.question}</Text>
            <View style={styles.answerRow}>
              <View style={styles.answerBadge}>
                <Text style={styles.answerBadgeText}>Răspunsul tău</Text>
              </View>
              <Text style={styles.answer}>{item.userAnswer}</Text>
            </View>
            <Text style={styles.votes}>{item.totalVotes.toLocaleString('ro-RO')} voturi totale</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scroll: { padding: 16, gap: 12 },
  header: { paddingVertical: 8 },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#212121' },
  headerSub: { fontSize: 14, color: '#9E9E9E', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 12,
    color: '#BDBDBD',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    lineHeight: 22,
    marginBottom: 12,
  },
  answerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  answerBadge: {
    backgroundColor: '#EEF3FD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  answerBadgeText: { fontSize: 11, fontWeight: '600', color: '#1a73e8' },
  answer: { fontSize: 14, color: '#424242', flex: 1 },
  votes: { fontSize: 12, color: '#BDBDBD' },
});

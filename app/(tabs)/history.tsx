import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const TEAL = '#4DB6AC';
const TEAL_LIGHT = '#E8F5F3';
const CORAL = '#E57373';
const CORAL_LIGHT = '#FDECEA';

type DebateResult = {
  id: number;
  date: string;
  question: string;
  winner: 'A' | 'B' | null;
  userVote: 'A' | 'B' | null;
  sideA: { label: string; pct: number };
  sideB: { label: string; pct: number };
  totalVotes: number;
  comments: number;
};

const PAST_DEBATES: DebateResult[] = [
  {
    id: 1,
    date: '17 mar 2026',
    question: 'Rezolvăm foamea mondială sau găsim leacul pentru cancer?',
    winner: 'A',
    userVote: 'A',
    sideA: { label: 'foamete', pct: 52 },
    sideB: { label: 'cancer', pct: 48 },
    totalVotes: 86,
    comments: 20,
  },
  {
    id: 2,
    date: '16 mar 2026',
    question: 'Ar trebui să abolim partidele politice și să punem oameni care au studiat (sau lucrat în) acele domenii în funcții?',
    winner: 'A',
    userVote: 'A',
    sideA: { label: 'da', pct: 64 },
    sideB: { label: 'nu', pct: 36 },
    totalVotes: 58,
    comments: 14,
  },
  {
    id: 3,
    date: '13 mar 2026',
    question: 'Ar trebui să existe o limită minimă de viteză pe autostrăzi?',
    winner: 'A',
    userVote: 'B',
    sideA: { label: 'Da', pct: 74 },
    sideB: { label: 'Nu', pct: 26 },
    totalVotes: 70,
    comments: 20,
  },
  {
    id: 4,
    date: '11 mar 2026',
    question: 'Îl susții pe Donald Trump?',
    winner: 'B',
    userVote: 'B',
    sideA: { label: 'Da', pct: 23 },
    sideB: { label: 'Nu', pct: 77 },
    totalVotes: 112,
    comments: 31,
  },
  {
    id: 5,
    date: '9 mar 2026',
    question: 'A fost 11 septembrie un atac coordonat din interior?',
    winner: 'B',
    userVote: null,
    sideA: { label: 'Absolut da!', pct: 43 },
    sideB: { label: 'Cu siguranță nu!', pct: 57 },
    totalVotes: 76,
    comments: 11,
  },
  {
    id: 6,
    date: '7 mar 2026',
    question: 'Trăiești viața pe care ai ales-o... sau pe cea la care ai renunțat în tăcere?',
    winner: 'A',
    userVote: 'A',
    sideA: { label: 'Cea aleasă', pct: 60 },
    sideB: { label: 'Cea la care am renunțat', pct: 40 },
    totalVotes: 94,
    comments: 25,
  },
];

function WinnerBadge({ winner }: { winner: 'A' | 'B' }) {
  const isA = winner === 'A';
  return (
    <View style={[styles.badge, isA ? styles.badgeA : styles.badgeB]}>
      <Text style={styles.badgeIcon}>🏆</Text>
      <Text style={[styles.badgeText, isA ? styles.badgeTextA : styles.badgeTextB]}>
        Câștigă {isA ? 'Partea A' : 'Partea B'}
      </Text>
    </View>
  );
}

function VoteBadge({ vote }: { vote: 'A' | 'B' }) {
  const isA = vote === 'A';
  return (
    <View style={[styles.badge, isA ? styles.voteBadgeA : styles.voteBadgeB]}>
      <Text style={styles.badgeIcon}>✅</Text>
      <Text style={[styles.badgeText, isA ? styles.badgeTextA : styles.badgeTextB]}>
        Ai votat: {isA ? 'Partea A' : 'Partea B'}
      </Text>
    </View>
  );
}

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Arhivă</Text>
          <Text style={styles.headerSub}>Dezbateri trecute și rezultate</Text>
        </View>

        <Text style={styles.countLabel}>{PAST_DEBATES.length} DEZBATERI</Text>

        {PAST_DEBATES.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Badges row */}
            <View style={styles.badgeRow}>
              {item.winner && <WinnerBadge winner={item.winner} />}
              {item.userVote && <VoteBadge vote={item.userVote} />}
              <Text style={styles.arrow}>›</Text>
            </View>

            {/* Question */}
            <Text style={styles.question}>{item.question}</Text>

            {/* Percentages */}
            <View style={styles.pctRow}>
              <View>
                <Text style={styles.pctA}>{item.sideA.pct}%</Text>
                <Text style={styles.sideName}>Partea A</Text>
                <View style={styles.pillA}>
                  <Text style={styles.pillTextA}>{item.sideA.label}</Text>
                </View>
              </View>
              <View style={styles.pctRight}>
                <Text style={styles.pctB}>{item.sideB.pct}%</Text>
                <Text style={[styles.sideName, { textAlign: 'right' }]}>Partea B</Text>
                <View style={[styles.pillB, { alignSelf: 'flex-end' }]}>
                  <Text style={styles.pillTextB}>{item.sideB.label}</Text>
                </View>
              </View>
            </View>

            {/* Split bar */}
            <View style={styles.splitBar}>
              <View style={[styles.splitBarA, { flex: item.sideA.pct }]} />
              <View style={[styles.splitBarB, { flex: item.sideB.pct }]} />
            </View>

            {/* Meta */}
            <View style={styles.meta}>
              <Text style={styles.metaText}>📅 {item.date}</Text>
              <Text style={styles.metaDot}>|</Text>
              <Text style={styles.metaText}>👥 {item.totalVotes} voturi</Text>
              <Text style={styles.metaDot}>|</Text>
              <Text style={styles.metaText}>💬 {item.comments}</Text>
            </View>
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
  countLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9E9E9E',
    letterSpacing: 1,
    marginBottom: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    gap: 10,
  },

  // Badges
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  badgeA: { backgroundColor: TEAL_LIGHT },
  badgeB: { backgroundColor: CORAL_LIGHT },
  voteBadgeA: { backgroundColor: TEAL_LIGHT },
  voteBadgeB: { backgroundColor: CORAL_LIGHT },
  badgeIcon: { fontSize: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgeTextA: { color: '#2E7D74' },
  badgeTextB: { color: '#B94040' },
  arrow: { marginLeft: 'auto' as any, fontSize: 20, color: '#BDBDBD', fontWeight: '300' },

  // Question
  question: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212121',
    lineHeight: 22,
  },

  // Percentages
  pctRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pctRight: { alignItems: 'flex-end' },
  pctA: { fontSize: 28, fontWeight: '800', color: TEAL, lineHeight: 32 },
  pctB: { fontSize: 28, fontWeight: '800', color: CORAL, lineHeight: 32 },
  sideName: { fontSize: 12, color: TEAL, fontWeight: '500', marginBottom: 4 },
  pillA: {
    backgroundColor: '#C8E6E3',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  pillB: {
    backgroundColor: '#F9C8C8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillTextA: { fontSize: 13, fontWeight: '600', color: '#2E7D74' },
  pillTextB: { fontSize: 13, fontWeight: '600', color: '#B94040' },

  // Split bar
  splitBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  splitBarA: { backgroundColor: TEAL },
  splitBarB: { backgroundColor: CORAL },

  // Meta row
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  metaText: { fontSize: 12, color: '#757575' },
  metaDot: { fontSize: 12, color: '#BDBDBD' },
});

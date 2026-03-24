import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Comment = {
  id: number;
  author: string;
  text: string;
  timeAgo: string;
  likes: number;
  likedByMe: boolean;
};

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    author: 'Maria D.',
    text: 'Eu am zis "Destul de bine" dar sincer e mai mult "cu dificultate" 😅',
    timeAgo: '2h',
    likes: 14,
    likedByMe: false,
  },
  {
    id: 2,
    author: 'Alex P.',
    text: 'Aceeași situație, mai ales de când lucrez de acasă. Nicio limită clară.',
    timeAgo: '2h',
    likes: 9,
    likedByMe: false,
  },
  {
    id: 3,
    author: 'Ioana M.',
    text: 'Îmi închid laptopul la 18:00 fix, altfel nu mai opresc 🙈',
    timeAgo: '1h',
    likes: 22,
    likedByMe: true,
  },
  {
    id: 4,
    author: 'Bogdan R.',
    text: 'Ar trebui o lege pentru asta în România, ca în Franța.',
    timeAgo: '45min',
    likes: 7,
    likedByMe: false,
  },
  {
    id: 5,
    author: 'Cristina V.',
    text: 'Weekendurile sunt sacre la mine. Telefon pe silent, nicio urgență.',
    timeAgo: '30min',
    likes: 31,
    likedByMe: false,
  },
];

export default function CommentsScreen() {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [input, setInput] = useState('');

  const toggleLike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, likedByMe: !c.likedByMe, likes: c.likedByMe ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  };

  const submitComment = () => {
    const text = input.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: 'Tu',
        text,
        timeAgo: 'acum',
        likes: 0,
        likedByMe: false,
      },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comentarii</Text>
        <Text style={styles.headerSub}>{comments.length} comentarii la întrebarea de azi</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.author}>{comment.author}</Text>
                <Text style={styles.timeAgo}>{comment.timeAgo}</Text>
              </View>
              <Text style={styles.text}>{comment.text}</Text>
              <TouchableOpacity
                style={styles.likeRow}
                onPress={() => toggleLike(comment.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.likeIcon, comment.likedByMe && styles.likeIconActive]}>♥</Text>
                <Text style={[styles.likeCount, comment.likedByMe && styles.likeCountActive]}>
                  {comment.likes}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Adaugă un comentariu..."
            placeholderTextColor="#9E9E9E"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={submitComment}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            style={[styles.submitBtn, !input.trim() && styles.submitBtnDisabled]}
            onPress={submitComment}
            disabled={!input.trim()}
          >
            <Text style={styles.submitBtnText}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  flex: { flex: 1 },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#212121' },
  headerSub: { fontSize: 13, color: '#9E9E9E', marginTop: 2 },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  author: { fontSize: 13, fontWeight: '700', color: '#424242' },
  timeAgo: { fontSize: 12, color: '#BDBDBD' },
  text: { fontSize: 15, color: '#212121', lineHeight: 22 },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  likeIcon: { fontSize: 16, color: '#BDBDBD' },
  likeIconActive: { color: '#E53935' },
  likeCount: { fontSize: 13, color: '#BDBDBD', fontWeight: '600' },
  likeCountActive: { color: '#E53935' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    gap: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#212121',
    maxHeight: 100,
  },
  submitBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#BDBDBD' },
  submitBtnText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});

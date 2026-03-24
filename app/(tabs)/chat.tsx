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

const INITIAL_MESSAGES = [
  {
    id: 1,
    author: 'Maria D.',
    text: 'Eu am zis "Destul de bine" dar sincer e mai mult "cu dificultate" 😅',
    time: '09:14',
    isOwn: false,
  },
  {
    id: 2,
    author: 'Alex P.',
    text: 'Aceeași situație, mai ales de când lucrez de acasă',
    time: '09:17',
    isOwn: false,
  },
  {
    id: 3,
    author: 'Tu',
    text: 'Work from home a schimbat totul. Nicio limită clară între serviciu și viața personală.',
    time: '09:20',
    isOwn: true,
  },
  {
    id: 4,
    author: 'Ioana M.',
    text: 'Exact! Îmi închid laptopul la 18:00 fix, altfel nu mai opresc 🙈',
    time: '09:22',
    isOwn: false,
  },
  {
    id: 5,
    author: 'Bogdan R.',
    text: 'Ar trebui o lege pentru asta la noi în România, ca în Franța',
    time: '09:25',
    isOwn: false,
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        author: 'Tu',
        text,
        time: new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <Text style={styles.headerSub}>Discuție despre întrebarea de azi</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.bubble, msg.isOwn && styles.bubbleOwn]}>
              {!msg.isOwn && <Text style={styles.author}>{msg.author}</Text>}
              <View style={[styles.bubbleInner, msg.isOwn && styles.bubbleInnerOwn]}>
                <Text style={[styles.bubbleText, msg.isOwn && styles.bubbleTextOwn]}>
                  {msg.text}
                </Text>
                <Text style={[styles.time, msg.isOwn && styles.timeOwn]}>{msg.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Scrie un mesaj..."
            placeholderTextColor="#9E9E9E"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Text style={styles.sendBtnText}>↑</Text>
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
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 4 },
  bubble: { alignItems: 'flex-start', marginVertical: 3 },
  bubbleOwn: { alignItems: 'flex-end' },
  author: { fontSize: 11, fontWeight: '600', color: '#9E9E9E', marginBottom: 2, marginLeft: 4 },
  bubbleInner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  bubbleInnerOwn: {
    backgroundColor: '#1a73e8',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  bubbleText: { fontSize: 15, color: '#212121', lineHeight: 21 },
  bubbleTextOwn: { color: '#fff' },
  time: { fontSize: 10, color: '#BDBDBD', marginTop: 4, alignSelf: 'flex-end' },
  timeOwn: { color: 'rgba(255,255,255,0.6)' },
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
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#BDBDBD' },
  sendBtnText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});

// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Animated, Easing } from 'react-native';

const answers = [
  { text: "Yep", probability: 0.4 },
  { text: "Nope", probability: 0.3 },
  { text: "Dunno", probability: 0.3 },
];

const getRandomAnswer = () => {
  const rand = Math.random();
  let accumulatedProbability = 0;

  for (const answer of answers) {
    accumulatedProbability += answer.probability;
    if (rand < accumulatedProbability) {
      return answer.text;
    }
  }
  return "Dunno";  // Fallback
}

export default function App() {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const opacity = new Animated.Value(0);

  const handlePress = () => {
    setLoading(true);
    setAnswer('');
    setTimeout(() => {
      const newAnswer = getRandomAnswer();
      setAnswer(newAnswer);
      setLoading(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={handlePress}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Animated.Text style={[styles.answerText, { opacity }]}>{answer}</Animated.Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00008B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  answerText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
  },
});
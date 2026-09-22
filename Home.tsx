import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import styles from "./styles";

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Olá, Lucas!</Text>
        <Text style={styles.title}>MovieHub</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo</Text>
          <Text style={styles.cardText}>Total de filmes: 25</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

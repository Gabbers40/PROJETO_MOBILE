import React from "react";
import { SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import styles from "./styles";

const Splash: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MovieHub</Text>
        <Text style={styles.subtitle}>Gerenciador de Filmes</Text>
        <ActivityIndicator size="large" color="#f5c518" style={styles.loader} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles";

const About: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sobre o App</Text>
        <Text style={styles.text}>MovieHub v1.0.0 - Todos os direitos reservados.</Text>
      </View>
    </SafeAreaView>
  );
};

export default About;

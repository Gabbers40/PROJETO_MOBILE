import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles";

const Sort: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ordenar por</Text>
        <Text style={styles.text}>Escolha a forma de ordenação dos filmes.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Sort;

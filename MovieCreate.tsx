import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

const MovieCreate: React.FC = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Novo Filme</Text>
        <TextInput
          style={styles.input}
          placeholder="Título do filme"
          placeholderTextColor="#777777"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Diretor"
          placeholderTextColor="#777777"
          value={director}
          onChangeText={setDirector}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Filme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MovieCreate;

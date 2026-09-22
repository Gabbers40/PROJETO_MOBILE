import React from "react";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import styles from "./styles";

const Movies: React.FC = () => {
  const moviesList = [
    { id: "1", title: "Interestelar" },
    { id: "2", title: "O Poderoso Chefão" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Filmes</Text>
        <FlatList
          data={moviesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Movies;

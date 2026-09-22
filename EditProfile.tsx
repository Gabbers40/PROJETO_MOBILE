import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import styles from "./styles";

const EditProfile: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.text}>Atualize seus dados pessoais.</Text>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

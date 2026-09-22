import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

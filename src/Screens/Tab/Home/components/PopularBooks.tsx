import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PopularBooks = () => {
  return (
    <View>
      <Image
        source={require("../../../../../assets/bigBook.png")}
        width={126}
        height={192}
        resizeMethod="auto"
        resizeMode="contain"
      />
      <Text style={styles.heading}>Fashionopolis</Text>
      <Text>Dana Thomas</Text>
    </View>
  );
};

export default PopularBooks;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

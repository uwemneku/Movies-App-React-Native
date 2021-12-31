import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useToggleTabBarVisibility } from "../../Hooks";
import { SharedScreenParamList } from "../../Navigation/types";

type SearchScreenProps = StackScreenProps<SharedScreenParamList, "Search">;

const Search = ({ navigation }: SearchScreenProps) => {
  useToggleTabBarVisibility(navigation);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});

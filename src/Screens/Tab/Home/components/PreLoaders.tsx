import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Loading } from "../../../../components";

interface Props {
  count: number;
  direction?: "row" | "column";
}
const PreLoaders = ({ count, direction }: Props) => {
  const arr = Array.from({ length: count }, (v, i) => i);
  return (
    <View style={{ flexDirection: direction }}>
      {arr.map((v, i) => (
        <View key={i} style={{ margin: 10 }}>
          <Loading height={192} width={126} />
        </View>
      ))}
    </View>
  );
};

export default PreLoaders;

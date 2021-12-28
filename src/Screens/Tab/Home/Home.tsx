import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabParamList, RootParamList } from "../../../Navigation/types";
import { FAB, NewBooks, PopularBooks } from "./components";

type Props = CompositeScreenProps<
  StackScreenProps<RootParamList>,
  BottomTabScreenProps<BottomTabParamList>
>;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<number>>(FlatList);

const Home = ({ navigation }: Props) => {
  const [popularBooks, setPopularBooks] = useState([1, 2, 3, 4, 5, 6, 7]);

  const scrollY = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../../assets/image.png")}
            width={100}
            height={100}
          />
          <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>
            Hi, Dustin!
          </Text>
        </View>
        <Ionicons
          name="ios-search-outline"
          size={30}
          onPress={() => navigation.navigate("search")}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AnimatedFlatList
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.heading}>Popular Books</Text>
                <FlatList
                  data={popularBooks}
                  renderItem={({ item, index }) => (
                    <PopularBooks {...{ index }} />
                  )}
                  ListEmptyComponent={() => (
                    <View style={{ flexDirection: "row" }}>
                      {[1, 2, 3, 4].map((item, index) => (
                        <PopularBooks key={index} />
                      ))}
                    </View>
                  )}
                  keyExtractor={(item) => item.toString()}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
                  snapToInterval={156}
                  showsHorizontalScrollIndicator={false}
                />
                <Text style={styles.heading}>New Books</Text>
              </View>
            )}
            ref={scrollRef}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 12]}
            renderItem={({ item }) => <NewBooks />}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
          />
        </View>
      </View>
      <FAB
        {...{ scrollY }}
        onPress={() => {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    zIndex: 4,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

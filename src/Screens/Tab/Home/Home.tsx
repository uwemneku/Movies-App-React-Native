import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomTabParamList, RootParamList } from "../../../Navigation/types";
import { NewBooks, PopularBooks } from "./components";

type Props = CompositeScreenProps<
  StackScreenProps<RootParamList>,
  BottomTabScreenProps<BottomTabParamList>
>;
const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<number>>(FlatList);

const Home = ({ navigation }: Props) => {
  const scrollY = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);
  const [isPanGestureActive, setIsPanGestureActive] = useState(true);

  const animatedStyle = useAnimatedStyle(() => ({
    margin: 0,
    marginTop: -scrollY.value,
  }));

  useEffect(() => {
    console.log("scrollY.value", scrollY.value);

    scrollY.value > 360 && setIsPanGestureActive(false);
  }, [scrollY.value]);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { start: number }
  >({
    onStart: ({}, ctx) => {
      ctx.start = scrollY.value;
    },
    onActive: ({ translationY }, ctx) => {
      scrollY.value = ctx.start - translationY;
      scrollY.value > 360 && runOnJS(setIsPanGestureActive)(false);
      // console.log(ctx.start - translationY);
    },
  });
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      // scrollY.value = contentOffset.y;
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
        <Animated.View style={animatedStyle}>
          <Text style={styles.heading}>Popular Books</Text>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({ item }) => <PopularBooks />}
            keyExtractor={(item) => item.toString()}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
            snapToInterval={156}
          />
        </Animated.View>
        <PanGestureHandler
          onGestureEvent={gestureHandler}
          enabled={isPanGestureActive}
        >
          <Animated.View style={{ flex: 1 }}>
            <Text style={styles.heading}>New Books</Text>
            <AnimatedFlatList
              ref={scrollRef}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 12]}
              renderItem={({ item }) => <NewBooks />}
              keyExtractor={(item) => item.toString()}
              onScroll={scrollHandler}
              ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // backgroundColor: "red",
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

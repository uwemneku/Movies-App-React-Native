import { Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles, TabBar } from "../../../components";
import { Movie as movieModel } from "../../../models/movie";
import { SharedScreenParamList } from "../../../Navigation/types";
import api from "../../../services/api";
import getRandomMovies from "../../../Utils/getRandomValuesFromArray";
import { FAB, Movie, PreLoaders } from "./components";

type Props = StackScreenProps<SharedScreenParamList, "Home">;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<movieModel>>(FlatList);

const t = getRandomMovies(28);
const Home = ({ navigation }: Props) => {
  const [titles, sett] = useState(getRandomMovies(28));
  const { data, isLoading, isError, refetch, isFetching } =
    api.useGetMoviesQuery(titles);
  const [popularMovies, setPopularMovies] = useState<movieModel[]>([]);
  const [newMovies, setNewMovies] = useState<movieModel[]>([]);
  const scrollY = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });

  const onRefresh = () => sett(getRandomMovies(28));

  useEffect(() => {
    if (data) {
      setPopularMovies(data.slice(0, 10));
      setNewMovies(data.slice(10));
    }
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.header]}>
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
          onPress={() => navigation.navigate("Search")}
        />
      </View>

      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <AnimatedFlatList
            ListHeaderComponent={() => (
              <View>
                <Text style={[globalStyles.heading, styles.heading]}>
                  Popular
                </Text>
                <FlatList
                  data={popularMovies}
                  renderItem={({ item, index }) => (
                    <Movie data={item} variant="vertical" />
                  )}
                  ListEmptyComponent={() => (
                    <PreLoaders count={3} direction="row" />
                  )}
                  keyExtractor={(item, index) => item.imdbID + index}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
                  snapToInterval={156}
                  showsHorizontalScrollIndicator={false}
                />
                <Text style={[globalStyles.heading, styles.heading]}>
                  New Releases
                </Text>
              </View>
            )}
            ref={scrollRef}
            data={newMovies}
            renderItem={({ item, index }) => (
              <Movie data={item} variant="horizontal" />
            )}
            ListEmptyComponent={() => (
              <PreLoaders count={3} direction="column" />
            )}
            keyExtractor={(item, index) => item.imdbID + index}
            ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
      <FAB
        {...{ scrollY }}
        onPress={() => {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
      />
      <Portal hostName="TabBar">
        <TabBar />
      </Portal>
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
    padding: 10,
    margin: 10,
    borderRadius: 10,
    zIndex: 4,
    backgroundColor: "#fff",
  },
  heading: {
    marginVertical: 20,
  },
});

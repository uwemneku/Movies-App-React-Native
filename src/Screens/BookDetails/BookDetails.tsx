import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableNativeFeedbackBase,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { useTabBarContext } from "../../Context/BottomTabBarVisibility/Context";
import { globalStyles } from "../../components";
import { SharedScreenParamList } from "../../Navigation/types";
import { useDeviceOrientation } from "../../Hooks";

type BookDetailsScreenProps = StackScreenProps<
  SharedScreenParamList,
  "bookDetails"
>;

const BookDetails = ({ navigation, route }: BookDetailsScreenProps) => {
  const { id, image: uri, Director, description, rating, title } = route.params;
  const { isTabBarVisible } = useTabBarContext();
  const or = useDeviceOrientation();
  useFocusEffect(
    useCallback(() => {
      isTabBarVisible.value = false;
    }, [])
  );

  useEffect(() => {
    const showTabBar = () => (isTabBarVisible.value = true);
    navigation.addListener("beforeRemove", showTabBar);

    return () => {
      navigation.removeListener("beforeRemove", showTabBar);
    };
  }, []);

  const handleBackNavigation = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            onPress={handleBackNavigation}
          />
          <Ionicons name="bookmarks-outline" size={30} />
        </View>
        <View style={styles.flexItem}>
          <SharedElement id={`image-${id}`}>
            <View>
              <Image
                source={{ uri }}
                width={10}
                height={10}
                resizeMode="cover"
                style={{ backgroundColor: "red", width: 211, height: 310 }}
              />
            </View>
          </SharedElement>
          <Text style={globalStyles.heading}>{title}</Text>
          <Text style={globalStyles.author}>{Director}</Text>
          <View>
            <Text style={globalStyles.author}>{rating}/10</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[globalStyles.author, styles.description]}>
            {description} {or}
          </Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("white", false)}
          >
            <View style={styles.button}>
              <Text style={{ color: "white", fontSize: 20 }}>
                Add to cart{" "}
                <Ionicons name="cart-outline" color={"white"} size={20} />{" "}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  flexItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  description: {
    textAlign: "center",
    marginVertical: 10,
  },
});

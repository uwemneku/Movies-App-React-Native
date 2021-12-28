import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { useTabBarContext } from "../../../Context/BottomTabBarVisibility/Context";
import { RootParamList, SharedScreenParamList } from "../../Navigation/types";

type BookDetailsScreenProps = StackScreenProps<
  SharedScreenParamList,
  "bookDetails"
>;

const BookDetails = ({ navigation, route }: BookDetailsScreenProps) => {
  const { id, image } = route.params;

  const { isTabBarVisible } = useTabBarContext();

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

  return (
    <SafeAreaView>
      <Text>ddd</Text>
      <SharedElement id={`image-${id}`}>
        <View>
          <Image
            source={require("../../../assets/bigBook.png")}
            width={10}
            height={10}
            resizeMode="cover"
            style={{ backgroundColor: "red", width: 211, height: 310 }}
          />
        </View>
      </SharedElement>
      <Text style={styles.heading}>Fashionopolis</Text>
    </SafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({});

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import Button from "@app/components/ui/Button";
import { IconButton } from "@app/components/ui";
import styles from "./styles";
import SCREEN_NAMES from "@app/navigation/screen.names";

interface coordinates {
  longitude: number;
  latitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const RequestMap: React.FC = () => {
  //defaulted coordinates to phillipines if user does not provide permisisons to share their location
  //can change this in the future to default to the user's profile location (not sure if we even store this tho)?
  const [coordinates, setCoordinates] = useState<coordinates>({
    latitude: 10.4444424,
    longitude: 124.738953,
    latitudeDelta: 30,
    longitudeDelta: 0,
  });

  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0.15,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: coordinates.latitudeDelta,
          longitudeDelta: coordinates.longitudeDelta,
        }}
        zoomEnabled={true}
      />
      <View style={styles.backButton}>
        <IconButton
          id="back-icon-button"
          icon="chevron-back-outline"
          onPress={() => navigation.navigate(SCREEN_NAMES.app.home)}
        />
      </View>
      <View style={styles.button}>
        <Button
          id="request-food-button"
          title="Request food"
          onPress={() => console.log("click")} //TO DO
          color="warning"
        />
      </View>
    </View>
  );
};
export default RequestMap;

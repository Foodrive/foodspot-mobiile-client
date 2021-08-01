import React from "react";
import { View, Text } from "react-native";
import { EventDetailsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID } from "@app/graphql/queries/events.queries";
import { IconButton } from "@app/components/ui";
import styles from "./styles";

type EventDetailsProps = EventDetailsPropsFromRedux; // interface EventDetailsProps extends EventDetailsPropsFromRedux when needed

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const navigation = useNavigation();
  const { loading, data, error } = useQuery(GET_FOOD_DRIVE_BY_ID, {
    variables: {
      getFoodDriveByIdEventId: eventId,
    },
  });

  // TODO
  return (
    <View>
      <View style={styles.backButton}>
        <IconButton
          id="back-icon-button"
          icon="chevron-back-outline"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Event Details</Text>
        {!loading && data.getFoodDriveById && (
          <>
            <Text style={styles.text}>Name: {data.getFoodDriveById.name}</Text>
            <Text style={styles.text}>
              Description: {data.getFoodDriveById.description}
            </Text>
            <Text style={styles.text}>
              Start Date: {data.getFoodDriveById.startDate}
            </Text>
            <Text style={styles.text}>
              End Date: {data.getFoodDriveById.endDate}
            </Text>
            <Text style={styles.text}>
              Address: {data.getFoodDriveById.location.address}
            </Text>
            <Text style={styles.text}>
              Contact Number: {data.getFoodDriveById.contactNumber}
            </Text>
            <Text style={styles.text}>
              Allergens:{" "}
              {data.getFoodDriveById.food
                .map((food) => food.allergens.join(", "))
                .join(", ")}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default EventDetails;

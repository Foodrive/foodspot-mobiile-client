import React from "react";
import { View, Text } from "react-native";
import { EventDetailsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID } from "@app/graphql/queries/events.queries";
import { IconButton } from "@app/components/ui";
import styles from "./styles";
import EventDetailsCard from "./EventDetailsCard";
import Button from "@app/components/ui/Button";
import SCREEN_NAMES from "@app/navigation/screen.names";

type EventDetailsProps = EventDetailsPropsFromRedux; // interface EventDetailsProps extends EventDetailsPropsFromRedux when needed

const EventDetails: React.FC<EventDetailsProps> = ({
  eventId,
  invitationId,
}) => {
  const navigation = useNavigation();
  const { loading, data, error } = useQuery(GET_FOOD_DRIVE_BY_ID, {
    variables: {
      getFoodDriveByIdEventId: eventId,
    },
  });

  // TODO
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <IconButton
          id="back-icon-button"
          icon="chevron-back-outline"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.heading}>Event Details</Text>
        <View style={styles.floatingIconButton}>
          <IconButton
            id="share-icon-button"
            icon="share-social-outline"
            onPress={() => {
              console.log("share"); // TODO
            }}
            reverse={false}
          />
        </View>
      </View>
      <View>
        {!loading && data.getFoodDriveById && (
          <>
            <EventDetailsCard
              name={data.getFoodDriveById.name}
              startDate={data.getFoodDriveById.startDate}
              endDate={data.getFoodDriveById.endDate}
              description={data.getFoodDriveById.description}
              address={data.getFoodDriveById.location.address}
              contactNumber={data.getFoodDriveById.contactNumber}
              allergens={data.getFoodDriveById.food.reduce(
                (accm: string[], food: { allergens: string[] }) => {
                  accm = accm.concat(food.allergens);
                  return accm;
                },
                [],
              )}
            />
            {invitationId === null ? (
              <Button
                id="next-button"
                title="Register for event"
                onPress={() => {
                  navigation.navigate(SCREEN_NAMES.common.events.registerEvent);
                }}
                titleStyle={styles.buttonTitle}
              />
            ) : (
              <Button
                id="next-button"
                title="Unregister"
                onPress={() => {
                  // TODO
                }}
                titleStyle={styles.buttonTitle}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default EventDetails;

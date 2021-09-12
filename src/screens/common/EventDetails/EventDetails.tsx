import React from "react";
import { View, ScrollView } from "react-native";
import { EventDetailsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID } from "@app/graphql/queries/events.queries";
import { IconButton } from "@app/components/ui";
import styles from "./styles";
import EventDetailsCard from "./EventDetailsCard";
import Button from "@app/components/ui/Button";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { GET_INVITATION_BY_ID } from "@app/graphql/queries";
import { PageHeader } from "@app/components/common/PageHeader";

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

  const { loading: invitationLoading, data: invitationData } = useQuery(
    GET_INVITATION_BY_ID,
    {
      variables: {
        getInvitationByIdInvId: invitationId,
      },
    },
  );

  // TODO
  return (
    <ScrollView>
      <PageHeader
        id="event-details"
        hasBack
        title="Event Details"
        onBackPress={() => {
          navigation.goBack();
        }}
        actions={
          <IconButton
            id="share-icon-button"
            icon="share-social-outline"
            onPress={() => {
              console.log("share"); // TODO
            }}
            reverse={false}
          />
        }
        containerStyle={styles.headingContainer}
      />
      <View style={styles.contentContainer}>
        {!loading && data?.getFoodDriveById && !invitationLoading && (
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
              invitation={invitationData?.getInvitationById}
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
    </ScrollView>
  );
};

export default EventDetails;

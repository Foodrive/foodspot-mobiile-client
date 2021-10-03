import React, { useState, useCallback } from "react";
import { View, ScrollView, Text } from "react-native";
import { EventDetailsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID } from "@app/graphql/queries/events.queries";
import { IconButton } from "@app/components/ui";
import styles from "./styles";
import EventDetailsCard from "./EventDetailsCard";
import Button from "@app/components/ui/Button";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { GET_INVITATION_BY_ID } from "@app/graphql/queries";
import { PageHeader } from "@app/components/common/PageHeader";
import { Overlay } from "@app/components/ui/Overlay";
import { CANCEL_INVITATION } from "@app/graphql/mutations/invitations.mutation";
import useToastProvider from "@app/hooks/useToastProvider";

type EventDetailsProps = EventDetailsPropsFromRedux; // interface EventDetailsProps extends EventDetailsPropsFromRedux when needed

const EventDetails: React.FC<EventDetailsProps> = ({
  eventId,
  invitationId,
  setCurrentInvitationId
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
  const [
    cancelInvitation,
    { loading: cancelInvitationLoading, error: cancelInvitationError, data: cancelInvitationData },
  ] = useMutation(CANCEL_INVITATION);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const toastProvider = useToastProvider();

  const onUnregister = useCallback(async () => {
    try {
      await cancelInvitation({
        variables: {
          cancelInvitationInvId: invitationId,
        }
      });
      setCurrentInvitationId(null);
    } catch(e) {
      if (cancelInvitationError) {
        toastProvider.showError(cancelInvitationError.message);
      }
    }
    setOverlayOpen(false);
  },[]);

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
        {!loading && !cancelInvitationLoading && data?.getFoodDriveById && !invitationLoading && (
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
                  setOverlayOpen(true);
                }}
                titleStyle={styles.buttonTitle}
                loading={cancelInvitationLoading}
              />
            )}
          </>
        )}
      </View>
      <View>
        <Overlay isVisible={overlayOpen} onBackdropPress={() => {
          if (cancelInvitationLoading) {
            return;
          } 
          setOverlayOpen(false);
        }} overlayStyle={styles.unregisterOverlay}>
          <View> 
            <Text style={styles.unregisterOverlayText}>Are you sure you want to cancel your registration to this event?</Text>
            <View style={styles.unregisterOverlayContainer}>
              <View>
                <Button id="cancel-unregister-btn" title="No" onPress={() => setOverlayOpen(false)} disabled={cancelInvitationLoading}/>
              </View>
              <View>
                <Button id="confirm-unregister-btn" title="Yes" type="clear" onPress={onUnregister} loading={cancelInvitationLoading}/>
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    </ScrollView>
  );
};

export default EventDetails;

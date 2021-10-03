import React, { useState, useCallback, useEffect } from "react";
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
  const { loading: foodDriveLoading, data: foodDriveData, error: foodDriveError } = useQuery(
    GET_FOOD_DRIVE_BY_ID, 
    {
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
    { loading: cancelInvitationLoading },
  ] = useMutation(CANCEL_INVITATION);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const toastProvider = useToastProvider();

  useEffect(() => {
    if (foodDriveError) {
      toastProvider.showError("Failed to load event details");
    }
  }, [foodDriveError]);

  const onUnregister = useCallback(async () => {
    try {
      await cancelInvitation({
        variables: {
          cancelInvitationInvId: invitationId,
        }
      });
      setCurrentInvitationId(null);
    } catch(e) {
      toastProvider.showError("Failed to unregister");
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
        {!foodDriveLoading && !cancelInvitationLoading && foodDriveData?.getFoodDriveById && !invitationLoading && (
          <>
            <EventDetailsCard
              name={foodDriveData.getFoodDriveById.name}
              startDate={foodDriveData.getFoodDriveById.startDate}
              endDate={foodDriveData.getFoodDriveById.endDate}
              description={foodDriveData.getFoodDriveById.description}
              address={foodDriveData.getFoodDriveById.location.address}
              contactNumber={foodDriveData.getFoodDriveById.contactNumber}
              allergens={foodDriveData.getFoodDriveById.food.reduce(
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

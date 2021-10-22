import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { EventProgressPropsFromRedux } from "@app/screens/EventProgress/container";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID_FULL_DETAILS } from "@app/graphql/queries";
import useToastProvider from "@app/hooks/useToastProvider";
import { EventInfoCard } from "@app/components/common/EventInfoCard";
import { useStyles } from "./styles";
import { CapacityBar } from "@app/components/common/CapacityBar";
import {
  convertFoodDriveToCreateData,
  getAttendeeInfoFromEvent,
} from "@app/utils";
import Button from "@app/components/ui/Button";
import SCREEN_NAMES from "@app/navigation/screen.names";
import config from "@app/config";
import dayjs from "dayjs";
import { DELETE_FOOD_DRIVE } from "@app/graphql/mutations/events.mutation";

type EventProgressProps = EventProgressPropsFromRedux;

const EventProgress: React.FC<EventProgressProps> = ({
  eventId,
  event,
  setEvent,
  resetCreateData,
  setCeEventFlowTitle,
}) => {
  const navigation = useNavigation();
  const toastProvider = useToastProvider();
  const styles = useStyles();
  const [isUpcoming, setIsUpcoming] = useState(false);
  const { loading, error, data } = useQuery(GET_FOOD_DRIVE_BY_ID_FULL_DETAILS, {
    pollInterval: config.defaultPollInterval,
    variables: {
      eventId,
    },
  });
  const [
    deleteFoodDrive,
    { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_FOOD_DRIVE);

  const attendeeInfo = useMemo(() => {
    if (data) {
      const { getFoodDriveById: event } = data;
      return getAttendeeInfoFromEvent(event);
    } else {
      return undefined;
    }
  }, [data]);

  useEffect(() => {
    if (!loading && !error && data) {
      const { getFoodDriveById: event } = data;
      const eventDetails = convertFoodDriveToCreateData(event);
      setIsUpcoming(dayjs().isBefore(eventDetails.startDate));
      setEvent(eventDetails);
    } else if (error) {
      toastProvider.showError(error.message);
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (!deleteLoading && !deleteError && deleteData) {
      const action = isUpcoming ? "cancelled" : "closed";
      toastProvider.showSuccess(
        `Successfully ${action} the event: ${event?.name}`,
      );
      navigation.goBack();
    } else if (!deleteLoading && deleteError) {
      toastProvider.showError(deleteError.message);
    }
  }, [
    deleteLoading,
    deleteError,
    deleteData,
    toastProvider,
    event,
    isUpcoming,
  ]);

  const onBack = useCallback(() => {
    resetCreateData();
    navigation.goBack();
  }, [navigation, resetCreateData]);

  const onEditPressed = useCallback(() => {
    setCeEventFlowTitle("Edit Event");
    navigation.navigate(SCREEN_NAMES.common.events.basicDetails);
  }, [event, navigation, setCeEventFlowTitle]);

  const onPendingPressed = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.events.pendingInvites);
  }, []);

  const onDelete = useCallback(async () => {
    await deleteFoodDrive({
      variables: {
        eventId,
      },
    }).catch();
  }, [deleteFoodDrive, eventId]);

  return (
    <ScrollView>
      <PageHeader
        id="event-progress"
        title="Event Details"
        hasBack
        onBackPress={onBack}
      />
      <View style={styles.bodyContainer}>
        {attendeeInfo && (
          <CapacityBar
            value={attendeeInfo.claimsLeftInclPending}
            max={attendeeInfo.maxCapacity}
          />
        )}
        {!loading && event && (
          <>
            {!event.autoAccept && (
              <Button
                color="warning"
                id="pending-btn"
                title={`${attendeeInfo?.pendingInvites ?? 0} Pending`}
                containerStyle={{ marginBottom: 10 }}
                disabled={deleteLoading || attendeeInfo?.pendingInvites === 0}
                onPress={onPendingPressed}
              />
            )}
            <Button
              color="primary"
              id="edit-btn"
              title="Edit event"
              disabled={deleteLoading}
              onPress={onEditPressed}
            />
          </>
        )}
        <EventInfoCard id="event-details-card" event={event} />
        {!loading && event && (
          <Button
            id="cancel-close-btn"
            color="danger"
            title={`${isUpcoming ? "Cancel" : "Close"} Event`}
            disabled={deleteLoading}
            loading={deleteLoading}
            onPress={onDelete}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EventProgress;

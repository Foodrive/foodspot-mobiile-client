import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { EventProgressPropsFromRedux } from "@app/screens/EventProgress/container";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID_FULL_DETAILS } from "@app/graphql/queries";
import useToastProvider from "@app/hooks/useToastProvider";
import { convertFoodDriveToCreateData } from "@app/utils/mappers";
import { EventInfoCard } from "@app/components/common/EventInfoCard";
import { useStyles } from "./styles";
import { CapacityBar } from "./CapacityBar";
import { AttendeeCount } from "@app/utils/types";
import { getAttendeeCount } from "@app/utils";
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
  const [attendeeCount, setAttendeeCount] = useState<AttendeeCount | undefined>(
    undefined,
  );
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

  useEffect(() => {
    if (!loading && !error && data) {
      const { getFoodDriveById: event } = data;
      const eventDetails = convertFoodDriveToCreateData(event);
      const attendeeCount = getAttendeeCount(
        event.invitations,
        event.maxCapacity,
      );
      setIsUpcoming(dayjs().isBefore(eventDetails.startDate));
      setEvent(eventDetails);
      setAttendeeCount(attendeeCount);
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
        {event && attendeeCount && (
          <CapacityBar
            value={attendeeCount.claimsLeft}
            max={event.maxCapacity ?? 0}
          />
        )}
        {!loading && (
          <Button
            color="primary"
            id="edit-btn"
            title="Edit event"
            disabled={event === undefined || deleteLoading}
            onPress={onEditPressed}
          />
        )}
        <EventInfoCard id="event-details-card" event={event} />
        {!loading && (
          <Button
            id="cancel-close-btn"
            color="danger"
            title={`${isUpcoming ? "Cancel" : "Close"} Event`}
            disabled={event === undefined || deleteLoading}
            loading={deleteLoading}
            onPress={onDelete}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EventProgress;

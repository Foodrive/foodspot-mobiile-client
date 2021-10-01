import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { EventProgressPropsFromRedux } from "@app/screens/EventProgress/container";
import { useQuery } from "@apollo/client";
import { GET_FOOD_DRIVE_BY_ID_FULL_DETAILS } from "@app/graphql/queries";
import { EventCreateData } from "@app/types/event.types";
import useToastProvider from "@app/hooks/useToastProvider";
import { convertFoodDriveToCreateData } from "@app/utils/mappers";
import { EventInfoCard } from "@app/components/common/EventInfoCard";
import { useStyles } from "./styles";
import { CapacityBar } from "./CapacityBar";
import { AttendeeCount } from "@app/utils/types";
import { getAttendeeCount } from "@app/utils";

type EventProgressProps = EventProgressPropsFromRedux;

const EventProgress: React.FC<EventProgressProps> = ({ eventId }) => {
  const navigation = useNavigation();
  const toastProvider = useToastProvider();
  const styles = useStyles();
  const [event, setEvent] = useState<EventCreateData | undefined>(undefined);
  const [attendeeCount, setAttendeeCount] = useState<AttendeeCount | undefined>(
    undefined,
  );
  const { loading, error, data } = useQuery(GET_FOOD_DRIVE_BY_ID_FULL_DETAILS, {
    variables: {
      eventId,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const { getFoodDriveById: event } = data;
      const eventDetails = convertFoodDriveToCreateData(event);
      const attendeeCount = getAttendeeCount(
        event.invitations,
        event.maxCapacity,
      );
      setEvent(eventDetails);
      setAttendeeCount(attendeeCount);
    } else if (error) {
      toastProvider.showError(error.message);
    }
  }, [loading, data, error]);

  return (
    <ScrollView>
      <PageHeader
        id="event-progress"
        title="Event Details"
        hasBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.bodyContainer}>
        {event && attendeeCount && (
          <CapacityBar
            value={attendeeCount.claimsLeft}
            max={event.maxCapacity ?? 0}
          />
        )}
        <EventInfoCard id="event-details-card" event={event} />
      </View>
    </ScrollView>
  );
};

export default EventProgress;

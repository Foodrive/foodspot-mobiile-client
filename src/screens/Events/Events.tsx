import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import {
  GET_INVITATIONS_BY_USER,
  UserInvitation,
} from "@app/graphql/queries/invitations.queries";
import { EventsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { IconButton, ListItem, TabButtonGroup } from "@app/components/ui";
import { colors } from "@app/utils";
import { InvitationStatus } from "@app/utils/constants";
import SCREEN_NAMES from "@app/navigation/screen.names";
import dayjs from "dayjs";
import styles from "./styles";
import useToastProvider from "@app/hooks/useToastProvider";

type EventsProps = EventsPropsFromRedux;
interface UserInvitationsByStatus {
  accepted: UserInvitation[];
  pending: UserInvitation[];
  rejected: UserInvitation[];
}

const Events: React.FC<EventsProps> = ({ currentUser, setCurrentEventId }) => {
  const [events, setEvents] = useState<UserInvitationsByStatus>({
    accepted: [],
    pending: [],
    rejected: [],
  });

  const toastProvider = useToastProvider();
  const navigation = useNavigation();
  const { data, error, loading } = useQuery<UserInvitation>(
    GET_INVITATIONS_BY_USER,
    {
      variables: {
        getInvitationsUserId: currentUser?.id,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error && data) {
      const filteredEvents: UserInvitationsByStatus = {
        accepted: [],
        pending: [],
        rejected: [],
      };
      data.getInvitations.forEach((event: any) => {
        if (event.status === InvitationStatus.accepted) {
          filteredEvents.accepted.push(event);
        } else if (event.status === InvitationStatus.pending) {
          filteredEvents.pending.push(event);
        } else if (event.status === InvitationStatus.rejected) {
          filteredEvents.accepted.push(event);
        }
      });
      setEvents(filteredEvents);
    } else if (error) {
      toastProvider.showError(error.message);
    }
  }, [data, loading, error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your events</Text>
        <IconButton
          id="create-button"
          icon="add"
          color="default"
          onPress={() =>
            navigation.navigate(SCREEN_NAMES.common.events.basicDetails)
          }
        />
      </View>
      <View style={styles.tabs}>
        <TabButtonGroup
          buttons={["Yours", "Organised", "History"]}
          selectedIndex={0}
          onPress={() => console.log("click")} // TO DO
        />
      </View>
      <View style={styles.eventList}>
        <Text style={styles.text}>Upcoming</Text>
        {!loading &&
          events &&
          events.accepted.map((foodDrive: any) => (
            <ListItem
              id={`${foodDrive.id}-list-item`}
              key={`${foodDrive.id}-list-item`}
              title={foodDrive.event.name}
              otherInformation={`${dayjs(foodDrive.event.startDate).format(
                "DD MMM YY h:mm A",
              )} - ${dayjs(foodDrive.event.endDate).format(
                "DD MMM YY h:mm A",
              )}`}
              onPress={() => {
                setCurrentEventId(foodDrive.event.id);
                navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
              }}
              iconColor={colors.success}
            />
          ))}
      </View>
      <View style={styles.eventList}>
        <Text style={styles.text}>Pending confirmation</Text>
        {!loading &&
          events &&
          events.pending.map((foodDrive: any) => (
            <ListItem
              id={`${foodDrive.id}-list-item`}
              key={`${foodDrive.id}-list-item`}
              title={foodDrive.event.name}
              otherInformation={`${dayjs(foodDrive.event.startDate).format(
                "DD MMM YY h:mm A",
              )} - ${dayjs(foodDrive.event.endDate).format(
                "DD MMM YY h:mm A",
              )}`}
              onPress={() => {
                setCurrentEventId(foodDrive.event.id);
                navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
              }}
              iconColor={colors.orange}
            />
          ))}
      </View>
      <View style={styles.eventList}>
        <Text style={styles.text}>Rejected events</Text>
        {!loading &&
          events &&
          events.rejected.map((foodDrive: any) => (
            <ListItem
              id={`${foodDrive.id}-list-item`}
              key={`${foodDrive.id}-list-item`}
              title={foodDrive.event.name}
              otherInformation={`${dayjs(foodDrive.event.startDate).format(
                "DD MMM YY h:mm A",
              )} - ${dayjs(foodDrive.event.endDate).format(
                "DD MMM YY h:mm A",
              )}`}
              onPress={() => {
                setCurrentEventId(foodDrive.event.id);
                navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default Events;

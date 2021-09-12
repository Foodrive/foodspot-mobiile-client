import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import {
  GetUserInvitation,
  GET_INVITATIONS_BY_USER,
  UserInvitation,
} from "@app/graphql/queries";
import { EventsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { IconButton, ListItem, SectionedList, TabButtonGroup } from "@app/components/ui";
import { colors } from "@app/utils";
import { InvitationStatus } from "@app/utils/constants";
import SCREEN_NAMES from "@app/navigation/screen.names";
import dayjs from "dayjs";
import styles from "./styles";
import useToastProvider from "@app/hooks/useToastProvider";
import { SectionedListData } from "@app/components/ui/SectionedList";

type EventsProps = EventsPropsFromRedux;

const Events: React.FC<EventsProps> = ({
  currentUser,
  setCurrentEventId,
  setCurrentInvitationId,
}) => {
  const [invitations, setInvitations] = useState<SectionedListData<UserInvitation>[]>([
    {
      title: "Upcoming events",
      data: []
    },
    {
      title: "Pending confirmation",
      data: []
    },
    {
      title: "Rejected events",
      data: []
    },
  ]);

  const toastProvider = useToastProvider();
  const navigation = useNavigation();
  const { data, error, loading } = useQuery<GetUserInvitation>(
    GET_INVITATIONS_BY_USER,
    {
      variables: {
        getInvitationsUserId: currentUser?.id,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error && data) {
      const categorizedEvents: SectionedListData<UserInvitation>[] = [ ...invitations];
      data.getInvitations.forEach((event) => {
        if (event.status === InvitationStatus.accepted) {
          categorizedEvents[0].data.push(event);
        } else if (event.status === InvitationStatus.pending) {
          categorizedEvents[1].data.push(event);
        } else if (event.status === InvitationStatus.rejected) {
          categorizedEvents[2].data.push(event);
        }
      });
      setInvitations(categorizedEvents);
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
          buttons={["Yours", "Organised"]}
          selectedIndex={0}
          onPress={() => console.log("click")} // TO DO
        />
      </View>
      <View style={styles.eventList}>
        <SectionedList
          id="sectioned-list"
          data={invitations}
          renderItem={(invitation) => <ListItem
            id={`${invitation.id}-list-item`}
            title={invitation.event.name}
            otherInformation={`${dayjs(
              invitation.event.startDate,
            ).format("DD MMM YY h:mm A")} - ${dayjs(
              invitation.event.endDate,
            ).format("DD MMM YY h:mm A")}`}
            onPress={() => {
              setCurrentEventId(invitation.event.id);
              setCurrentInvitationId(invitation.id);
              navigation.navigate(
                SCREEN_NAMES.common.events.eventDetails,
              );
            }}
            iconColor={colors.success}
          />}
        />
      </View>
    </View>
  );
};

export default Events;

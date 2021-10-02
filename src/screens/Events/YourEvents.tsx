import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import {
  GetUserInvitation,
  GET_INVITATIONS_BY_USER,
  UserInvitation,
} from "@app/graphql/queries";
import { EventsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { ListItem, SectionedList } from "@app/components/ui";
import { colors, deepClone, getDateInfo } from "@app/utils";
import { InvitationStatus } from "@app/utils/constants";
import SCREEN_NAMES from "@app/navigation/screen.names";
import styles from "./styles";
import useToastProvider from "@app/hooks/useToastProvider";
import { SectionedListData } from "@app/components/ui/SectionedList";
import config from "@app/config";

const sections: SectionedListData<UserInvitation>[] = [
  {
    title: "Upcoming events",
    data: [],
  },
  {
    title: "Pending confirmation",
    data: [],
  },
  {
    title: "Rejected events",
    data: [],
  },
];

const YourEvents: React.FC<EventsPropsFromRedux> = ({
  currentUser,
  setCurrentEventId,
  setCurrentInvitationId,
}) => {
  const [invitations, setInvitations] = useState<
    SectionedListData<UserInvitation>[]
  >(deepClone(sections));

  const toastProvider = useToastProvider();
  const navigation = useNavigation();
  const { data, error, loading } = useQuery<GetUserInvitation>(
    GET_INVITATIONS_BY_USER,
    {
      pollInterval: config.defaultPollInterval,
      variables: {
        getInvitationsUserId: currentUser?.id,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error && data) {
      const categorizedEvents = deepClone(sections);
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

  const renderItem = (invitation: UserInvitation) => {
    const { event } = invitation;
    const dateInfo = getDateInfo(event.startDate, event.endDate);
    const color = dateInfo.isToday ? colors.success : colors.lightbrown;
    return (
      <ListItem
        id={`${invitation.id}-list-item`}
        title={invitation.event.name}
        otherInformation={
          <View>
            <Text style={[styles.dateText, { color }]}>{dateInfo.dayText}</Text>
            <Text style={styles.timeText}>{dateInfo.timeText}</Text>
          </View>
        }
        onPress={() => {
          setCurrentEventId(invitation.event.id);
          setCurrentInvitationId(invitation.id);
          navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
        }}
        iconColor={color}
      />
    );
  };

  return (
    <View style={styles.eventList}>
      <SectionedList
        id="sectioned-list"
        data={invitations}
        renderItem={renderItem}
      />
    </View>
  );
};

export default YourEvents;

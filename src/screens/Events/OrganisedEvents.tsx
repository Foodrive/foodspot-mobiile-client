import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import {
  GET_FOOD_DRIVE_BY_USER_ID,
  GetOrganiserFoodDrives,
} from "@app/graphql/queries";
import { EventsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { ListItem, ProgressBar, SectionedList } from "@app/components/ui";
import { colors, getAttendeeCount, deepClone } from "@app/utils";
import SCREEN_NAMES from "@app/navigation/screen.names";
import styles from "./styles";
import useToastProvider from "@app/hooks/useToastProvider";
import { SectionedListData } from "@app/components/ui/SectionedList";
import config from "@app/config";

type OngoingEvent = {
  id: string;
  name: string;
  claimsLeft: number;
  pending: number;
  maxCapacity: number;
};

const sections: SectionedListData<OngoingEvent>[] = [
  {
    title: "Ongoing events",
    data: [],
  },
];

const OrganisedEvents: React.FC<EventsPropsFromRedux> = ({
  currentUser,
  setCurrentEventId,
}) => {
  const [invitations, setInvitations] = useState<
    SectionedListData<OngoingEvent>[]
  >(deepClone(sections));

  const toastProvider = useToastProvider();
  const navigation = useNavigation();
  const { data, error, loading } = useQuery<GetOrganiserFoodDrives>(
    GET_FOOD_DRIVE_BY_USER_ID,
    {
      pollInterval: config.defaultPollInterval,
      variables: {
        getFoodDrivesUserId: currentUser?.id,
      },
    },
  );

  useEffect(() => {
    if (!loading && !error && data) {
      const ongoingEvents = deepClone(sections);

      data.getFoodDrives.forEach((event) => {
        const attendeeCount = getAttendeeCount(
          event.invitations,
          event.maxCapacity,
        );
        ongoingEvents[0].data.push({
          id: event.id,
          name: event.name,
          pending: attendeeCount.pending,
          claimsLeft: attendeeCount.claimsLeft,
          maxCapacity: event.maxCapacity,
        });
      });
      setInvitations(ongoingEvents);
    } else if (error) {
      toastProvider.showError(error.message);
    }
  }, [data, loading, error]);

  return (
    <View style={styles.eventList}>
      <SectionedList
        id="sectioned-list"
        data={invitations}
        renderItem={(invitation) => (
          <ListItem
            id={`${invitation.id}-list-item`}
            title={invitation.name}
            otherInformation={
              <View>
                <ProgressBar
                  id={`${invitation.id}-claims-left-bar`}
                  type="info"
                  label="Claims left"
                  curValue={invitation.claimsLeft}
                  maxValue={invitation.maxCapacity}
                />
                <Text style={styles.pendingText}>
                  {invitation.pending} pending invitations
                </Text>
              </View>
            }
            onPress={() => {
              setCurrentEventId(invitation.id);
              navigation.navigate(SCREEN_NAMES.events.eventProgress);
            }}
            iconColor={colors.success}
          />
        )}
      />
    </View>
  );
};

export default OrganisedEvents;

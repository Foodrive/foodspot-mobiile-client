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
import { colors } from "@app/utils";
import { InvitationStatus } from "@app/utils/constants";
import SCREEN_NAMES from "@app/navigation/screen.names";
import dayjs from "dayjs";
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

const initialSectionData = [
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
  >([
    {
      title: "Ongoing events",
      data: [],
    },
  ]);

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
      const ongoingEvents: SectionedListData<OngoingEvent>[] = [
        {
          title: "Ongoing events",
          data: [],
        },
      ];

      data.getFoodDrives.forEach((event) => {
        const startDate = dayjs(event.startDate);
        if (dayjs().isBefore(startDate)) {
          const pending = event.invitations.filter(
            (invitation) => invitation.status === InvitationStatus.pending,
          );
          const attendees = event.invitations.reduce(
            (totalAttendees, invitation) => {
              return (totalAttendees += invitation.numAttendees);
            },
            0,
          );

          const claimsLeft = event.maxCapacity - attendees;
          ongoingEvents[0].data.push({
            id: event.id,
            name: event.name,
            pending: pending.length,
            claimsLeft: claimsLeft,
            maxCapacity: event.maxCapacity,
          });
        }
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

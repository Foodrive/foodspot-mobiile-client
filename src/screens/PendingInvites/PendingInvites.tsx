import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LogBox, ScrollView, Text, View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { PendingInvitesPropsFromRedux } from "./container";
import { useQuery } from "@apollo/client";
import { GET_INVITATIONS_BY_EVENT } from "@app/graphql/queries";
import config from "@app/config";
import useToastProvider from "@app/hooks/useToastProvider";
import { ListItem, SectionedList } from "@app/components/ui";
import { InvitationStatus } from "@app/utils/constants";
import { colors, getAttendeeInfoFromEvent } from "@app/utils";
import { useStyles } from "./styles";
import { CapacityBar } from "@app/screens/EventProgress/CapacityBar";
import { SectionedListData } from "@app/components/ui/SectionedList";

interface PendingInvite {
  id: string;
  status: string;
  numAttendees: number;
  attendeeName: string;
}

const PendingInvites: React.FC<PendingInvitesPropsFromRedux> = ({
  eventId,
}) => {
  const navigation = useNavigation();
  const toastProvider = useToastProvider();
  const styles = useStyles();

  const { data, loading, error } = useQuery(GET_INVITATIONS_BY_EVENT, {
    pollInterval: config.defaultPollInterval,
    variables: {
      statusFilter: [InvitationStatus.pending],
      eventId,
    },
  });

  const [selectedInvites, setSelectedInvites] = useState<PendingInvite[]>([]);

  const totalSelected = useMemo(
    () =>
      selectedInvites.reduce((acc, item) => {
        return (acc += item.numAttendees);
      }, 0),
    [selectedInvites],
  );

  const invites = useMemo<SectionedListData<PendingInvite>[]>(() => {
    if (data) {
      const { getInvitations: results } = data;
      const invitations = results.map((res: any) => ({
        id: res.id,
        status: res.status,
        numAttendees: res.numAttendees,
        attendeeName: `${res.attendee.firstName} ${res.attendee.lastName}`,
      }));
      return [
        {
          title: "Pending Invites",
          data: invitations,
        },
      ];
    }
    return [
      {
        title: "Pending Invites",
        data: [],
      },
    ];
  }, [data]);

  const attendeeInfo = useMemo(() => {
    if (data) {
      const { getInvitations: results } = data;
      if (results.length > 0) {
        return getAttendeeInfoFromEvent(results[0].event);
      }
    } else {
      return undefined;
    }
  }, [data]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  });

  useEffect(() => {
    if (error) {
      toastProvider.showError(error.message);
    }
  }, [data, loading, error, toastProvider]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = useCallback(
    (inv: PendingInvite) => {
      const selectedIndex = selectedInvites.findIndex(
        (item) => item.id === inv.id,
      );
      const isSelected = selectedIndex > -1;
      const containerStyle = isSelected
        ? { backgroundColor: colors.success }
        : undefined;
      return (
        <ListItem
          id={`${inv.id}-list-item`}
          title={inv.attendeeName}
          iconName="person"
          iconColor={colors.darkBrown}
          showNav={false}
          otherInformation={
            <Text
              style={{
                color: isSelected ? colors.white : colors.dark,
                fontWeight: isSelected ? "bold" : "normal",
              }}
            >
              {inv.numAttendees} attendees
            </Text>
          }
          containerStyle={containerStyle}
          onPress={() => {
            const newSelected = [...selectedInvites];
            if (isSelected) {
              newSelected.splice(selectedIndex, 1);
            } else {
              newSelected.push(inv);
            }
            setSelectedInvites(newSelected);
          }}
        />
      );
    },
    [selectedInvites],
  );

  const acceptInvites = useCallback(() => {
    // @todo add logic for accepting invitations
  }, []);

  return (
    <ScrollView>
      <PageHeader
        id="pending-invites"
        title="Event Details"
        hasBack
        onBackPress={onBack}
      />
      <View style={styles.bodyContainer}>
        {attendeeInfo && (
          <CapacityBar
            valueText={`(${attendeeInfo.claimsLeft} - ${totalSelected} selected)`}
            value={attendeeInfo.claimsLeft - totalSelected}
            max={attendeeInfo.maxCapacity}
            hasMax={false}
          />
        )}
        <SectionedList
          id="invite-list"
          data={invites}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

export default PendingInvites;

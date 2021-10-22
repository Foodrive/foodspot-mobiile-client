import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { PendingInvitesPropsFromRedux } from "./container";
import { useQuery } from "@apollo/client";
import { GET_INVITATIONS_BY_EVENT } from "@app/graphql/queries";
import config from "@app/config";
import useToastProvider from "@app/hooks/useToastProvider";
import { SectionedList } from "@app/components/ui";
import { InvitationStatus } from "@app/utils/constants";
import { getAttendeeInfoFromEvent } from "@app/utils";
import { useStyles } from "./styles";
import { CapacityBar } from "@app/components/common/CapacityBar";
import { SectionedListData } from "@app/components/ui/SectionedList";
import { PendingItem } from "./PendingItem";

export interface PendingInvite {
  id: string;
  status: string;
  numAttendees: number;
  attendeeName: string;
}

const createSectionListData = (
  data: PendingInvite[],
): SectionedListData<PendingInvite>[] => {
  return [
    {
      title: "Pending Invites",
      data,
    },
  ];
};

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

  const [selectedInvites, setSelectedInvites] = useState<
    Record<string, PendingInvite>
  >({});

  const totalSelected = useMemo(
    () =>
      Object.values(selectedInvites).reduce((acc, item) => {
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
      return createSectionListData(invitations);
    }
    return createSectionListData([]);
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
    if (error) {
      toastProvider.showError(error.message);
    }
  }, [data, loading, error, toastProvider]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = useCallback(
    (inv: PendingInvite) => {
      const isSelected = selectedInvites[inv.id] !== undefined;
      return (
        <PendingItem
          isSelected={isSelected}
          invite={inv}
          onPress={() => {
            const newSelected = { ...selectedInvites };
            if (isSelected) {
              delete newSelected[inv.id];
            } else {
              newSelected[inv.id] = inv;
            }
            setSelectedInvites(newSelected);
          }}
        />
      );
    },
    [selectedInvites],
  );

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

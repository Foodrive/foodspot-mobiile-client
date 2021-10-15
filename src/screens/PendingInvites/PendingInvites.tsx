import React, { useCallback, useEffect, useMemo } from "react";
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
import { CapacityBar } from "@app/screens/EventProgress/CapacityBar";

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

  const invites = useMemo(() => {
    if (data) {
      const { getInvitations: results } = data;
      return results.map((res: any) => ({
        status: res.status,
        numAttendees: res.numAttendees,
        attendeeName: `${res.attendee.firstName} ${res.attendee.lastName}`,
      }));
    }
    return [];
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
            value={attendeeInfo.claimsLeft}
            max={attendeeInfo.maxCapacity}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PendingInvites;

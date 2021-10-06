import React, { useEffect, useMemo } from "react";
import {
  FoodDrive,
  GetFoodDrives,
  GetUserInvitation,
  GET_FOOD_DRIVES,
  GET_INVITATIONS_BY_USER,
} from "@app/graphql/queries";
import { useQuery } from "@apollo/client";
import { FlatList, Text, View } from "react-native";
import ListItem from "@app/components/ui/ListItem";
import useToastProvider from "@app/hooks/useToastProvider";
import { useStyles } from "./styles";
import { colors } from "@app/utils";
import { EventListPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { getDateInfo } from "@app/utils";
import config from "@app/config";

interface EventListProps extends EventListPropsFromRedux {
  search: string;
}

const EventList: React.FC<EventListProps> = ({
  setCurrentEventId,
  setCurrentInvitationId,
  currentUser,
  search,
}) => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery<GetFoodDrives>(GET_FOOD_DRIVES, {
    pollInterval: config.defaultPollInterval,
  });

  const {
    loading: loadingInvitation,
    error: invitationError,
    data: invitationData,
  } = useQuery<GetUserInvitation>(GET_INVITATIONS_BY_USER, {
    pollInterval: config.defaultPollInterval,
    variables: {
      getInvitationsUserId: currentUser?.id,
    },
  });

  const toastProvider = useToastProvider();
  const styles = useStyles();

  const currentUserRegisteredEvents = invitationData?.getInvitations.map(
    (invitation) => invitation.event.id,
  );
  //get food drives excluding current user's registered events
  const foodDrives = useMemo(
    () =>
      data?.getFoodDrives.filter((foodDrive) => {
        const yourEvent = currentUserRegisteredEvents?.find(
          (event) => event === foodDrive?.id,
        );

        return !yourEvent;
      }),
    [data?.getFoodDrives, currentUserRegisteredEvents],
  );

  useEffect(() => {
    if (error) {
      toastProvider.showError(error.message);
    } else if (invitationError) {
      toastProvider.showError(invitationError.message);
    }
  }, [error, invitationError, toastProvider]);

  if (loading || loadingInvitation) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <></>;
  }

  const renderItem = ({ item }: { item: FoodDrive }) => {
    const dateInfo = getDateInfo(item.startDate, item.endDate);
    const color = dateInfo.isToday ? colors.success : colors.lightbrown;
    return (
      <ListItem
        iconColor={color}
        key={`event-list-item-${item.id}`}
        id={`event-list-item-${item.id}`}
        style={{ marginVertical: 2 }}
        title={item.name}
        otherInformation={
          <View>
            <Text style={[styles.dateText, { color }]}>{dateInfo.dayText}</Text>
            <Text style={styles.timeText}>{dateInfo.timeText}</Text>
          </View>
        }
        onPress={() => {
          setCurrentEventId(item.id);
          setCurrentInvitationId(null);
          navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
        }}
      />
    );
  };

  return (
    <FlatList
      data={
        foodDrives?.filter((foodDrive) =>
          foodDrive.name.toLowerCase().includes(search.toLowerCase()),
        ) ?? []
      }
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default EventList;

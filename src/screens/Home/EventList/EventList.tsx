import React, { useCallback, useEffect } from "react";
import {
  FoodDrive,
  GetFoodDrives,
  GET_FOOD_DRIVES,
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

interface EventListProps extends EventListPropsFromRedux {
  search: string;
}

const EventList: React.FC<EventListProps> = ({
  setCurrentEventId,
  setCurrentInvitationId,
  search,
}) => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery<GetFoodDrives>(GET_FOOD_DRIVES);
  const toastProvider = useToastProvider();
  const styles = useStyles();

  useEffect(() => {
    if (error) {
      toastProvider.showError(error.message);
    }
  }, [error, toastProvider]);

  if (loading) {
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
        data?.getFoodDrives.filter((foodDrive) =>
          foodDrive.name.toLowerCase().includes(search.toLowerCase()),
        ) ?? []
      }
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default EventList;

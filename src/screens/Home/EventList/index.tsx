import React, { useCallback, useEffect, useState } from "react";
import { USER_FOOD_DRIVES } from "@app/graphql/queries";
import { useQuery } from "@apollo/client";
import { FlatList, Text, View } from "react-native";
import ListItem from "@app/components/ui/ListItem";
import useToastProvider from "@app/hooks/useToastProvider";
import { useStyles } from "./styles";
import { colors } from "@app/utils";
import { getDateInfo } from "@app/utils";

interface EventListProps {
  search: string;
}
const EventList: React.FC<EventListProps> = ({ search }) => {
  const { loading, error, data } = useQuery(USER_FOOD_DRIVES);
  const toastProvider = useToastProvider();
  const styles = useStyles();

  useEffect(() => {
    if (error) {
      toastProvider.showError(error.message);
    }
  }, [error, toastProvider]);

  const handleEventSelection = useCallback(() => {
    //   do somethin
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <></>;
  }

  const renderItem = ({ item }: any) => {
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
        onPress={handleEventSelection}
      />
    );
  };

  return (
    <FlatList
      data={data.getFoodDrives.filter((item: any) =>
        item.name.includes(search),
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default EventList;

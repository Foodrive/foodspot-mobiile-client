import React, { useCallback, useEffect, useState } from "react";
import { USER_FOOD_DRIVES } from "@app/graphql/queries";
import { useQuery } from "@apollo/client";
import { FlatList, Text, View } from "react-native";
import ListItem from "@app/components/ui/ListItem";
import dayjs from "dayjs";
import useToastProvider from "@app/hooks/useToastProvider";
import { useStyles } from "./styles";
import { colors } from "@app/utils";

interface DayInfo {
  dayText: string;
  timeText: string;
  isToday: boolean;
}

const EventList: React.FC = () => {
  const { loading, error, data } = useQuery(USER_FOOD_DRIVES);
  const toastProvider = useToastProvider();
  const styles = useStyles();

  const getDateInfo = useCallback(
    (startDate: string, endDate: string): DayInfo => {
      const now = dayjs();
      const start = dayjs(startDate);
      const end = dayjs(endDate);

      const startTime = start.format("hh:mm a");
      const endTime = end.format("hh:mm a");

      const result: DayInfo = {
        dayText: "",
        timeText: "",
        isToday: false,
      };

      if (start.isSame(end, "day")) {
        if (start.isSame(now, "day")) {
          result.isToday = true;
          result.dayText = "Today";
        } else if (start.isSame(now, "week")) {
          result.dayText = start.format("ddd");
        } else {
          result.dayText = start.format("DD MMMM");
        }
        result.timeText = `${startTime} - ${endTime}`;
      } else {
        let startDay = start.format("DD MMMM");
        const endDay = end.format("DD MMMM");
        if (start.isSame(now, "day")) {
          startDay = "Today";
          result.isToday = true;
        }
        result.dayText = `${startDay} ${startTime} -`;
        result.timeText = `${endDay} ${endTime}`;
      }
      return result;
    },
    [],
  );

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
      data={data.getFoodDrives}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default EventList;

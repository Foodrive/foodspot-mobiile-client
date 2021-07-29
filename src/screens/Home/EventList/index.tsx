import React, { useCallback } from "react";
import { USER_FOOD_DRIVES } from "@app/graphql/queries";
import { useQuery } from "@apollo/client";
import { Text } from "react-native";
import ListItem from "@app/components/ui/ListItem";
import { format } from "date-fns";
import styles from "./styles";

const EventList: React.FC = () => {
  const { loading, error, data } = useQuery(USER_FOOD_DRIVES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const getUserDate = (time: any): string => {
    return format(new Date(time), "EEEE dd MMMM");
  };

  const getUserTime = (time: any): string => {
    return format(new Date(time), "h:mm a");
  };

  const handleEventSelection = useCallback(() => {
    //   do somethin
  }, []);

  return data.getFoodDrives.map((listItem: any, index: number) => (
    <ListItem
      key={`event-list-item-${index}`}
      id={`event-list-item-${index}`}
      title={listItem.name}
      otherInformation={
        <>
          <Text style={styles.boldDate}>
            {getUserDate(listItem.startDate)},
          </Text>
          <Text> {getUserTime(listItem.startDate)}</Text>
        </>
      }
      onClick={handleEventSelection}
    />
  ));
};

export default EventList;

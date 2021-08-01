import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_FOOD_DRIVES } from "@app/graphql/queries/events.queries";
import SCREEN_NAMES from "@app/navigation/screen.names";
import styles from "./styles";
import { ListItem } from "@app/components/ui";
import { EventsPropsFromRedux } from "./container";

type EventsProps = EventsPropsFromRedux; // interface EventsProps extends EventsPropsFromRedux when needed

const Events: React.FC<EventsProps> = ({ setCurrentEventId }) => {
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(GET_FOOD_DRIVES);

  return (
    <View>
      <Text style={styles.text}>Event Screen</Text>
      <View>
        {!loading &&
          data.getFoodDrives.map((foodDrive) => (
            <ListItem
              id={`${foodDrive.id}-list-item`}
              key={`${foodDrive.id}-list-item`}
              title={foodDrive.name}
              otherInformation={foodDrive.description}
              onPress={() => {
                setCurrentEventId(foodDrive.id);
                navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default Events;

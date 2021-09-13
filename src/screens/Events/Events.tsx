import React, { useState } from "react";
import { View, Text } from "react-native";
import { EventsPropsFromRedux } from "./container";
import { useNavigation } from "@react-navigation/native";
import { IconButton, TabButtonGroup } from "@app/components/ui";
import SCREEN_NAMES from "@app/navigation/screen.names";
import styles from "./styles";
import YourEvents from "./YourEvents";
import OrganisedEvents from "./OrganisedEvents";

type EventsProps = EventsPropsFromRedux;
type Tabs = 0 | 1; //yours and organised
const Events: React.FC<EventsProps> = ({
  currentUser,
  setCurrentEventId,
  setCurrentInvitationId,
}) => {
  const [currTab, setCurrTab] = useState<Tabs>(0);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your events</Text>
        <IconButton
          id="create-button"
          icon="add"
          color="default"
          onPress={() =>
            navigation.navigate(SCREEN_NAMES.common.events.basicDetails)
          }
        />
      </View>
      <View style={styles.tabs}>
        <TabButtonGroup
          buttons={["Yours", "Organised"]}
          selectedIndex={currTab}
          onPress={(e) => setCurrTab(e)}
        />
      </View>
      {currTab === 0 ? (
        <YourEvents
          currentUser={currentUser}
          setCurrentEventId={setCurrentEventId}
          setCurrentInvitationId={setCurrentInvitationId}
        />
      ) : (
        <OrganisedEvents
          currentUser={currentUser}
          setCurrentEventId={setCurrentEventId}
          setCurrentInvitationId={setCurrentInvitationId}
        />
      )}
    </View>
  );
};

export default Events;

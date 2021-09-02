import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import SearchBar from "@app/components/ui/SearchBar";
import EventList from "./EventList";
import { IconButton } from "@app/components/ui";
import { useStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [search, setSearch] = useState<string>("");
  const styles = useStyles();
  const navigation = useNavigation();

  const updateSearch = useCallback(
    (search: string) => {
      setSearch(search);
    },
    [setSearch],
  );

  return (
    <View>
      <SearchBar
        id="search-bar-home"
        placeholder="Search by name..."
        onChangeText={updateSearch}
        value={search}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Food near you...</Text>
          </View>
          <IconButton
            id="create-button"
            icon="add"
            color="default"
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.common.events.basicDetails)
            }
          />
        </View>
        <EventList search={search} />
      </View>
    </View>
  );
};

export default HomeScreen;

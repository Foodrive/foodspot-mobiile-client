import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import SearchBar from "@app/components/ui/SearchBar";
import EventList from "./EventList";
import styles from "./styles";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [search, setSearch] = useState<string>("");

  const updateSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  return (
    <View>
      <>
        <SearchBar
          id="search-bar-home"
          placeholder="Search by location..."
          onChangeText={updateSearch}
          value={search}
        />
        <View style={styles.container}>
          <Text style={styles.titleText}>Food near you...</Text>
          <EventList />
        </View>
      </>
    </View>
  );
};

export default HomeScreen;

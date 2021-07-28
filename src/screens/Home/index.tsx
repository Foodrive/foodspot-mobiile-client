import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import SearchBar from "@app/components/ui/SearchBar";
import { IconButton } from "@app/components/ui";
import { useStyles } from "./styles";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [search, setSearch] = useState<string>("");
  const styles = useStyles();

  const updateSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  return (
    <View>
      <SearchBar
        id="search-bar-home"
        placeholder="Search by location..."
        onChangeText={updateSearch}
        value={search}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Food near you...</Text>
          </View>
          <IconButton id="create-button" icon="add" color="default" />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

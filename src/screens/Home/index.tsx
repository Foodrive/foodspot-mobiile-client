import React, { useCallback, useState } from "react";
import { View } from "react-native";
import SearchBar from "@app/components/ui/SearchBar";

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
      <SearchBar
        id="search-bar-home"
        placeholder="Search by location..."
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
};

export default HomeScreen;

import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import SearchBar from "@app/components/ui/SearchBar";

interface HomeScreenProps {
  appName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [search, setSearch] = useState<string>("");
  const updateSearch = (search: string) => {
    setSearch(search);
  };
  return (
    <View>
      <SearchBar
        id="search-bar-home"
        placeholder="Search by location..."
        onChangeText={updateSearch}
        value={search}
        platform="android"
      />
    </View>
  );
};

export default HomeScreen;

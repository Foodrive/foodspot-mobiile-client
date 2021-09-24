import React from "react";
import { ScrollView } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";

const EventProgress: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <PageHeader
        id="event-progress"
        title="Event Details"
        hasBack
        onBackPress={() => navigation.goBack()}
      />
    </ScrollView>
  );
};

export default EventProgress;

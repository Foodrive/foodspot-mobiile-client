import React from "react";
import { View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const BasicDetails: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <PageHeader
        id="basic-details"
        hasBack
        title="Event Details"
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default BasicDetails;

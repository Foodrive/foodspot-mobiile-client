import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { CreationSummaryReduxProps } from "./container";
import { EventInfoCard } from "@app/components/common/EventInfoCard";

type CreationSummaryProps = CreationSummaryReduxProps;

const CreationSummary: React.FC<CreationSummaryProps> = ({
  createData,
  pageTitle,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!createData) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <PageHeader
        id="creation-summary"
        title={pageTitle as string}
        hasBack
        onBackPress={onBack}
      />
      <EventInfoCard id="event-info-summary" event={createData} />
    </View>
  );
};

export default CreationSummary;

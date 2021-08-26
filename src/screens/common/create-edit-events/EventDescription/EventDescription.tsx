import React, { useCallback } from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import Card from "@app/components/ui/Card";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { FormInput, getErrorMessage } from "@app/components/forms";
import { EventDescriptionReduxProps } from "./container";
import Button from "@app/components/ui/Button";

type EventDescriptionProps = EventDescriptionReduxProps;

const EventDescription: React.FC<EventDescriptionProps> = ({
  updateCreateData,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      updateCreateData({
        name: data.eventName,
        description: data.eventDesc,
      });
    },
    [updateCreateData],
  );

  return (
    <View style={styles.container}>
      <PageHeader
        id="event-desc"
        hasBack
        title="Event Details"
        onBackPress={onBack}
      />
      <Card id="event-desc-form" title="Event Description">
        <FormInput
          name="eventName"
          label="Name"
          control={control}
          type="text"
          placeholder="Enter event name"
          rules={{ required: true }}
          errorMessage={getErrorMessage("Event Name", errors.eventName)}
        />
        <FormInput
          name="eventDesc"
          label="Description"
          control={control}
          type="text"
          placeholder="Enter event description"
          rules={{ required: true }}
          errorMessage={getErrorMessage("Event Description", errors.eventDesc)}
        />
      </Card>
      <Button
        color="secondary"
        id="login-btn"
        title="Next"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default EventDescription;

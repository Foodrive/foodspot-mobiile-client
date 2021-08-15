import React, { useCallback } from "react";
import { View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Card from "@app/components/ui/Card";
import { useForm } from "react-hook-form";
import {
  FormDateTimeInput,
  FormInput,
  FormTabSelect,
  getErrorMessage,
} from "@app/components/forms";
import Button from "@app/components/ui/Button";

const BasicDetails: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const eventTypes = [
    {
      displayText: "Food Drive",
      value: "FoodDrive",
    },
  ];

  const onSubmit = useCallback(async (data: Record<string, any>) => {
    console.log(data);
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader
        id="basic-details"
        hasBack
        title="Event Details"
        onBackPress={() => navigation.goBack()}
      />
      <Card id="basic-details-form" title="Basic Details">
        <FormTabSelect
          name="eventType"
          control={control}
          label="Event Type"
          options={eventTypes}
          color="primary"
          rules={{ required: true }}
          errorMessage={getErrorMessage("Event Type", errors.eventType)}
        />
        <FormInput
          name="location"
          control={control}
          type="location"
          label="Location"
          placeholder="Enter location details"
          rules={{ required: true }}
          errorMessage={getErrorMessage("Location", errors.location)}
        />
        <FormDateTimeInput
          name="startDate"
          control={control}
          label="Start Date"
          rules={{ required: true }}
          errorMessage={getErrorMessage("Start Date", errors.startDate)}
        />
        <FormDateTimeInput
          name="endDate"
          control={control}
          label="End Date"
          rules={{ required: true }}
          errorMessage={getErrorMessage("End Date", errors.endDate)}
        />
      </Card>
      <Button id="login-btn" title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default BasicDetails;

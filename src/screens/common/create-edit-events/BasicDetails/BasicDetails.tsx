import React, { useCallback } from "react";
import { View } from "react-native";
import { PageHeader } from "@app/components/common/PageHeader";
import { useStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Card from "@app/components/ui/Card";
import { useForm } from "react-hook-form";
import { FormTabSelect } from "@app/components/forms";
import Button from "@app/components/ui/Button";
import Input from "@app/components/ui/Input";
import { DateTimeInput } from "@app/components/ui/DateTimeInput";

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
        />
        <Input id="input" type="location" label="Location" />
        <DateTimeInput
          id="date-input"
          onChangeText={() => console.log()}
          label="Date"
        />
      </Card>
      <Button id="login-btn" title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default BasicDetails;

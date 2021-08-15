import React, { useCallback, useEffect, useMemo } from "react";
import { Text, View } from "react-native";
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
import { BasicDetailsReduxProps } from "./container";
import { EventType } from "@app/types/event.types";

type BasicDetailsProps = BasicDetailsReduxProps;

const BasicDetails: React.FC<BasicDetailsProps> = ({
  createData,
  initCreate,
  updateCreateData,
  resetCreateData,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const eventTypes = useMemo(
    () => [
      {
        displayText: "Food Drive",
        value: EventType.foodDrive,
      },
    ],
    [],
  );

  useEffect(() => {
    if (!createData) {
      initCreate(EventType.foodDrive);
    }
  }, [createData, initCreate]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      updateCreateData({
        type: data.eventType,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      console.log(data);
    },
    [updateCreateData],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
    resetCreateData();
  }, [navigation, resetCreateData]);

  // Initial values
  const selectedIndex = createData
    ? eventTypes.findIndex((item) => item.value === createData.type)
    : 0;

  return (
    <View style={styles.container}>
      <PageHeader
        id="basic-details"
        hasBack
        title="Event Details"
        onBackPress={onBack}
      />
      <Card id="basic-details-form" title="Basic Details">
        {!createData ? (
          <Text>Initialising...</Text>
        ) : (
          <>
            <FormTabSelect
              name="eventType"
              control={control}
              label="Event Type"
              options={eventTypes}
              color="primary"
              selectedIndex={selectedIndex}
              rules={{ required: true }}
              errorMessage={getErrorMessage("Event Type", errors.eventType)}
            />
            <FormInput
              name="location"
              control={control}
              type="location"
              label="Location"
              placeholder="Enter location details"
              value={createData ? createData.location : ""}
              rules={{ required: true }}
              errorMessage={getErrorMessage("Location", errors.location)}
            />
            <FormDateTimeInput
              name="startDate"
              control={control}
              label="Start Date"
              rules={{ required: true }}
              value={createData ? createData.startDate : ""}
              errorMessage={getErrorMessage("Start Date", errors.startDate)}
            />
            <FormDateTimeInput
              name="endDate"
              control={control}
              label="End Date"
              rules={{ required: true }}
              value={createData ? createData.endDate : ""}
              errorMessage={getErrorMessage("End Date", errors.endDate)}
            />
          </>
        )}
      </Card>
      <Button id="login-btn" title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default BasicDetails;

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
import {
  notBeforeDate,
  notInThePast,
  notAfterDate,
} from "@app/utils/validators";
import SCREEN_NAMES from "@app/navigation/screen.names";

type BasicDetailsProps = BasicDetailsReduxProps;

const eventTypes = [
  {
    displayText: "Food Drive",
    value: EventType.foodDrive,
  },
];

const BasicDetails: React.FC<BasicDetailsProps> = ({
  pageTitle,
  createData,
  initCreate,
  updateCreateData,
  resetCreateData,
  setCeEventFlowTitle,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (!createData) {
      initCreate(EventType.foodDrive);
    } else if (pageTitle === undefined) {
      setCeEventFlowTitle("Edit Event");
    }
  }, [createData, initCreate, pageTitle]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      updateCreateData({
        type: data.eventType,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      navigation.navigate(SCREEN_NAMES.common.events.ceEventDesc);
    },
    [updateCreateData, navigation],
  );

  const onBack = useCallback(() => {
    if (!pageTitle?.includes("Edit")) {
      resetCreateData();
    }
    navigation.goBack();
  }, [navigation, resetCreateData, pageTitle]);

  // Initial values
  const selectedIndex = createData
    ? eventTypes.findIndex((item) => item.value === createData.type)
    : 0;

  return (
    <View style={styles.container}>
      <PageHeader
        id="basic-details"
        hasBack
        title={pageTitle || "Edit Event"}
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
              rules={{
                required: true,
                validate: {
                  notInThePast: notInThePast(),
                  notAfterDate: notAfterDate(getValues, "endDate"),
                },
              }}
              value={createData ? createData.startDate : ""}
              errorMessage={getErrorMessage("Start Date", errors.startDate, [
                "the end date",
              ])}
            />
            <FormDateTimeInput
              name="endDate"
              control={control}
              label="End Date"
              rules={{
                required: true,
                validate: {
                  notInThePast: notInThePast(),
                  notBeforeDate: notBeforeDate(getValues, "startDate"),
                },
              }}
              value={createData ? createData.endDate : ""}
              errorMessage={getErrorMessage("End Date", errors.endDate, [
                "the start date",
              ])}
            />
          </>
        )}
      </Card>
      <Button
        color="secondary"
        id="submit-btn"
        title="Next"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default BasicDetails;

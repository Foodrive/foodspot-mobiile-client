import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import Card from "@app/components/ui/Card";
import { useForm } from "react-hook-form";
import { FormInput, FormTabSelect } from "@app/components/forms";
import { acceptanceType } from "@app/utils/constants";
import Button from "@app/components/ui/Button";
import { getErrorMessage } from "@app/components/forms";

const PlanningDetails: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const acceptanceOptions = useMemo(
    () =>
      Object.keys(acceptanceType).map((item) => ({
        displayText: item,
        value: item,
      })),
    [],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      console.log(data);
      // updateCreateData({
      //   name: data.eventName,
      //   description: data.eventDesc,
      //   allergens: data.allergens,
      // });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <PageHeader
        id="planning-details"
        title="Event Details"
        hasBack
        onBackPress={onBack}
      />
      <Card id="planning-details-form" title="Planning Details">
        <FormTabSelect
          color="primary"
          name="acceptanceType"
          control={control}
          label="Acceptance Behaviour"
          options={acceptanceOptions}
          rules={{ required: true }}
          errorMessage={getErrorMessage(
            "Acceptance Behaviour",
            errors.acceptanceType,
          )}
        />
        <FormInput
          name="maxCapacity"
          control={control}
          type="number"
          label="Max capacity"
          rules={{
            required: true,
            pattern: { value: /^\d+$/, message: "must be a whole number" },
          }}
          errorMessage={getErrorMessage("Max capacity", errors.maxCapacity)}
          placeholder="Max number of people"
        />
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

export default PlanningDetails;

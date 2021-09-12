import React, { useCallback, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useStyles } from "./styles";
import Card from "@app/components/ui/Card";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {
  FormCheckSelect,
  FormInput,
  getErrorMessage,
} from "@app/components/forms";
import { EventDescriptionReduxProps } from "./container";
import Button from "@app/components/ui/Button";
import { allergens } from "@app/utils/constants";
import SCREEN_NAMES from "@app/navigation/screen.names";

type EventDescriptionProps = EventDescriptionReduxProps;

const EventDescription: React.FC<EventDescriptionProps> = ({
  pageTitle,
  createData,
  updateCreateData,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const allergenOptions = useMemo(
    () => allergens.map((item) => ({ displayText: item, value: item })),
    [],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      updateCreateData({
        name: data.eventName,
        description: data.eventDesc,
        allergens: data.allergens,
      });
      navigation.navigate(SCREEN_NAMES.common.events.planningDetails);
    },
    [updateCreateData, navigation],
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <PageHeader
          id="event-desc"
          hasBack
          title={pageTitle || "Edit Event"}
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
            value={createData?.name ?? ""}
          />
          <FormInput
            name="eventDesc"
            label="Description"
            control={control}
            type="text"
            placeholder="Enter event description"
            rules={{ required: true }}
            value={createData?.description ?? ""}
            errorMessage={getErrorMessage(
              "Event Description",
              errors.eventDesc,
            )}
          />
          <FormCheckSelect
            label="Does your food contain the following?"
            name="allergens"
            control={control}
            options={allergenOptions}
            selectedOptions={createData?.allergens ?? []}
            errorMessage={getErrorMessage("Allergens", errors.allergens)}
          />
        </Card>
        <Button
          color="secondary"
          id="submit-btn"
          title="Next"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </View>
  );
};

export default EventDescription;

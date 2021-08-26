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
      <Card
        id="event-desc-form"
        title="Event Description"
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}
      >
        <ScrollView>
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
            rules={{ required: true }}
            errorMessage={getErrorMessage("Allergens", errors.allergens)}
          />
        </ScrollView>
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

export default EventDescription;

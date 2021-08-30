import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import Card from "@app/components/ui/Card";
import { RegisterEventPropsFromRedux } from "./container";
import { FormInput, getErrorMessage } from "@app/components/forms";
import { useForm } from "react-hook-form";
import Button from "@app/components/ui/Button";
import { useMutation } from "@apollo/client";
import {
  CreateInvitation,
  CREATE_INVITATION,
} from "@app/graphql/mutations/invitations.mutation";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { useNavigation } from "@react-navigation/native";

type RegisterEvent = RegisterEventPropsFromRedux;

const RegisterEvent: React.FC<RegisterEvent> = ({
  eventId,
  userId,
  username,
}) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [
    createInvitation,
    { data, error, loading },
  ] = useMutation<CreateInvitation>(CREATE_INVITATION);

  // TODO Make register event/create invitation work
  const onSubmit = useCallback(async (data) => {
    try {
      await createInvitation({
        variables: {
          createInvitationEventId: eventId,
          createInvitationUserId: userId,
          createInvitationNumAttendees: data.dependents,
        },
      });
      navigation.navigate(SCREEN_NAMES.common.events.eventDetails);
    } catch (e) {
      // Do nothing
    }
  }, []);

  return (
    // TODO Add header
    <View>
      <Card id="register-event-form" title="Register for Event">
        <ScrollView>
          <FormInput
            name="name"
            label="Name"
            control={control}
            type="user"
            autoFocus
            placeholder="Enter name"
            rules={{ required: false }}
            errorMessage={getErrorMessage("Name", errors.name)}
            value={username}
            disabled={true}
          />
          <FormInput
            name="dependents"
            label="Number of dependents"
            control={control}
            type="number"
            autoFocus
            placeholder="Enter number"
            rules={{ required: true }}
            errorMessage={getErrorMessage("Dependents", errors.dependents)}
          />
          <Button
            id="register-event-button"
            title="Register for event"
            color="primary"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
          />
        </ScrollView>
      </Card>
    </View>
  );
};

export default RegisterEvent;

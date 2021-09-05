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
import { PageHeader } from "@app/components/common/PageHeader";
import { IconButton } from "@app/components/ui";
import styles from "./styles";

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
    <ScrollView>
      <PageHeader
        id="event-details"
        hasBack
        title={"Event Details"}
        onBackPress={() => {
          navigation.goBack();
        }}
        actions={
          <IconButton
            id="share-icon-button"
            icon="share-social-outline"
            onPress={() => {
              console.log("share"); // TODO
            }}
            reverse={false}
          />
        }
        containerStyle={styles.headingContainer}
      />
      <View style={styles.contentContainer}>
        <Card id="register-event-form" title="Register for Event">
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
        </Card>
        <Button
          id="register-event-button"
          title="Register for event"
          color="primary"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterEvent;

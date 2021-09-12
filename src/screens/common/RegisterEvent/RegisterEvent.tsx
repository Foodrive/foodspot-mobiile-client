import React, { useCallback } from "react";
import { View, ScrollView, Text } from "react-native";
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
import styles from "./styles";
import { regexValidator } from "@app/utils/validators";

type RegisterEvent = RegisterEventPropsFromRedux;

const RegisterEvent: React.FC<RegisterEvent> = ({ eventId, userId }) => {
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
          createInvitationNumAttendees: parseInt(data.dependents),
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
        id="register-event"
        hasBack
        title={"Register for event"}
        onBackPress={() => {
          navigation.goBack();
        }}
        containerStyle={styles.headingContainer}
      />
      <View style={styles.contentContainer}>
        <Card id="register-event-form" title="Register for event">
          <FormInput
            name="dependents"
            label="Number of dependents"
            control={control}
            type="number"
            autoFocus
            placeholder="Enter number"
            rules={{ required: true, pattern: regexValidator.wholeNumber }}
            errorMessage={getErrorMessage("Dependents", errors.dependents)}
          />
          <View>
            <Text style={styles.disclaimer}>
              {`Important:
The number of attendants specified must be physically present at the event venue.
            `}
            </Text>
          </View>
        </Card>
        <Button
          id="register-event-button"
          title="Register"
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

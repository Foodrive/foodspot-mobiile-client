import React, { useCallback } from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { PageHeader } from "@app/components/common/PageHeader";
import { useNavigation } from "@react-navigation/native";
import Card from "@app/components/ui/Card";
import { FormInput } from "@app/components/forms";
import { useForm } from "react-hook-form";
import Button from "@app/components/ui/Button";
import { regexValidator } from "@app/utils/validators";
import { getErrorMessage } from "@app/components/forms";
import { ContactDetailsReduxProps } from "./container";
import SCREEN_NAMES from "@app/navigation/screen.names";

type ContactDetailsProps = ContactDetailsReduxProps;

const ContactDetails: React.FC<ContactDetailsProps> = ({
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

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      updateCreateData({
        contactNumber: data.contactNumber,
        email: data.email,
        facebookPage: data.facebookPage,
      });
      navigation.navigate(SCREEN_NAMES.common.events.ceSummary);
    },
    [updateCreateData, navigation],
  );

  return (
    <View style={styles.container}>
      <PageHeader
        id="contact-details"
        title={pageTitle || "Edit Event"}
        hasBack
        onBackPress={onBack}
      />
      <Card id="contact-details-form" title="Contact Details">
        <FormInput
          name="contactNumber"
          control={control}
          label="Contact number*"
          type="number"
          rules={{ required: true }}
          errorMessage={getErrorMessage("Contact number", errors.contactNumber)}
          value={createData?.contactNumber}
          placeholder="Enter phone number"
        />
        <FormInput
          name="email"
          control={control}
          type="email"
          label="Email*"
          rules={{ required: true, pattern: regexValidator.email }}
          errorMessage={getErrorMessage("Email", errors.email)}
          value={createData?.email}
          placeholder="Enter contact email"
        />
        <FormInput
          name="facebookPage"
          control={control}
          type="user"
          label="Facebook page"
          errorMessage={getErrorMessage("Facebook page", errors.facebookPage)}
          value={createData?.facebookPage}
          placeholder="Enter facebook page"
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

export default ContactDetails;

import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  FormCheckSelect,
  FormInput,
  getErrorMessage,
} from "@app/components/forms";
import { useForm } from "react-hook-form";
import IconButton from "@app/components/ui/IconButton";
import Card from "@app/components/ui/Card";
import Button from "@app/components/ui/Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";
import { allergens } from "@app/utils/constants";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@app/graphql/queries/user.queries";
import { UPDATE_USER } from "@app/graphql/mutations/user.mutation";
import useToastProvider from "@app/hooks/useToastProvider";
import { regexValidator } from "@app/utils/validators";
import { User } from "@app/utils/types";
import { PageHeader } from "@app/components/common/PageHeader";
import { ProfilePropsFromRedux } from "./container";
import styles from "./styles";

type ProfileProps = ProfilePropsFromRedux;

const DUMMY_PASSWORD = "****";

const allergenOptions = allergens.map((item) => ({
  displayText: item,
  value: item,
}));

const UserProfile: React.FC<ProfileProps> = ({ currentUser }) => {
  const [
    updateUser,
    { error: updateError, loading: updateLoading, data: updateData },
  ] = useMutation(UPDATE_USER);

  const {
    error: queryError,
    loading: queryLoading,
    data: queryData,
  } = useQuery(GET_USER, {
    variables: {
      getUserUsername: currentUser?.username,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const toastProvider = useToastProvider();
  const navigation = useNavigation();

  const [editable, setEditable] = useState(false);

  const handleLogout = useCallback(async () => {
    await SecureStore.deleteItem(SecureStoreEnum.TOKEN);
    await SecureStore.deleteItem(SecureStoreEnum.USER_INFO);
    const resetHistory = CommonActions.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.common.login }],
    });
    navigation.dispatch(resetHistory);
  }, [navigation]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.password === DUMMY_PASSWORD) {
          data.password = "";
        }
        await updateUser({
          variables: {
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            phoneNumber: data.phoneNumber,
            email: data.email,
            allergies: data.allergies,
          },
        });
      } catch (e) {
        // Do nothing
      }
    },
    [updateUser],
  );

  const setFormValue = useCallback(
    (user: User) => {
      for (const key of Object.keys(user)) {
        const value = user[key as keyof User];
        setValue(key, value);
      }
    },
    [setValue],
  );

  useEffect(() => {
    if (queryError) {
      toastProvider.showError(queryError.message);
    } else if (queryData) {
      const { getUser } = queryData;
      const newUser: User = {
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        phoneNumber: getUser.phoneNumber,
        email: getUser.email,
        allergies: getUser.allergies,
        password: DUMMY_PASSWORD,
      };
      setFormValue(newUser);
    }
  }, [queryData, queryError, toastProvider]);

  useEffect(() => {
    if (updateError) {
      toastProvider.showError(updateError.message);
    } else if (updateData) {
      toastProvider.showSuccess("Successfully updated user information.");
      const { updateUser } = updateData;
      const newUser: User = {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        phoneNumber: updateUser.phoneNumber,
        email: updateUser.email,
        allergies: updateUser.allergies,
        password: DUMMY_PASSWORD,
      };
      setFormValue(newUser);
    }
  }, [updateData, updateError, toastProvider]);

  return (
    <ScrollView style={styles.container}>
      <PageHeader
        id="user-settings-header"
        title="User Settings"
        actions={
          <>
            <IconButton
              icon="create-outline"
              reverse={false}
              onPress={() => setEditable(!editable)}
              color={editable ? "primary" : "default"}
            />
          </>
        }
      />
      <Card id="user-profile-form" title="Your Profile">
        {queryLoading ? (
          <Text>Loading data...</Text>
        ) : (
          <>
            <FormInput
              name="firstName"
              label="First Name"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter first name"
              rules={{ required: true }}
              disabled={!editable}
              errorMessage={getErrorMessage("First Name", errors.FirstName)}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter last name"
              rules={{ required: true }}
              disabled={!editable}
              errorMessage={getErrorMessage("Last Name", errors.lastName)}
            />
            <FormInput
              name="phoneNumber"
              label="Contact Number"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter contact number"
              rules={{ required: true }}
              disabled={!editable}
              errorMessage={getErrorMessage(
                "Contact Number",
                errors.phoneNumber,
              )}
            />
            <FormInput
              name="password"
              label="Password"
              control={control}
              type="password"
              autoFocus
              placeholder="Enter Password"
              disabled={!editable}
              errorMessage={getErrorMessage("Password", errors.password)}
            />
            <FormInput
              name="email"
              label="Email"
              control={control}
              type="email"
              autoFocus
              placeholder="Enter Email"
              disabled={!editable}
              rules={{ required: true, pattern: regexValidator.email }}
              errorMessage={getErrorMessage("Email", errors.email)}
            />
            <FormCheckSelect
              label="Allergies"
              name="allergies"
              control={control}
              options={allergenOptions}
              rules={{ required: true }}
              disabled={!editable}
              errorMessage={getErrorMessage("Allergies", errors.allergies)}
            />
          </>
        )}
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          id="save-button"
          title="Save"
          color="secondary"
          onPress={handleSubmit(onSubmit)}
          loading={updateLoading}
          disabled={updateLoading}
          containerStyle={styles.saveButton}
        />
        <Button id="logout-button" title="Log out" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default UserProfile;

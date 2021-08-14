import React, { useCallback, useEffect } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useStyles } from "./styles";
import Card from "@app/components/ui/Card";
import { FormInput, getErrorMessage } from "@app/components/forms";
import { useForm } from "react-hook-form";
import Button from "@app/components/ui/Button";
import { IconButton } from "@app/components/ui";
import { useNavigation, CommonActions } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "@app/graphql/mutations";
import useToastProvider from "@app/hooks/useToastProvider";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";
import { RegisterPropsFromRedux } from "./container";

type RegisterScreenProps = RegisterPropsFromRedux; // interface RegisterScreen Props extends RegisterPropsFromRedux when needed

const RegisterScreen: React.FC<RegisterScreenProps> = ({ setCurrentUser }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const styles = useStyles();
  const navigation = useNavigation();
  const [signUp, { data: gqlData, error, loading }] = useMutation(SIGNUP);
  const toastProvider = useToastProvider();

  const navigateToHome = useCallback(() => {
    const toAppHome = CommonActions.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.common.app }],
    });
    navigation.dispatch(toAppHome);
  }, [navigation]);

  useEffect(() => {
    if (!loading && !error && gqlData) {
      const { signup } = gqlData;
      (async () =>
        // set access token
        await SecureStore.setItem(SecureStoreEnum.TOKEN, signup.accessToken))();
      setCurrentUser({ username: signup.user.username, id: signup.user.id });
      navigateToHome();
    } else if (error) {
      (async () => {
        await SecureStore.deleteItem(SecureStoreEnum.TOKEN).catch();
        await SecureStore.deleteItem(SecureStoreEnum.USER_INFO).catch();
      })();
      toastProvider.showError(error.message);
    }
  }, [loading, error, gqlData, toastProvider, navigateToHome]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        await signUp({
          variables: {
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        });
      } catch (e) {
        // Do nothing
      }
    },
    [signUp],
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@assets/images/background.png")}
        style={styles.background}
      >
        <View style={styles.backButton}>
          <IconButton
            id="back-icon-button"
            icon="chevron-back-outline"
            onPress={() => navigation.goBack()}
          />
        </View>
        <Card id="register-form" containerStyle={styles.card}>
          <ScrollView>
            <Text style={styles.headerText}>Create account</Text>
            <FormInput
              name="username"
              label="Username"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter username"
              rules={{ required: true }}
              errorMessage={getErrorMessage("Username", errors.username)}
            />
            <FormInput
              name="firstName"
              label="First name"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter first name"
              rules={{ required: true }}
              errorMessage={getErrorMessage("First name", errors.firstName)}
            />
            <FormInput
              name="lastName"
              label="Last name"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter last name"
              rules={{ required: true }}
              errorMessage={getErrorMessage("Last name", errors.lastName)}
            />
            <FormInput
              name="password"
              label="Password"
              control={control}
              type="password"
              autoFocus
              placeholder="Enter password"
              rules={{ required: true }}
              errorMessage={getErrorMessage("Password", errors.password)}
            />
            <Button
              id="confirm-button"
              title="Sign up"
              color="primary"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
            />
          </ScrollView>
        </Card>
      </ImageBackground>
    </View>
  );
};
export default RegisterScreen;

import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useStyles } from "./styles";
import { Logo } from "@app/components/common/Logo";
import Card from "@app/components/ui/Card";
import Button from "@app/components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { useForm } from "react-hook-form";
import { FormInput, getErrorMessage } from "@app/components/forms";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@app/graphql/mutations";
import useToastProvider from "@app/hooks/useToastProvider";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";

const LoginScreen: React.FC = () => {
  const [hasKeyboard, setHasKeyboard] = useState(false);
  const styles = useStyles({ hasKeyboard });
  const [login, { data: loginData, error, loading }] = useMutation(LOGIN);
  const toastProvider = useToastProvider();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Need to adjust position of card so it doesn't block screen
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () =>
      setHasKeyboard(true),
    );
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () =>
      setHasKeyboard(false),
    );

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, [setHasKeyboard]);

  useEffect(() => {
    if (!loading && !error && loginData) {
      (async () =>
        // set access token
        await SecureStore.setItem(
          SecureStoreEnum.TOKEN,
          loginData.login.accessToken,
        ))();
      navigation.navigate(SCREEN_NAMES.common.app, {
        screen: SCREEN_NAMES.app.home,
      });
    } else if (error) {
      (async () =>
        await SecureStore.deleteItem(SecureStoreEnum.TOKEN).catch())();
      toastProvider.showError(error.message);
    }
  }, [loading, error, loginData, toastProvider]);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItem(SecureStoreEnum.TOKEN);
      if (token) {
        navigation.navigate(SCREEN_NAMES.common.app, {
          screen: SCREEN_NAMES.app.home,
        });
      }
    })();
  }, [navigation]);

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      try {
        await login({
          variables: { username: data.username, password: data.password },
        });
      } catch (e) {
        // Do nothing
      }
    },
    [navigation, login],
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@assets/images/background.png")}
        style={styles.background}
      >
        <View style={styles.content}>
          <View style={styles.logo}>
            <Logo size={Dimensions.get("window").width / 2} />
            <Text style={styles.logoText}>FoodSpot</Text>
          </View>
        </View>
      </ImageBackground>
      <KeyboardAvoidingView style={styles.cardContainer}>
        <Card id="login-card" containerStyle={styles.card}>
          <FormInput
            name="username"
            control={control}
            type="user"
            label="Username"
            placeholder="Enter username"
            rules={{ required: true }}
            errorMessage={getErrorMessage("Username", errors.username)}
          />
          <FormInput
            name="password"
            control={control}
            type="password"
            label="Password"
            placeholder="Enter password"
            rules={{ required: true }}
            errorMessage={getErrorMessage("Password", errors.password)}
          />
          <Button
            id="login-btn"
            title="Login"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
          />
          <Button
            id="register-btn"
            title="Register"
            type="clear"
            color="secondary"
            containerStyle={styles.registerButton}
            disabled={loading}
          />
        </Card>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

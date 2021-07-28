import React, { useCallback } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useStyles } from "./styles";
import Card from "@app/components/ui/Card";
import { FormInput, getErrorMessage } from "@app/components/forms";
import { useForm } from "react-hook-form";
import Button from "@app/components/ui/Button";
import { IconButton } from "@app/components/ui";
import { useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";

const RegisterScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const styles = useStyles();
  const navigation = useNavigation();

  const onSubmit = useCallback(
    (data) => {
      navigation.navigate(SCREEN_NAMES.common.app, {
        screen: SCREEN_NAMES.app.home,
      });
    },
    [navigation],
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
            />
          </ScrollView>
        </Card>
      </ImageBackground>
    </View>
  );
};
export default RegisterScreen;

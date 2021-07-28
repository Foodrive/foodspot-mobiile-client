import React from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useStyles } from "./styles";
import Card from "@app/components/ui/Card";
import { FormInput } from "@app/components/forms";
import { useForm } from "react-hook-form";
import Button from "@app/components/ui/Button";
import { IconButton } from "@app/components/ui";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen: React.FC = () => {
  const { control } = useForm();
  const styles = useStyles();
  const navigation = useNavigation();

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
            />
            <FormInput
              name="firstName"
              label="First name"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter first name"
            />
            <FormInput
              name="lastName"
              label="Last name"
              control={control}
              type="user"
              autoFocus
              placeholder="Enter last name"
            />
            <FormInput
              name="password"
              label="Password"
              control={control}
              type="password"
              autoFocus
              placeholder="Enter password"
            />
            <Button id="confirm-button" title="Sign up" color="primary" />
          </ScrollView>
        </Card>
      </ImageBackground>
    </View>
  );
};
export default RegisterScreen;

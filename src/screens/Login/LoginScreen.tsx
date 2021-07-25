import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { useStyles } from "./styles";
import { Logo } from "@app/components/common/Logo";
import Card from "@app/components/ui/Card";
import Input from "@app/components/ui/Input";
import Button from "@app/components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";

const LoginScreen: React.FC = () => {
  const [hasKeyboard, setHasKeyboard] = useState(false);
  const styles = useStyles({ hasKeyboard });
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
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
      <KeyboardAvoidingView
        style={styles.cardContainer}
      >
        <Card id="login-card" containerStyle={styles.card}>
          <Input
            id="username"
            type="user"
            label="Username"
            placeholder="Enter username"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password"
          />
          <Button
            id="login-button"
            title="Login"
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.common.app, {
                screen: SCREEN_NAMES.app.home,
              })
            }
          />
        </Card>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

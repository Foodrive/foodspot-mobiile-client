import React, { useCallback } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Button from "@app/components/ui/Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";

const UserProfile: React.FC = () => {
  const navigation = useNavigation();
  const handleLogout = useCallback(async () => {
    await SecureStore.deleteItem(SecureStoreEnum.TOKEN);
    await SecureStore.deleteItem(SecureStoreEnum.USER_INFO);

    const resetHistory = CommonActions.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.common.login }],
    });
    navigation.dispatch(resetHistory);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button id="logout-button" title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default UserProfile;

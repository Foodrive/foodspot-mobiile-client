import React, { useCallback, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Input from "@app/components/ui/Input";
import CheckboxItem from "@app/components/ui/CheckBoxItem";
import IconButton from "@app/components/ui/IconButton";
import styles from "./styles";
import Button from "@app/components/ui/Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";
import { Divider } from "react-native-elements";


const UserProfile: React.FC = () => {
  const navigation = useNavigation();
  const [editable, setEditable] = useState(true);
  const handleLogout = useCallback(async () => {
    await SecureStore.deleteItem(SecureStoreEnum.TOKEN);
    const resetHistory = CommonActions.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.common.login }],
    });
    navigation.dispatch(resetHistory);
  }, [navigation]);

  const handleEditIconPress = () => {
    setEditable(!editable);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backButton}>
        <IconButton
          id="back-icon-button"
          icon="chevron-back-outline"
          onPress={() => navigation.navigate(SCREEN_NAMES.app.home)}
        />
      </View>
      <Text style={styles.title}>User Settings</Text>
      <View style={styles.editButton}>
        <IconButton icon="create-outline" reverse={false} onPress={handleEditIconPress} /> 
      </View>
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Your Profile</Text>
        <Divider orientation="horizontal" width={1} color={"#d9d9d9"} style={styles.divider} />   
        <Text style={styles.inputTitle}>Name</Text>
        <Input id="user-profile-input-name" type="user" editable={editable} />
        <Text style={styles.inputTitle}>Contact Number</Text>
        <Input id="user-profile-number-name" type="number" editable={editable} />
        <Text style={styles.inputTitle}>Email</Text>
        <Input id="user-profile-email-name" type="email" editable={editable} />
        <Text style={styles.inputTitle}>Allergies</Text>
        <View style={styles.allergyList}>
          <CheckboxItem id="user-allergy-checkbox-milk" title="Milk" />
          <CheckboxItem id="user-allergy-checkbox-egg" title="Egg" />
          <CheckboxItem id="user-allergy-checkbox-nuts" title="Nuts" />
          <CheckboxItem id="user-allergy-checkbox-lupin" title="Lupin" />
          <CheckboxItem id="user-allergy-checkbox-fish" title="Fish" />
          <CheckboxItem id="user-allergy-checkbox-wheat" title="Wheat" />
          <CheckboxItem id="user-allergy-checkbox-soy" title="Soy" />
          <CheckboxItem id="user-allergy-checkbox-sesame" title="Sesame" />
        </View>
      </View>
      <Button id="logout-button" title="Log out" onPress={handleLogout} /> 
    </ScrollView>
  );
};

export default UserProfile;
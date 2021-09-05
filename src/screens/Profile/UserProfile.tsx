import React, { useCallback, useState, useEffect } from "react";
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
import { Allergies } from "../../utils/constants";
import { ProfilePropsFromRedux } from "./container";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@app/graphql/queries/user.queries";
import useToastProvider from "@app/hooks/useToastProvider";

type ProfileProps = ProfilePropsFromRedux;

const UserProfile: React.FC<ProfileProps> = ({
  currentUser
}) => {

  console.log("current user:", currentUser)

  const { error, loading, data} = useQuery(GET_USER, {
    variables: {
      getUserUsername: currentUser?.username
    }
  });
  const [user, setUser] = useState();
  const toastProvider = useToastProvider();
  const navigation = useNavigation();
  const [editable, setEditable] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(Allergies.length).fill(false));
  const handleLogout = useCallback(async () => {
    await SecureStore.deleteItem(SecureStoreEnum.TOKEN);
    const resetHistory = CommonActions.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.common.login }],
    });
    navigation.dispatch(resetHistory);
  }, [navigation]);

  const handleCheckboxIconPress = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => 
      index === position ? !item : item);
    setCheckedState(updatedCheckedState);
    console.log("type", typeof updatedCheckedState);
    console.log(updatedCheckedState);
  };

  const handleEditIconPress = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    console.log("use effect triggered");
    console.log(data);  //TO DO why is this undefined?
    if (data && !loading && !error) {
      setUser(data);
    } else if (error){
      console.log("error found!")
      toastProvider.showError(error.message);
    }
  }, [data]);

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
        <IconButton icon="create-outline" reverse={false} onPress={handleEditIconPress} color={editable ? "primary" : "default"}  /> 
      </View>
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Your Profile</Text>
        <Divider orientation="horizontal" width={1} color={"#d9d9d9"} style={styles.divider} />   
        <Text style={styles.inputTitle}>Name</Text>
        <Input id="user-profile-input-name" type="user" editable={editable}>{user?.getUser.firstName + " " + user?.getUser.lastName}</Input>
        <Text style={styles.inputTitle}>Contact Number</Text>
        <Input id="user-profile-number-name" type="number" editable={editable}>{user?.getUser.phoneNumber}</Input>
        <Text style={styles.inputTitle}>Email</Text>
        <Input id="user-profile-email-name" type="email" editable={editable}>{user?.getUser.email}</Input>
        <Text style={styles.inputTitle}>Allergies</Text>
        <View style={styles.allergyList}>
          {Allergies.map(({name}, index) => {
            return(
              <CheckboxItem key={index} id={`user-allergy-checkbox-${name}`} title={name} checked={checkedState[index]} onPress={() => handleCheckboxIconPress(index)} />
            );
          })}
        </View>
        <Button id="logout-button" title="Log out" onPress={handleLogout} /> 
      </View>
    </ScrollView>
  );
};

export default UserProfile;
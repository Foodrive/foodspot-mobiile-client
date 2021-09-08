import React, { useCallback, useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import Input from "@app/components/ui/Input";
import { FormInput, FormCheckSelect ,getErrorMessage } from "@app/components/forms";
import { useForm } from "react-hook-form";
import CheckboxItem from "@app/components/ui/CheckBoxItem";
import IconButton from "@app/components/ui/IconButton";
import styles from "./styles";
import Button from "@app/components/ui/Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import SCREEN_NAMES from "@app/navigation/screen.names";
import SecureStore, { SecureStoreEnum } from "@app/services/secure.store";
import { Divider } from "react-native-elements";
import { Allergies } from "../../utils/constants";
import { allergens } from "@app/utils/constants";
import { ProfilePropsFromRedux } from "./container";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "@app/graphql/queries/user.queries";
import { UPDATE_USER } from "@app/graphql/mutations/user.mutation";
import useToastProvider from "@app/hooks/useToastProvider";
import { regexValidator } from "@app/utils/validators";

type ProfileProps = ProfilePropsFromRedux;

const UserProfile: React.FC<ProfileProps> = ({
  currentUser,
}) => {

  console.log("current user:", currentUser)

  const [updateUser, { error, loading, data: gqlData }] = useMutation(UPDATE_USER);

  const { queryError, queryLoading, data : queryData} = useQuery(GET_USER, {
    variables: {
      getUserUsername: currentUser?.username
    }
  });


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const allergenOptions = useMemo(
    () => allergens.map((item) => ({ displayText: item, value: item })),
    [],
  );
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

  const onSubmit = useCallback(
    async (data) => {
      try {
        await updateUser({
          variables: {
            password: data.password,
            phoneNumber: data.contactNumber,
            email: data.email,
            allergies: data.allergies,
            firstName: data.firstName,
            lastName: data.lastName
          }
        })
      } catch (e) {
        // Do nothing
      }
    },
    [updateUser]
  );
  
  const handleEditIconPress = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    console.log("use effect triggered");
    console.log(queryData);  //TO DO why is this undefined?
    if (queryData && !queryLoading && !queryError) {
      setUser(queryData);
    } else if (queryError){
      console.log("error found!")
      toastProvider.showError(queryError.message);
    }
  }, [queryData]);

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
        <IconButton icon="create-outline" reverse={false} onPress={handleSubmit(onSubmit)} color={editable ? "primary" : "default"}  /> 
      </View>
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Your Profile</Text>
        <Divider orientation="horizontal" width={1} color={"#d9d9d9"} style={styles.divider} />   
        <FormInput 
          name="name"
          label="Name"
          control={control}
          type="user"
          autoFocus
          placeholder={user?.getUser.firstName + " " + user?.getUser.lastName}
          rules={{required: true}}
          errorMessage={getErrorMessage("Name", errors.name)}
          // defaultValue={user?.getUser.firstName + user?.getUser.lastName}
          // value={user?.getUser.firstName + " " + user?.getUser.lastName}
        />
        <FormInput 
          name="contactNumber"
          label="Contact Number"
          control={control}
          type="number"
          autoFocus
          placeholder="Enter Contact Number"
          errorMessage={getErrorMessage("Contact Number", errors.contactNumber)}
        />
        <FormInput 
          name="email"
          label="Email"
          control={control}
          type="email"
          autoFocus
          placeholder="Enter Email"
          rules={{required: true, pattern: regexValidator.email}}
          errorMessage={getErrorMessage("Email", errors.email)}
        />
        <Text style={styles.inputTitle}>Allergies</Text>
        <View style={styles.allergyList}>
          {Allergies.map(({name}, index) => {
            return(
              <CheckboxItem key={index} id={`user-allergy-checkbox-${name}`} title={name} checked={checkedState[index]} onPress={() => handleCheckboxIconPress(index)} />
            );
          })}
        </View>
        <Button 
          id="save-button"
          title="Save"
          color="secondary"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        />
        <Button id="logout-button" title="Log out" onPress={handleLogout} /> 
      </View>
    </ScrollView>
  );
};

export default UserProfile;
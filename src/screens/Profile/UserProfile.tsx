import React, { useCallback, useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { FormInput, getErrorMessage } from "@app/components/forms";
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
import { User } from "@app/utils/types";

type ProfileProps = ProfilePropsFromRedux;

const DUMMY_PASSWORD = "****";

const UserProfile: React.FC<ProfileProps> = ({
  currentUser,
}) => {

  const [updateUser, { error: updateError, loading: updateLoading, data: updateData }] = useMutation(UPDATE_USER);

  const { error: queryError, loading: queryLoading, data : queryData} = useQuery(GET_USER, {
    variables: {
      getUserUsername: currentUser?.username
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const allergenOptions = useMemo(
    () => allergens.map((item) => ({ displayText: item, value: item })),
    [],
  );
  const [user, setUser] = useState<User | undefined>(undefined);
  const toastProvider = useToastProvider();
  const navigation = useNavigation();

  const [editable, setEditable] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(Allergies.length).fill(false));

  const handleLogout = useCallback(async () => {
    await SecureStore.deleteItem(SecureStoreEnum.TOKEN);
    await SecureStore.deleteItem(SecureStoreEnum.USER_INFO);
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
    // console.log("type", typeof updatedCheckedState);
    // console.log(updatedCheckedState);
  };

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.password === DUMMY_PASSWORD) {
          data.password = undefined;
        }
        await updateUser({
          variables: {
            password: data.password,
            phoneNumber: data.phoneNumber,
            email: data.email,
            allergies: [],
            firstName: data.firstName,
            lastName: data.lastName
          }
        });
      } catch (e) {
        // Do nothing
      }
    },
    [updateUser],
  );
  
  const handleEditIconPress = () => {
    setEditable(!editable);
  };

  const setFormValue = useCallback((user: User) => {
    for (const key of Object.keys(user)) {
      setValue(key, user[key as keyof User], { shouldDirty: false });
    }
  }, [setValue]);

  useEffect(() => {
    if (queryData && !queryLoading && !queryError) {
      const { getUser } = queryData;
      const newUser: User = {
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        phoneNumber: getUser.phoneNumber,
        email: getUser.email,
        allergies: getUser.allergies,
        password: DUMMY_PASSWORD
      };
      setFormValue(newUser);
      setUser(newUser);
    } else if (queryError){
      toastProvider.showError(queryError.message);
    }
  }, [queryData, queryLoading, queryError, setUser, setFormValue]);

  useEffect(() => {
    if (updateData && !updateLoading && !updateLoading) {
      const { updateUser } = queryData;

      const newUser: User = {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        phoneNumber: updateUser.phoneNumber,
        email: updateUser.email,
        allergies: updateUser.allergies,
        password: DUMMY_PASSWORD
      };
      setFormValue(newUser);
      setUser(newUser);
    } else if (updateError){
      console.log(updateError.message);
      toastProvider.showError(updateError.message);
    }
  }, [updateData, updateLoading, updateError, setUser, setFormValue]);

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
       {/* TO DO update to use card component replace view*/}
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Your Profile</Text>
        <Divider orientation="horizontal" width={1} color={"#d9d9d9"} style={styles.divider} />   
        <FormInput 
          name="firstName"
          label="First Name"
          control={control}
          type="user"
          autoFocus
          placeholder={user ? user?.firstName : "Enter first name"}
          rules={{required: true}}
          errorMessage={getErrorMessage("First Name", errors.FirstName)}
          defaultValue={user?.firstName}
          value={user?.firstName}
        />
        <FormInput 
          name="lastName"
          label="Last Name"
          control={control}
          type="user"
          autoFocus
          placeholder="Enter last name"
          rules={{required: true}}
          errorMessage={getErrorMessage("Last Name", errors.lastName)}
          value={user?.lastName}
        />
        <FormInput 
          name="phoneNumber"
          label="Contact Number"
          control={control}
          type="user"
          autoFocus
          placeholder="Enter contact number"
          rules={{required: true}}
          errorMessage={getErrorMessage("Contact Number", errors.phoneNumber)}
          value={user?.phoneNumber}
        />
        <FormInput 
          name="password"
          label="Password"
          control={control}
          type="password"
          autoFocus
          placeholder="Enter Password"
          errorMessage={getErrorMessage("Password", errors.password)}
          value={user?.password}
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
          value={user?.email}
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
          loading={updateLoading || queryLoading}
          disabled={updateLoading || queryLoading}
        />
        <Button id="logout-button" title="Log out" onPress={handleLogout} /> 
      </View>
    </ScrollView>
  );
};

export default UserProfile;
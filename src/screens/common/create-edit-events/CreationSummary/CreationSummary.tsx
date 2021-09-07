import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { PageHeader } from "@app/components/common/PageHeader";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { CreationSummaryReduxProps } from "./container";
import { EventInfoCard } from "@app/components/common/EventInfoCard";
import SCREEN_NAMES from "@app/navigation/screen.names";
import { useMutation } from "@apollo/client";
import { CREATE_FOOD_DRIVE } from "@app/graphql/mutations/events.mutation";
import useToastProvider from "@app/hooks/useToastProvider";
import { createLocationFromAddress, createFoodItem } from "@app/utils";
import Button from "@app/components/ui/Button";

type CreationSummaryProps = CreationSummaryReduxProps;

const CreationSummary: React.FC<CreationSummaryProps> = ({
  createData,
  pageTitle,
  currentUser,
  resetCreateData,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [
    createFoodDrive,
    { data: createResult, error: errorCreate, loading: loadingCreate },
  ] = useMutation(CREATE_FOOD_DRIVE);
  const toastProvider = useToastProvider();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToHome = useCallback(() => {
    resetCreateData();
    const resetHistory = CommonActions.reset({
      index: 0,
      routes: [{ name: SCREEN_NAMES.common.app }],
    });
    navigation.dispatch(resetHistory);
  }, [navigation, resetCreateData]);

  const onSubmit = useCallback(async () => {
    if (!currentUser || !createData) {
      return;
    }
    const food = createFoodItem(
      createData.allergens ?? [],
      createData.maxCapacity ?? 1,
    );
    const location = createLocationFromAddress(createData.location ?? "");
    const payload = {
      name: createData.name,
      startDate: createData.startDate,
      endDate: createData.endDate,
      location,
      organiserId: currentUser.id,
      contactNumber: createData.contactNumber,
      email: createData.email,
      maxCapacity: createData.maxCapacity,
      food,
      description: createData.description,
      autoAccept: createData.autoAccept,
      facebookPage: createData.facebookPage,
    };
    try {
      if (pageTitle?.includes("Create")) {
        await createFoodDrive({
          variables: payload,
        });
      } else {
        // TODO send edit request
      }
    } catch (e) {
      // Do nothing because the useEffect will catch the error
    }
  }, [pageTitle, currentUser, toastProvider, createData]);

  useEffect(() => {
    // This is to handle the odd case where if createData is
    // empty, it would just navigate back to the home page
    if (!createData) {
      navigateToHome();
    }
  }, [createData, navigateToHome]);

  useEffect(() => {
    if (!loadingCreate && !errorCreate && createResult) {
      const { createFoodDrive } = createResult;
      toastProvider.showSuccess(
        `Successfully created: ${createFoodDrive.name}`,
      );
      navigateToHome();
    } else if (errorCreate) {
      toastProvider.showError(errorCreate.message);
    }
  }, [loadingCreate, errorCreate, createResult, toastProvider, navigateToHome]);

  if (!createData) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <PageHeader
        id="creation-summary"
        title={pageTitle as string}
        hasBack
        onBackPress={onBack}
      />
      <EventInfoCard id="event-info-summary" event={createData} />
      <Button
        color="primary"
        id="submit-btn"
        title={pageTitle?.includes("Create") ? "Create" : "Edit"}
        onPress={onSubmit}
        disabled={loadingCreate}
        loading={loadingCreate}
      />
    </View>
  );
};

export default CreationSummary;

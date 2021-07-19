import React, {useState} from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-elements';
import styles from "./styles";
import { gql, useMutation } from '@apollo/client';

const UserEvents: React.FC = () => {
const UserId = "owbngeobweogbwoieb"
const mockLocation = {
   address: "Food Shelter",
   coords: {
     longitude: 1938986135,
     latitude: 1938986246
   }
  }

const mockFood = [{name: "Pizza", description: "nom noms", servings: 5, allergens: []}]

const CREATE_REQUEST = gql`
mutation Mutation($createRequestRequestorId: ID!, $createRequestLocation: LocationInput!, $createRequestNumAttendees: Int!, $createRequestFood: [FoodInput!]!) {
  createRequest(requestorId: $createRequestRequestorId, location: $createRequestLocation, numAttendees: $createRequestNumAttendees, food: $createRequestFood) {
    numAttendees
    food {
      name
      description
      servings
      allergens
    }
  }
}
`;

const [claimFood, { data }] = useMutation(CREATE_REQUEST);
const [isClaimed, updateClaim] = useState(false)

return (
  <View style={styles.container}>
    <Text style={styles.text}>Event Screen</Text>

    <View style={styles.buttonContainer}>
      <Button
        title={isClaimed ? "Unclaim" : "Claim"}
        onPress={() => {
          updateClaim(oldState => !oldState)
          claimFood({ variables: {
            requestorId: UserId,
            location: mockLocation,
            numAttendees: 4,
            food: mockFood
            }
          });
        }}
        buttonStyle={isClaimed ? styles.buttonStyleClaimed : styles.buttonStyleUnclaimed}
      />
    </View>
  </View>
)};

export default UserEvents;

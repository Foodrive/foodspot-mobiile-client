import React from "react";
import { PendingInvite } from "../PendingInvites";
import { ListItem } from "@app/components/ui";
import { colors } from "@app/utils";
import { Text } from "react-native";
import { useStyles } from "./styles";

interface PendingItemProps {
  isSelected: boolean;
  invite: PendingInvite;
  onPress: () => void;
}

const PendingItem: React.FC<PendingItemProps> = ({
  isSelected,
  invite,
  onPress,
}) => {
  const styles = useStyles({ isSelected });
  return (
    <ListItem
      id={`${invite.id}-list-item`}
      title={invite.attendeeName}
      iconName="person"
      iconColor={colors.darkBrown}
      showNav={false}
      otherInformation={
        <Text
          style={{
            color: isSelected ? colors.white : colors.dark,
            fontWeight: isSelected ? "bold" : "normal",
          }}
        >
          {invite.numAttendees} attendees
        </Text>
      }
      containerStyle={styles.containerStyle}
      onPress={onPress}
    />
  );
};

export default PendingItem;

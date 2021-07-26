import React, { ReactNode } from "react";
import {
  ListItem as RNListItem,
  ListItemProps as RNListItemProps,
} from "react-native-elements";
import Icon from "../Icon";
import { colors } from "@app/utils";
import styles from "./styles";

interface ListItemProps extends RNListItemProps {
  id: string;
  title: string;
  otherInformation: ReactNode | string; //for other elements to display below the title e.g. description and pending bar
  iconName?: string;
  iconColor?: string;
  iconFamily?: string;
  showNav?: boolean; //show chevron right navigation icon
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  title,
  otherInformation,
  iconName = "md-basket",
  iconColor = "grey",
  iconFamily = "ionicon",
  showNav = true,
  onClick,
  ...rest
}) => {
  return (
    <RNListItem
      onPress={onClick}
      disabled={onClick === undefined}
      key={id}
      data-testid={id}
      containerStyle={styles.listStyle}
      {...rest}
    >
      <Icon
        id={`${id}-icon`}
        reverse
        name={iconName}
        type={iconFamily}
        color={iconColor}
      />
      <RNListItem.Content>
        <RNListItem.Title style={styles.titleText}>{title}</RNListItem.Title>
        <RNListItem.Subtitle style={styles.subtitleText}>
          {otherInformation}
        </RNListItem.Subtitle>
      </RNListItem.Content>
      {showNav && <RNListItem.Chevron size={50} color={colors.darkBrown} />}
    </RNListItem>
  );
};

export default ListItem;

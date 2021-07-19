// TODO add reusable components here
import React, { ReactNode } from "react";
import {
  ListItem as RNListItem,
  ListItemProps as RNListItemProps,
} from "react-native-elements";
import { Icon } from "..";
import { colors } from "@app/utils";

interface ListItemProps extends RNListItemProps {
  id: string;
  title: string;
  otherInformation: ReactNode | string; //for other elements to display below the title e.g. description and pending bar
  iconName?: string;
  iconColor?: string;
  iconFamily?: string;
  showNav: boolean; //show chevron right navigation icon
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    id,
    title,
    otherInformation,
    iconName = "md-basket",
    iconColor = "grey",
    iconFamily = "ionicon",
    showNav = false,
    onClick,
    ...rest
  } = props;

  return (
    <RNListItem key={id} data-testid={id} {...rest}>
      <Icon reverse name={iconName} type={iconFamily} color={iconColor} />
      <RNListItem.Content>
        <RNListItem.Title>{title}</RNListItem.Title>
        <RNListItem.Subtitle>{otherInformation}</RNListItem.Subtitle>
      </RNListItem.Content>
      {showNav && <RNListItem.Chevron size={50} color={colors.darkBrown} />}
    </RNListItem>
  );
};
export default ListItem;

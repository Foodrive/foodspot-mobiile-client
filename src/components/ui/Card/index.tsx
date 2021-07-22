import React, { ReactNode } from "react";
import { View } from "react-native";
import {
  Card as RNCard,
  CardProps as RNCardProps,
} from "react-native-elements";
import styles from "./styles";

interface CardInputProps extends RNCardProps {
  id: string;
  title: string;
  children?: ReactNode;
  info?: ReactNode;
}

const Card: React.FC<CardInputProps> = ({
  id,
  title,
  children,
  info,
  ...rest
}) => (
  <RNCard containerStyle={styles.cardStyle} data-testid={id} {...rest}>
    <View style={styles.cardHeader}>
      <RNCard.Title style={styles.titleText}>{title}</RNCard.Title>
      {info && info}
    </View>
    <RNCard.Divider />
    {children}
  </RNCard>
);

export default Card;

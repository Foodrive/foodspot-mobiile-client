import React from "react";
import { View } from "react-native";
import { Chip, ChipProps } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "@app/utils";
import styles from "./styles";

export interface Tag extends ChipProps {
  id?: string;
  title: string;
}

interface TagsProps {
  tags: Tag[];
  id?: string;
  variant?: "round" | "square";
  color?: "teal" | "lightbrown" | "orange";
}

const Tags: React.FC<TagsProps> = ({
  tags,
  id,
  variant = "round",
  color = "orange",
}) => {
  return (
    <View data-testid={id} style={styles.container}>
      {tags.map(({ id, title, ...rest }, index) => (
        <Chip
          key={`${index}-${title}`}
          data-testid={id}
          title={title}
          {...rest}
          buttonStyle={{
            borderRadius: variant === "round" ? 30 : 3,
            marginRight: RFValue(10),
            backgroundColor: colors[color],
          }}
        />
      ))}
    </View>
  );
};

export default Tags;

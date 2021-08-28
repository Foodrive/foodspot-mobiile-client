import React, { ReactNode } from "react";
import { Text, View, ViewStyle } from "react-native";
import { IconButton } from "@app/components/ui";
import { useStyles } from "./styles";

interface PageHeaderProps {
  id: string;
  title: string;
  actions?: ReactNode;
  hasBack?: boolean;
  onBackPress?: () => void;
  containerStyle?: ViewStyle;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  id,
  title,
  actions,
  hasBack = true,
  onBackPress,
  containerStyle,
}) => {
  const styles = useStyles();

  return (
    <View
      data-testid={`${id}-header-container`}
      style={[styles.container, containerStyle]}
    >
      <View data-testid={`${id}-heading`} style={styles.heading}>
        {hasBack && (
          <IconButton
            id={`${id}-heading-back`}
            icon="chevron-back-outline"
            containerStyle={styles.iconButton}
            onPress={onBackPress}
          />
        )}
        <Text data-testid={`${id}-heading-text`} style={styles.headingText}>
          {title}
        </Text>
      </View>
      {actions && (
        <View data-testid={`${id}-header-actions`} style={styles.actions}>
          {actions}
        </View>
      )}
    </View>
  );
};

export default PageHeader;

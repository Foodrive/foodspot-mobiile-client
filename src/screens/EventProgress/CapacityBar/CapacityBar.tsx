import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "./styles";
import { ProgressBar } from "@app/components/ui";

interface CapacityBarProps {
  value: number;
  max: number;
  valueText?: string;
  hasMax?: boolean;
}

const CapacityBar: React.FC<CapacityBarProps> = ({
  value,
  valueText,
  max,
  hasMax = true,
}) => {
  const styles = useStyles();

  const labelText = hasMax
    ? `${valueText ?? value} / ${max} claims remaining`
    : `${valueText ?? value} claims remaining`;

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{labelText}</Text>
      <ProgressBar
        id="capacity-progress"
        type="info"
        curValue={value}
        maxValue={max}
      />
    </View>
  );
};

export default CapacityBar;

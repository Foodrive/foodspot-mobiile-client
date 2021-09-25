import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "./styles";
import { ProgressBar } from "@app/components/ui";

interface CapacityBarProps {
  value: string | number;
  max: string | number;
}

const CapacityBar: React.FC<CapacityBarProps> = ({ value, max }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>
        Capacity remaining {value} / {max}
      </Text>
      <ProgressBar
        id="capacity-progress"
        type="info"
        curValue={Number(value)}
        maxValue={Number(max)}
      />
    </View>
  );
};

export default CapacityBar;

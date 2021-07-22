import React from "react";
import { LinearProgress, LinearProgressProps } from "react-native-elements";
import { Text, View } from "react-native";
import { useStyles } from "./styles";
import { colors } from "@app/utils";

interface ProgressBarProps
  extends Omit<LinearProgressProps, "value" | "color" | "variant"> {
  id: string;
  type: "info" | "warning" | "success";
  maxValue: number;
  curValue?: number;
  label?: string;
  hasProgressText?: boolean; // show progress in label
  labelType?: "info" | "warning" | "success" | "default";
}

const colorMap = {
  info: colors.teal,
  warning: colors.orange,
  success: colors.success,
  default: colors.dark,
};

/**
 * Determinant progress bar.
 *
 * Usage:
 *
 * <ProgressBar
 *  id="progress-bar"
 *  type="success"
 *  label="Pending volunteers"
 *  hasProgressText
 *  labelType="success"
 *  curValue={10}
 *  maxValue={100}
 * />
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  id,
  type,
  curValue = 0,
  maxValue,
  label,
  hasProgressText,
  labelType = "default",
  ...rest
}) => {
  const styles = useStyles({
    labelColor: colorMap[labelType],
  });
  const value = curValue / maxValue;
  const color = colorMap[type];
  return (
    <View style={styles.container}>
      {(label || hasProgressText) && (
        <Text style={styles.labelText}>
          {label || "Progress: "} ({`${curValue} / ${maxValue}`})
        </Text>
      )}
      <LinearProgress
        data-testid={id}
        variant="determinate"
        color={color}
        value={value}
        style={{ minHeight: 6, borderRadius: 3 }}
        {...rest}
      />
    </View>
  );
};

export default ProgressBar;

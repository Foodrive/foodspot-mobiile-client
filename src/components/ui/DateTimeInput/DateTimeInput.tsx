import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from "@app/components/ui";
import { useStyles } from "./styles";
import dayjs from "dayjs";

export interface DateTimeInputProps {
  id: string;
  label?: string;
  value?: string; // GMT format
  onChangeText: (text: string) => void;
  errorMessage?: string;
  placeholder?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  id,
  value,
  label,
  onChangeText,
  errorMessage,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const styles = useStyles({ date: currentDate });

  useEffect(() => {
    if (value) {
      const newDate = new Date(value);
      if (newDate.toString() !== "Invalid Date") {
        setCurrentDate(newDate);
      }
    }
  }, [value]);

  const showDatePicker = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      hideDatePicker();
      onChangeText(date.toUTCString());
      setCurrentDate(date);
    },
    [hideDatePicker, onChangeText],
  );

  const displayText = useMemo(() => {
    if (currentDate) {
      return dayjs(currentDate).format("DD MMMM [at] hh:mm a");
    } else {
      return placeholder || "Select date";
    }
  }, [placeholder, currentDate]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.inputContainer} data-testid={`${id}-date-input`}>
          <View>
            <Icon id="date-picker" name="calendar" type="ionicon" />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>{displayText}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.errorContainer}>
        {errorMessage && (
          <Text style={styles.errorText} data-testid={`${id}-date-input-error`}>
            {errorMessage}
          </Text>
        )}
      </View>
      <DateTimePickerModal
        date={currentDate}
        isVisible={isVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimeInput;

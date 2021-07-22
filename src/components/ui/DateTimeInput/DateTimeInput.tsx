import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from "@app/components/ui";
import { useStyles } from "./styles";
import dayjs from "dayjs";

interface DateTimeInputProps {
  value?: string; // GMT format
  onConfirm: (date: string) => void;
  errorMessage?: string;
  placeholder?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onConfirm,
  errorMessage,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const styles = useStyles({ date: currentDate });

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value));
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
      onConfirm(date.toUTCString());
      setCurrentDate(date);
      hideDatePicker();
    },
    [hideDatePicker, onConfirm],
  );

  const displayText = useMemo(() => {
    if (currentDate) {
      return dayjs(currentDate).format("DD MMMM [at] hh:mm a");
    } else {
      return placeholder || "Enter date";
    }
  }, [placeholder, currentDate]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.inputContainer}>
          <View>
            <Icon id="date-picker" name="calendar" type="ionicon" />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>{displayText}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
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

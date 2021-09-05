import React, { ReactNode, useMemo } from "react";
import { Text, View } from "react-native";
import { useStyles } from "./styles";
import { Icon } from "@app/components/ui";
import { RFValue } from "react-native-responsive-fontsize";

const iconMap = {
  user: { type: "ionicon", name: "person-outline" },
  location: { type: "ionicon", name: "location-outline" },
  number: { type: "font-awesome-5", name: "hashtag" },
  email: { type: "ionicon", name: "mail-outline" },
  text: { type: "ionicon", name: "chatbox-outline" },
  date: { type: "ionicon", name: "calendar" },
};

export type InfoSectionType =
  | "user"
  | "location"
  | "number"
  | "email"
  | "text"
  | "date";

export interface InfoSectionProps {
  label: string;
  value: ReactNode;
  type?: InfoSectionType;
}

const InfoSection: React.FC<InfoSectionProps> = ({ label, value, type }) => {
  const styles = useStyles();
  const icon = useMemo(() => {
    if (type) {
      return iconMap[type];
    }
    return undefined;
  }, [type]);

  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
        {icon && (
          <Icon
            id={`${label}-icon`}
            name={icon.name}
            type={icon.type}
            size={RFValue(16)}
          />
        )}
      </View>
      <View>{value}</View>
    </View>
  );
};

export default InfoSection;

import React, { useCallback, useMemo } from "react";
import { EventCreateData, EventType } from "@app/types/event.types";
import Card from "@app/components/ui/Card";
import { InfoSection, InfoSectionProps, InfoSectionType } from "./InfoSection";
import { Text, View } from "react-native";
import { colors, getDateInfo } from "@app/utils";
import { useStyles } from "./styles";
import { Tags } from "@app/components/ui";
import { EventInfoHeader } from "@app/components/common/EventInfoCard/EventInfoHeader";
import { colorNames } from "react-native-svg/lib/typescript/lib/extract/extractColor";

interface EventInfoCardProps {
  id: string;
  event: EventCreateData;
}

// Maps the event information key to the type
// This is used to display icons on text sections
const sectionTypeMap: Record<
  keyof EventCreateData,
  InfoSectionType | undefined
> = {
  location: "location",
  description: "text",
  email: "email",
  allergens: undefined,
  autoAccept: undefined,
  contactNumber: undefined,
  endDate: undefined,
  facebookPage: undefined,
  maxCapacity: undefined,
  name: undefined,
  type: undefined,
  startDate: undefined,
};

const sectionLabelMap: Record<keyof EventCreateData, string> = {
  allergens: "Food contains",
  autoAccept: "",
  contactNumber: "Contact Number",
  description: "Description",
  email: "Email",
  endDate: "",
  facebookPage: "Facebook Page",
  location: "Where",
  maxCapacity: "Max Capacity",
  name: "",
  startDate: "",
  type: "",
};

const EventInfoCard: React.FC<EventInfoCardProps> = ({ id, event }) => {
  const styles = useStyles();
  const getTextSection = useCallback(
    (
      label: string,
      text: string,
      type: InfoSectionType | undefined,
    ): InfoSectionProps => ({
      label,
      value: <Text style={styles.valueText}>{text}</Text>,
      type,
    }),
    [styles],
  );

  const getDateSection = useCallback(
    (label: string, startDate: string, endDate: string): InfoSectionProps => {
      const dateInfo = getDateInfo(startDate, endDate);
      const color = dateInfo.isToday ? colors.success : colors.lightbrown;
      return {
        label,
        value: (
          <View>
            <Text style={[styles.dateText, { color }]}>{dateInfo.dayText}</Text>
            <Text style={styles.timeText}>{dateInfo.timeText}</Text>
          </View>
        ),
        type: "date",
      };
    },
    [styles],
  );

  const getTabsSection = useCallback(
    (label, values: string[]): InfoSectionProps => {
      const tags = values.map((item) => ({ title: item }));
      return {
        label,
        value:
          values.length !== 0 ? (
            <Tags tags={tags} variant="round" />
          ) : (
            <Text style={styles.valueText}>N/A</Text>
          ),
      };
    },
    [],
  );

  const infoSections = useMemo(() => {
    // Standardises the sections
    const excluded = ["name", "autoAccept", "type", "startDate", "endDate"];
    const sections = [];
    if (event.startDate && event.endDate) {
      sections.push(getDateSection("When", event.startDate, event.endDate));
    }
    for (const key of Object.keys(event)) {
      if (excluded.includes(key)) {
        continue;
      }
      const value = event[key as keyof EventCreateData];
      if (key === "allergens") {
        sections.push(
          getTabsSection(
            sectionLabelMap[key as keyof EventCreateData],
            value as string[],
          ),
        );
      } else {
        sections.push(
          getTextSection(
            sectionLabelMap[key as keyof EventCreateData],
            value as string,
            sectionTypeMap[key as keyof EventCreateData],
          ),
        );
      }
    }
    return sections;
  }, [getTabsSection, getDateSection, getTextSection, event]);

  return (
    <Card id={id}>
      <EventInfoHeader
        title={event.name ?? ""}
        type={event.type ?? EventType.foodDrive}
        autoAccept={event.autoAccept}
      />
      {infoSections.map((section) => (
        <InfoSection
          key={section.label}
          label={section.label}
          value={section.value}
          type={section.type}
        />
      ))}
    </Card>
  );
};

export default EventInfoCard;

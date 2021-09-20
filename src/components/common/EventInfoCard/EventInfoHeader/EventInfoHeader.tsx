import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Tags } from "@app/components/ui";
import { EventType } from "@app/types/event.types";
import { useStyles } from "./styles";

interface EventInfoHeaderProps {
  title: string;
  type: EventType;
  secondaryTag?: string;
}

const EventInfoHeader: React.FC<EventInfoHeaderProps> = ({
  title,
  type,
  secondaryTag,
}) => {
  const styles = useStyles();
  const eventType = useMemo(() => [{ title: type }], [type]);
  const secondaryTagText = useMemo(
    () => (secondaryTag ? [{ title: secondaryTag }] : undefined),
    [secondaryTag],
  );
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Tags tags={eventType} color="teal" variant="square" />
      </View>
      {secondaryTagText !== undefined && (
        <View style={styles.acceptTypeContainer}>
          <Tags tags={secondaryTagText} color="lightbrown" variant="square" />
        </View>
      )}
    </View>
  );
};

export default EventInfoHeader;

import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Tags } from "@app/components/ui";
import { EventType } from "@app/types/event.types";
import { useStyles } from "./styles";

interface EventInfoHeaderProps {
  title: string;
  type: EventType;
  autoAccept?: boolean;
}

const EventInfoHeader: React.FC<EventInfoHeaderProps> = ({
  title,
  type,
  autoAccept,
}) => {
  const styles = useStyles();
  const eventType = useMemo(() => [{ title: type }], [type]);
  const acceptType = useMemo(
    () => [{ title: autoAccept ? "Automated" : "Manual" }],
    [autoAccept],
  );
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Tags tags={eventType} color="teal" variant="square" />
      </View>
      {autoAccept !== undefined && (
        <View style={styles.acceptTypeContainer}>
          <Tags tags={acceptType} color="lightbrown" variant="square" />
        </View>
      )}
    </View>
  );
};

export default EventInfoHeader;

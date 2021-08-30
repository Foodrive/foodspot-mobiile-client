import React from "react";
import { View, Text } from "react-native";
import { Icon, IconButton, Tags } from "@app/components/ui";
import styles from "./styles";
import Card from "@app/components/ui/Card";
import { Tag } from "@app/components/ui/Tags";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

interface EventDetailsCardProps {
  eventType?: "Food Drive";
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  address: string;
  contactNumber: string;
  allergens: string[];
}

// TODO Update with invitation info
const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  eventType = "Food Drive",
  name,
  startDate,
  endDate,
  description,
  address,
  contactNumber,
  allergens,
}) => {
  const isStartingToday = dayjs(startDate).isToday();
  const isEndingToday = dayjs(endDate).isToday();
  const eventStartDate = dayjs(startDate);
  const eventEndDate = dayjs(endDate);

  return (
    <View>
      <Card
        id="event-details-card"
        title={name}
        info={
          <Tags tags={[{ title: eventType }]} variant="square" color="teal" />
        }
      >
        <View>
          <View style={styles.subheadingContainer}>
            <View style={styles.container}>
              <Text style={styles.subheading}>When</Text>
              <Icon id="when-icon" name="calendar-outline" />
            </View>
            {isStartingToday && isEndingToday ? (
              <>
                <Text style={styles.todayText}>Today</Text>
                <Text style={styles.text}>
                  {eventStartDate.format("h:MM A")} -{" "}
                  {eventEndDate.format("h:MM A")}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>
                  {eventStartDate.format("DD MMM YY h:MM A")} until
                </Text>
                <Text style={styles.text}>
                  {eventEndDate.format("DD MMM YY h:MM A")}
                </Text>
              </>
            )}
          </View>
          <View style={styles.subheadingContainer}>
            <View style={styles.container}>
              <Text style={styles.subheading}>Description</Text>
              <Icon id="description-icon" name="chatbox-outline" />
            </View>
            <Text style={styles.text}>{description}</Text>
          </View>
          <View>
            <View
              style={{
                ...styles.subheadingContainer,
                ...styles.subheadingWithButtonContainer,
              }}
            >
              <View style={styles.container}>
                <Text style={styles.subheading}>Where</Text>
                <Icon id="location-icon" name="location-outline" />
              </View>
              <Text style={styles.text}>{address}</Text>
            </View>
            <View style={styles.floatingIconButton}>
              <IconButton
                id="floating-location-button"
                icon="location-outline"
                reverse={false}
                onPress={() => console.log("location")} // TODO
              />
            </View>
          </View>
          <View>
            <View
              style={{
                ...styles.subheadingContainer,
                ...styles.subheadingWithButtonContainer,
              }}
            >
              <View style={styles.container}>
                <Text style={styles.subheading}>Contact Number</Text>
                <Icon id="contact-icon" name="person-circle-outline" />
              </View>
              <Text style={styles.text}>{contactNumber}</Text>
            </View>
            <View style={styles.floatingIconButton}>
              <IconButton
                id="floating-contact-button"
                icon="person-circle-outline"
                reverse={false}
                onPress={() => console.log("contact")} // TODO
              />
            </View>
          </View>
          <View style={styles.subheadingContainer}>
            <View style={styles.container}>
              <Text style={styles.subheading}>Food contains</Text>
              <Icon id="allergens-icon" name="warning-outline" />
            </View>
            <View style={styles.tags}>
              {allergens.length > 0 ? (
                <Tags
                  tags={allergens.reduce((accm: Tag[], allergen) => {
                    accm.push({
                      title: allergen,
                    });
                    return accm;
                  }, [])}
                  variant="square"
                />
              ) : (
                <Text style={{ ...styles.text, ...styles.subtext }}>
                  No allergens listed
                </Text>
              )}
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default EventDetailsCard;

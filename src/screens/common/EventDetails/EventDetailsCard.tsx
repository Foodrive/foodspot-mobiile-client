import React from "react";
import { View, Text } from "react-native";
import { Icon, IconButton, Tags } from "@app/components/ui";
import styles from "./styles";
import Card from "@app/components/ui/Card";
import { Tag } from "@app/components/ui/Tags";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { InvitationStatus } from "@app/utils/constants";
import { Invitation } from "@app/graphql/queries";
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
  invitation?: Invitation;
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
  invitation,
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
          {invitation !== undefined && (
            <View style={styles.subheadingContainer}>
              <View style={styles.container}>
                <Icon
                  id="allergens-icon"
                  name="fast-food-outline"
                  containerStyle={styles.subHeadingIcon}
                />
                <Text style={styles.subheading}>Meal Code #</Text>
              </View>
              <Text style={styles.subtext}>
                {invitation.status === InvitationStatus.accepted
                  ? "You have successfully claimed your meal! Show this code on pickup to verify your meal."
                  : invitation.status === InvitationStatus.pending
                    ? "Your registration is still pending approval from the event host. The meal code will appear below once ready."
                    : "Your registration has been denied by the event host. Please contact them for further information."}
              </Text>
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>
                  {invitation.status === InvitationStatus.accepted
                    ? invitation.code
                    : "------"}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.subheadingContainer}>
            <View style={styles.container}>
              <Icon
                id="when-icon"
                name="calendar-outline"
                containerStyle={styles.subHeadingIcon}
              />
              <Text style={styles.subheading}>When</Text>
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
              <Icon
                id="description-icon"
                name="chatbox-outline"
                containerStyle={styles.subHeadingIcon}
              />
              <Text style={styles.subheading}>Description</Text>
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
                <Icon
                  id="location-icon"
                  name="location-outline"
                  containerStyle={styles.subHeadingIcon}
                />
                <Text style={styles.subheading}>Where</Text>
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
                <Icon
                  id="contact-icon"
                  name="person-circle-outline"
                  containerStyle={styles.subHeadingIcon}
                />
                <Text style={styles.subheading}>Contact Number</Text>
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
              <Icon
                id="allergens-icon"
                name="warning-outline"
                containerStyle={styles.subHeadingIcon}
              />
              <Text style={styles.subheading}>Food contains</Text>
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

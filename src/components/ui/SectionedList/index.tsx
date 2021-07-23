import React, { ReactElement } from "react";
import { SectionList, Text, View } from "react-native";
import styles from "./styles";

export interface SectionedListData<T> {
  title: string;
  data: T[];
}

interface SectionedListProps<T> {
  id: string;
  data: SectionedListData<T>[];
  renderItem: (item: T) => ReactElement;
}

type GenericObject =
  | {
      id: string | number;
    }
  | string
  | number;

const SectionedList = <T extends GenericObject>(
  props: SectionedListProps<T>,
): ReactElement => {
  const { data, renderItem, id } = props;
  return (
    <SectionList
      data-testid={id}
      sections={data}
      style={styles.listStyles}
      keyExtractor={(item, index) => `${id}-${index}-item`}
      renderItem={({ item }) => renderItem(item)}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>{title}</Text>
        </View>
      )}
    />
  );
};

// Note: Usage in the JSX code.
// Example is a sectioned list of string type
// <SectionedList<string>
//   id="section-list"
//   data={sample}
//   renderItem={renderItem}
// />

export default SectionedList;

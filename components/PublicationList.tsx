import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Publication from "../services/publication.model";
import PublicationItem from "./PublicationItem";

interface PublicationListProps extends NavigationProps {
  publications: Array<Publication>;
  color: string;
}

export default class PublicationList extends Component<PublicationListProps> {
  render() {
    const { publications, color } = this.props;
    return (
      <FlatList<Publication>
        style={styles.publicationList}
        data={publications}
        keyExtractor={(publication) => publication.Id.toString()}
        renderItem={({ item }) => {
          return (
            <PublicationItem
              color={color}
              publication={item}
              navigation={this.props.navigation}
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  publicationList: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

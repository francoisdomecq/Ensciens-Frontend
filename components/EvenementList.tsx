import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Evenement from "../services/evenement.model";
import EvenementItem from "./EvenementItem";

interface EvenementListProps extends NavigationProps {
  evenements: Array<Evenement>;
}

//Composant qui permet d'afficher une liste d'évènements avec le composant EvenementItem
export default class EvenementList extends Component<EvenementListProps> {
  render() {
    const { evenements } = this.props;
    return (
      <FlatList<Evenement>
        style={styles.evenementList}
        data={evenements}
        keyExtractor={(Evenement) => Evenement.Id.toString()}
        renderItem={({ item }) => {
          return (
            <EvenementItem
              evenement={item}
              navigation={this.props.navigation}
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  evenementList: {
    flex: 1,
    width: "95%",
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

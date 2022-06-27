import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import MembreItem from "./MembreItem";
import Membre from "../services/membre.model";

interface MembrescrollViewProps extends NavigationProps {
  //Nom du club/bureau
  name: string;
  //Liste des membres du bureau
  membres: Array<Membre>;
}

//Ce composant permet d'afficher la liste des membres d'un bureau ou d'un club.
export default class MembrescrollView extends Component<MembrescrollViewProps> {
  render() {
    const { membres, name } = this.props;
    return (
      <View style={styles.containerHorizontal}>
        <Text style={styles.titleMembres}>{name}</Text>
        <ScrollView
          horizontal={true}
          style={styles.containerMembres}
          contentContainerStyle={{
            justifyContent: "space-around",
            alignItems: "stretch",
          }}
        >
          {membres.map((membre) => {
            return (
              <MembreItem
                key={membre.item2.id}
                membre={membre}
                navigation={this.props.navigation}
              ></MembreItem>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHorizontal: {
    flex: 1,
    marginTop: "5%",
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: "1%",
    paddingLeft: "1%",
  },
  titleMembres: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: "2%",
  },
  containerMembres: {
    flex: 1,
    borderRadius: 10,
    height: 80,
  },

  containerEvenements: {
    flex: 1,
    marginTop: "5%",
    width: "95%",
  },
});

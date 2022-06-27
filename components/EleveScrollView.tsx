import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import EleveItem from "./EleveItem";
import Eleve from "../services/eleve.model";

interface EleveScrollViewProps extends NavigationProps {
  //Nom de la famille
  name: string;
  //Couleur d'arrière plan pour la famille
  color: string;
  //Tableau des membres de la famille
  eleves: Array<Eleve>;
}

//Composant utilisé pour afficher la liste des membres d'une famille
export default class EleveScrollView extends Component<EleveScrollViewProps> {
  render() {
    const { name, color, eleves } = this.props;
    return (
      <View style={styles.containerHorizontal}>
        <Text style={styles.titleMembres}>{name}</Text>
        <ScrollView
          horizontal={true}
          style={stylesEleves(color).containerEleves}
          contentContainerStyle={{
            justifyContent: "space-around",
            alignItems: "stretch",
          }}
        >
          {eleves.map((eleve) => {
            return (
              <EleveItem
                key={eleve.id}
                eleve={eleve}
                navigation={this.props.navigation}
              ></EleveItem>
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
    marginTop: "10%",
    width: "95%",
  },
  titleMembres: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: "2%",
  },
  containerEleves: {
    flex: 1,
    borderRadius: 10,
    height: 80,
    backgroundColor: "#EFEFEF",
  },

  containerEvenements: {
    flex: 1,
    marginTop: "5%",
    width: "95%",
  },
});

const stylesEleves = (color: string) =>
  StyleSheet.create({
    containerEleves: {
      flex: 1,
      borderRadius: 10,
      height: 80,
      backgroundColor: color,
    },
  });

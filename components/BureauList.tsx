import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Bureau from "../services/bureau.model";
import BureauItem from "./BureauItem";

interface BureauListProps extends NavigationProps {
  //Liste de bureaux passés en props
  Bureaux: Array<Bureau>;
}

//Composant utilisé sur l'écran Bureaux qui affiche la liste des bureaux en utilisant le composant BureauItem
export default class BureauList extends Component<BureauListProps> {
  render() {
    const { Bureaux, navigation } = this.props;
    return (
      //On renvoie une flatlist de composants BureauItem
      <FlatList<Bureau>
        style={styles.BureauList}
        data={Bureaux}
        keyExtractor={(Bureau) => Bureau.id.toString()}
        renderItem={({ item }) => {
          return <BureauItem bureau={item} navigation={navigation} />;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  BureauList: {
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

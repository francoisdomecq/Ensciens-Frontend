import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { NavigationProps } from "../navigation/app-stacks";

import EvenementModel from "../services/evenement.model";
import PublicationApi from "../services/publication_api.service";
import PublicationModel from "../services/publication.model";

interface EvenementProps extends NavigationProps {
  //Evenement passé en props
  evenement: EvenementModel;
}

interface EvenementState {

  publications: Array<PublicationModel>;
  publication: PublicationModel;
}

//Composant utilisé dans différentes pages pour afficher une petite description de l'évènement.
//Lorsque l'utilisateur clique sur le composant, il est redirigé vers la page Evenement avec une description plus détaillée
//Et la liste de toutes les publications associées à l'évènement
export default class EvenementItem extends Component<
  EvenementProps,
  EvenementState
> {
  constructor(public props: EvenementProps) {
    super(props);
    this.state = {
      publication: null!,
      publications: [],
    };
  }

  render() {
    const { evenement, navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerOpacity}
        onPress={() => {
          navigation.navigate("Evenement", {
            evenementId: evenement.Id,
          });
        }}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{evenement.Titre} </Text>
          <Text style={styles.date}>
            - {evenement.date.toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.description} numberOfLines={7}>
            {evenement.Description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerOpacity: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#fff",
    padding: "3%",
    borderRadius: 10,
    marginBottom: "3%",
    borderColor: "rgba(0,0,0,0.3)",
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },

  containerTitle: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: "2%",
  },
  date: {
    paddingTop: "2%",
  },
  containerDescription: {
    flex: 2,
    marginTop: "3%",
  },
  description: {
    color: "#191716",
    fontWeight: "500",
    fontSize: 12,
  },
  containerBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "1%",
  },
  commentaires: {
    fontSize: 14,
    color: "rgba(25, 23, 22, 0.75);",
  },

  infos: {
    fontSize: 18,
    color: "rgba(25, 23, 22, 0.75);",
  },
});

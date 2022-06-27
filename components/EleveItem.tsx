import React, { Component, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";

import Eleve from "../services/eleve.model";
import UserService from "../services/user.service";

interface EleveProps extends NavigationProps {
  //Eleve passé en props
  eleve: Eleve;
}

interface EleveState {
  //Utilisateur connecté sur l'application
  user: Eleve;
}

//Composant utilisé dans EleveScrollView pour afficher les élèves membres d'une famille 
export default class EleveItem extends Component<EleveProps, EleveState> {
  constructor(public props: EleveProps) {
    super(props);
    this.state = {
      user: null!,
    };
  }

  //Fonction qui permet de charger l'utilisateur connecté en effectuant un appel vers l'async sotrage
  async loadUser() {
    const user = await UserService.getUserConnected();
    if (user) this.setState({ user });
  }

  //Au chargement du composant on charge l'utilisateur connecté
  componentDidMount() {
    this.loadUser();
  }

  render() {
    const { navigation, eleve } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerOpacity}
        onPress={() => {
          //Si l'utilisateur connecté est le même que l'étudiant sur lequel il clique, il redirigé vers sa page Profil
          //Sinon, il est redirigé vers la page Eleve de l'étudiant
          this.state.user.id === eleve.id
            ? navigation.navigate("Profil")
            : navigation.navigate("Eleve", {
                eleveId: eleve.id,
              });
        }}
      >
        <View style={styles.containerEleve}>
          <View style={styles.containerImage}>
            {
              <Image
                source={{
                  uri: `https://ensc-ensciens.azurewebsites.net/${eleve.photoProfil}`,
                }}
                style={styles.image}
              />
            }
          </View>
          <Text style={styles.textNom}>
            {eleve.nom} {eleve.prenom}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerOpacity: {
    flex: 1,
    width: "100%",
  },
  containerImage: {},
  image: {
    width: 48,
    height: 48,
  },
  containerEleve: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textNom: {
    fontSize: 8,
    fontWeight: "bold",
  },
});

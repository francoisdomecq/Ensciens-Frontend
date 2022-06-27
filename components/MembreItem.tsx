import React, { Component, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";
import Membre from "../services/membre.model";
import UserService from "../services/user.service";
import Eleve from "../services/eleve.model";

interface MembreProps extends NavigationProps {
  //Membre passé en props
  membre: Membre;
}

interface MembreState {
  user: Eleve;
}

//Composant utilisé pour afficher la liste des membres d'un bureau ou d'un club
//Deux composants distincts pour l'affichage des membres d'une famille et d'un bureau car les membres d'un bureau ont un rôle au sein du bureau
//Alors que les élèves n'ont pas de rôle dans une famille
export default class MembreItem extends Component<MembreProps, MembreState> {
  constructor(public props: MembreProps) {
    super(props);
    this.state = {
      user: null!,
    };
  }

  //Fonction qui permet de récupérer les données de l'utilisateur connecté dans l'async storage
  async loadUser() {
    const user = await UserService.getUserConnected();
    if (user) this.setState({ user });
  }

  //Au chargement du composant, on charge l'utilisateur
  componentDidMount() {
    this.loadUser();
  }

  render() {
    const { navigation, membre } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerOpacity}
        onPress={() => {
          //Si l'utilisateur clique sur son MembreItem il est redirigé vers sa page profil
          //Si il clique sur un autre eleve, il est redirigé vers l'écran Eleve
          this.state.user.id === membre.item2.id
            ? navigation.navigate("Profil")
            : navigation.navigate("Eleve", {
                eleveId: membre.item2.id,
              });
        }}
      >
        <View style={styles.containerMembre}>
          <View style={styles.containerImage}>
            {
              <Image
                source={{
                  uri: `https://ensc-ensciens.azurewebsites.net/${membre.item2.photoProfil}`,
                }}
                style={styles.image}
              />
            }
          </View>
          <Text style={styles.textNom}>
            {membre.item2.nom} {membre.item2.prenom}
          </Text>
          <Text style={styles.textRole}>{membre.item1}</Text>
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
  containerMembre: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textNom: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textRole: {
    fontSize: 8,
  },
});

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Famille from "../services/famille.model";

interface HandleCoupeFamilleScreenProps {
  //Liste des familles
  familles: Array<Famille>;
  //Fonction pour ajouter des points à une famille
  modifyPoints: Function;
  //Fonction pour fermer la modal
  closeModal: Function;
  //Fonction pour recharger les familles depuis l'api
  loadFamilles: Function;
}

interface HandleCoupleFamilleScreenState {
  //Famille sélectionnée
  selectedFamille: number;
  //Nombre de points à ajouter
  nbPoints: number;
}

//Composant utilisé dans l'écran CoupeFamille à l'ouverture de la modal pour gérer la coupe des familles
export default class HandleCoupeFamilleModal extends Component<
  HandleCoupeFamilleScreenProps,
  HandleCoupleFamilleScreenState
> {
  constructor(public props: HandleCoupeFamilleScreenProps) {
    super(props);
    this.state = {
      selectedFamille: 0,
      nbPoints: 0,
    };
  }

  //Fonction qui permet d'ajouter des points à une famille
  putFamilles(id: number, nbPoints: number) {
    //Fonction passée en props qui effectue un appel vers l'api
    this.props.modifyPoints(id, nbPoints);
    //Fonction pour recharger les familles après l'ajout des points à une famille
    this.props.loadFamilles();
    //On ferme la modal 
    this.props.closeModal();
  }

  modifyPoints = (nbPoints: number) => {
    this.setState({ nbPoints });
  };

  render() {
    //Tableau const pour afficher la couleur de la famille en utilisant les index avec idFamille
    const famillesData = ["Vert", "Orange", "Bleu", "Jaune", "Rouge"];
    //Couleurs des familles
    const famillesColor = [
      "#efefef",
      "#81cf9c",
      "rgba(254, 176, 82,1)",
      "rgba(162, 207, 254,1)",
      "#f5f51c",
      "rgba(254, 162, 162, 1)",
    ];
    const { familles } = this.props;
    return (
      <View>
        <Text style={styles.textTitle}>Sélectionnez une famille</Text>
        {familles.map((famille) => {
          return (
            <TouchableOpacity
              key={famille.idFamille}
              //Chaque touchableopacity sera affichée selon la couleur de la famille
              style={
                stylesWithProps(famillesColor[famille.idFamille]).selectFamille
              }
              onPress={() =>
                this.setState({ selectedFamille: famille.idFamille })
              }
            >
              <Text style={styles.textFamille}>
                {famillesData[famille.idFamille - 1]}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.containerPoints}>
          <Text style={styles.textTitle}>Nombre de points à ajouter</Text>
          <TextInput
          //La couleur du composant change en fonction de la famille sélectionnée
            style={
              stylesWithProps(famillesColor[this.state.selectedFamille])
                .numberInput
            }
            keyboardType="numeric"
            onChange={(e) => this.modifyPoints(parseInt(e.nativeEvent.text))}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() =>
            this.state.selectedFamille && this.state.nbPoints
              ? this.putFamilles(
                  this.state.selectedFamille,
                  this.state.nbPoints
                )
              : alert("Veuillez remplir les champs requis")
          }
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPoints: {
    width: "100%",
    alignItems: "center",
    marginTop: "5%",
  },
  textFamille: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2196F3",
  },
  buttonAdd: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: "5%",
    color: "#2196F3",
    alignSelf: "center",
    marginBottom: "2%",
  },
});

const stylesWithProps = (color: string) =>
  StyleSheet.create({
    selectFamille: {
      alignSelf: "center",
      width: "80%",
      height: 30,
      backgroundColor: color,
      marginTop: "2%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    numberInput: {
      width: "30%",
      borderRadius: 5,
      marginTop: "3%",
      height: 40,
      backgroundColor: color,
      textAlign: "center",
      color: "#2196F3",
      fontSize: 18,
      fontWeight: "500",
    },
  });

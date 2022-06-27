import React, { Component } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";

import EvenementApi from "../services/evenement_api.service";
import Evenement from "../services/evenement.model";

interface AddPublicationScreenProps extends NavigationProps {
  //Fonction issue de FilDActualite qui permet d'ajouter une publication.
  addPublication: Function;
  //Fonction issue de FilDActualite qui permet de recharger les publications
  loadPublication: Function;
  //Fonction issue de FilDActualite qui permet de fermer la modal
  closeModal: Function;
}

interface AddPublicationScreenState {
  evenements: Array<Evenement>;
  titre: string;
  contenu: string;
  medias: string;
  selectedEvent: Evenement;
  //Booléen pour savoir si on affiche la liste des évènements à l'utilisateur
  isSelectingEvent: boolean;
}

//Composant AddPublication utilisé dans l'écran FilDActualite à l'ouverture de la modal
export default class AddPublication extends Component<
  AddPublicationScreenProps,
  AddPublicationScreenState
> {
  constructor(public props: AddPublicationScreenProps) {
    super(props);
    this.state = {
      evenements: [],
      titre: "",
      contenu: "",
      medias: "",
      selectedEvent: null!,
      isSelectingEvent: false,
    };
  }

  //Fonction qui permet de poster la publication en utilisant addPublication passée en props
  postPublication(
    titre: string,
    contenu: string,
    medias: string,
    evenementId: number | null
  ) {
    //On crée la publication
    this.props.addPublication(
      titre,
      contenu,
      medias,
      evenementId
    );
    //On recharge les publications 
    this.props.loadPublication();
    //On ferme la modal
    this.props.closeModal();
  }

  //Permet de modifier la variable titre du state sur un évènement onChange
  modifyTitle = (titre: string) => {
    this.setState({ titre: titre });
  };

  //Permet de modifier la variable contenu du state sur un évènement onChange
  modifyContenu = (contenu: string) => {
    this.setState({ contenu: contenu });
  };

  //Permet de modifier la variable medias du state sur un évènement onChange
  modifyMedias = (medias: string) => {
    this.setState({ medias: medias });
  };

  //Permet de charger les évènements pour que l'utilisateur puisse sélectionner un évènement
  loadEvenements() {
    EvenementApi.getEvenementList().then((evenements: Array<Evenement>) =>
      this.setState({ evenements })
    );
  }

  //On charge les évènements au chargement du composant
  componentDidMount() {
    this.loadEvenements();
  }

  render() {
    const {
      titre,
      contenu,
      medias,
      evenements,
      isSelectingEvent,
      selectedEvent,
    } = this.state;
    return this.state.evenements ? (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Titre de la publication :</Text>
        <TextInput
          style={styles.input}
          placeholder="titre de la publication"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          //On modifie le titre sur un évènement onChange
          onChange={(e) => this.modifyTitle(e.nativeEvent.text)}
        />
        <Text style={styles.textTitle}>Description de la publication :</Text>
        <TextInput
          style={styles.contenuInput}
          placeholder="contenu de la publication"
          //On modifie le contenu sur un évènement onChange
          onChange={(e) => this.modifyContenu(e.nativeEvent.text)}
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          multiline={true}
        />
        <Text style={styles.textTitle}>Médias associés :</Text>
        <TextInput
          style={styles.input}
          placeholder="Médias associés à la publication"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          //On modifie les médias sur un évènement onChange
          onChange={(e) => this.modifyMedias(e.nativeEvent.text)}
        />

        <Text style={styles.textTitle}>Publication associée à un event ?</Text>
        <TouchableOpacity
          style={styles.buttonIsSelectingEvent}
          //On affiche les évènements si l'utilisateur le souhaite
          onPress={() => this.setState({ isSelectingEvent: true })}
        >
          <Text style={styles.textButton}>Oui</Text>
        </TouchableOpacity>


        {isSelectingEvent ? (
          //On affiche les évènements si l'utilisateur a cliqué sur oui avant
          <View>
            <Text style={styles.textTitle}>Sélectionnez un évènement</Text>
            {evenements.map((evenement) => {
              return (
                <TouchableOpacity
                  key={evenement.Id}
                  style={styles.evenement}
                  onPress={() => this.setState({ selectedEvent: evenement })}
                >
                  <Text>{evenement.Titre}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() =>
            //On vérifie que la publication respecte les conditions de l'api avant de publier
            titre.length >= 4 && contenu.length >= 1
              ? this.postPublication(
                  titre,
                  contenu,
                  medias,
                  selectedEvent ? selectedEvent.Id : null
                )
              : alert("Veuillez remplir les champs requis")
          }
        >
          <Text style={styles.textButton}>Ajouter la publication</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C0E8F7" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    paddingBottom: "4%",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: "5%",
    color: "#2196F3",
  },
  containerPicker: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    alignSelf: "center",
    height: 50,
    width: "100%",
    fontSize: 18,
    borderRadius: 10,
    justifyContent: "center",
    padding: "5%",
    backgroundColor: "#e2e2e2",
  },
  contenuInput: {
    alignSelf: "center",
    height: 150,
    width: "100%",
    fontSize: 18,
    borderRadius: 10,
    justifyContent: "center",
    padding: "5%",
    backgroundColor: "#e2e2e2",
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
  buttonIsSelectingEvent: {
    alignSelf: "center",
    width: "30%",
    height: 30,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  evenement: {
    alignSelf: "center",
    width: "80%",
    height: 30,
    backgroundColor: "#e2e2e2",
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

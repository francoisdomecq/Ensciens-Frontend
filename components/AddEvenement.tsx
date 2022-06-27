import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";

import EvenementApi from "../services/evenement_api.service";
import Evenement from "../services/evenement.model";
import Bureau from "../services/bureau.model";
import Club from "../services/club.model";

interface AddEvenementScreenProps extends NavigationProps {
  addEvenement: Function;
  loadEvenement: Function;
  closeModal: Function;
  clubsEleve: Array<{ club?: Club; role: string }>;
  bureauxEleve: Array<{ bureau?: Bureau; role: string }>;
}

interface AddEvenementScreenState {
  titre: string;
  description: string;
  date: Date;
  lieu: string;
  selectedBureau: Bureau;
  selectedClub: Club;
}

export default class AddEvenement extends Component<
  AddEvenementScreenProps,
  AddEvenementScreenState
> {
  constructor(public props: AddEvenementScreenProps) {
    super(props);
    this.state = {
      titre: "",
      description: "",
      lieu: "",
      date: null!,
      selectedBureau: null!,
      selectedClub: null!,
    };
  }

  postEvenement(
    titre: string,
    contenu: string,
    medias: string,
    evenementId: number | null
  ) {
    this.props.addEvenement(titre, contenu, medias, evenementId);
    this.props.loadEvenement();
    this.props.closeModal();
  }

  //Permet de modifier la variable titre du state sur un évènement onChange
  modifyTitle = (titre: string) => {
    this.setState({ titre: titre });
  };

    //Permet de modifier la variable description du state sur un évènement onChange
  modifyDescription = (description: string) => {
    this.setState({ description: description });
  };

  //Permet de modifier la variable lieu du state sur un évènement onChange
  modifyLieu = (lieu: string) => {
    this.setState({ lieu: lieu });
  };

  //Permet de modifier la variable date du state sur un évènement onChange
  setDate = () => {
    this.setState({ date: new Date(Date.now()) });
  };

  render() {
    const { titre, description, date, lieu, selectedBureau, selectedClub } =
      this.state;
    const { bureauxEleve, clubsEleve } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Titre de l'événement :</Text>
        <TextInput
          style={styles.input}
          placeholder="Titre de l'évènement"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          onChange={(e) => this.modifyTitle(e.nativeEvent.text)}
        />
        <Text style={styles.textTitle}>Description de l'événement :</Text>
        <TextInput
          style={styles.contenuInput}
          placeholder="Description de l'évènement"
          onChange={(e) => this.modifyDescription(e.nativeEvent.text)}
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          multiline={true}
        />
        <Text style={styles.textTitle}>Médias associés :</Text>
        <TextInput
          style={styles.input}
          placeholder="Lieu de l'évènement"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          onChange={(e) => this.modifyLieu(e.nativeEvent.text)}
        />

        {/* <View>
          <Text style={styles.textTitle}>Sélectionnez un évènement</Text>
          {clubsEleve.map((club) => {
            return (
              <TouchableOpacity
                key={club.id}
                style={styles.evenement}
                onPress={() => this.setState({ selectedClub: club })}
              >
                <Text>{club.nom}</Text>
              </TouchableOpacity>
            )
          })}
        </View> */}

        {/* <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() =>
            titre.length >= 4 && contenu.length >= 1
              ? this.postEvenement(
                  titre,
                  contenu,
                  medias,
                  selectedEvent ? selectedEvent.Id : null
                )
              : alert('Veuillez remplir les champs requis')
          }
        >
          <Text style={styles.textButton}>Ajouter la Evenement</Text>
        </TouchableOpacity> */}
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

import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

interface ModalProps {
  //Composant à afficher dans la modal
  component: JSX.Element;
  //Booleen pour savoir si la modal doit être visible ou non
  modalVisible: boolean;
  //Fonction qui permet de fermer la modal
  closeModal: Function;
}

//Ce composant est utilisé dans les écrans FilDActualite, Evenements et CoupeFamilles pour que l'utilisateur puisse effectuer 
//les actions : ajouter une publication, un évènement ou gérer la coupe des familles.
export default class ModalComponent extends Component<ModalProps, {}> {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Créer un évènement</Text>
            <ScrollView style={styles.modalView}>
              {this.props.component}
            </ScrollView>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.props.closeModal()}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    width: "100%",
    height: "80%",
  },
  modalView: {
    width: "95%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#2196F3",
  },
});

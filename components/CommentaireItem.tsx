import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Commentaire from "../services/commentaire.model";
import commentaire_apiService from "../services/commentaire_api.service";

interface CommentaireItemProps {
  //Commentaire passé en props
  commentaire: Commentaire;
}

interface CommentaireItemState {
  //Publicateur du commentaire
  publicateur: String;
}

//Composant utilisé dans l'écran Publication pour afficher un commentaire ainsi que le publicateur 
export default class CommentaireItem extends Component<
  CommentaireItemProps,
  CommentaireItemState
> {
  constructor(public props: CommentaireItemProps) {
    super(props);
    this.state = {
      publicateur: "",
    };
  }

  //Fonction qui effectue un appel vers l'API pour récupérer le publicateur de la publication à l'aide de l'ID de celle-ci
  loadPublisher() {
    commentaire_apiService
      .getCommentairePublisher(this.props.commentaire.id)
      .then((publicateur) => this.setState({ publicateur }));
  }

  //Au chargement du composant, on actualise le publicateur
  componentDidMount() {
    this.loadPublisher();
  }

  render() {
    const { commentaire } = this.props;
    const { publicateur } = this.state;
    return publicateur ? (
      <View style={styles.container}>
        <Text>{commentaire.contenu}</Text>
        <View style={styles.containerBlank}></View>
        <View style={styles.containerBottom}>
          <Text>{publicateur}</Text>
          <Text>{new Date(commentaire.dateEnvoi).toLocaleDateString()}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.containerLoader}>
        <ActivityIndicator size="large" color="#C0E8F7" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    width: "100%",
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "3%",
    marginTop: "2%",
  },
  containerBottom: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  containerBlank: {
    height: 15,
  },
});

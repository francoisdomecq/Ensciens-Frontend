import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";

import Publication from "../services/publication.model";
import PublicationApi from "../services/publication_api.service";
import EvenementApi from "../services/evenement_api.service";
import Evenement from "../services/evenement.model";
import CommentaireModel from "../services/commentaire.model";

interface PublicationsProps extends NavigationProps {
  //Publication passée en props
  publication: Publication;
  //Couleur passée en props (backgroundColor différent en fonction des pages)
  color: string;
}

interface PublicationListState {
  //Evenement associé à la publication (peut être null)
  evenement: Evenement;
  //Commentaires de la publication
  commentaires: Array<CommentaireModel>;
  //Publicateur
  publicateur: String;
}

//Composant utilisé pour afficher les publications. Si l'utilisateur clique dessus, il est redirigé vers l'écran Publication
export default class PublicationItem extends Component<
  PublicationsProps,
  PublicationListState
> {
  constructor(public props: PublicationsProps) {
    super(props);
    this.state = {
      evenement: null!,
      commentaires: [],
      publicateur: "",
    };
  }

  //Cette fonction permet de charger la liste des évènements dans le state
  loadEvenement() {
    if (this.props.publication.EvenementId) {
      EvenementApi.getEvenementFromId(this.props.publication.EvenementId).then(
        (evenement) => this.setState({ evenement })
      );
    }
  }

  //Cette fonction permet de charger la liste des commentaires associés à la publication
  loadComments() {
    PublicationApi.getPublicationComments(this.props.publication.Id).then(
      (commentaires) => {
        this.setState({ commentaires });
      }
    );
  }

  //Cette fonction permet de charger le publicateur de la publication
  loadPublisher() {
    PublicationApi.getPublicationPublisher(this.props.publication.Id).then(
      (publicateur) => this.setState({ publicateur })
    );
  }

  //Au chargement du composant, on charge les commentaires, l'évènement associé à la publication, ainsi que le publicateur
  componentDidMount() {
    this.loadEvenement();
    this.loadComments();
    this.loadPublisher()
  }

  render() {
    const { navigation, publication, color } = this.props;
    const { commentaires, evenement, publicateur } = this.state;
    return (
      <TouchableOpacity
        style={stylesWithProps(color).containerOpacity}
        onPress={() => {
          navigation.navigate("Publication", {
            publicationId: publication.Id,
          });
        }}
      >
        <View style={styles.containerTitleAndImage}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{publication.Titre}</Text>
            <Text style={styles.publicateur}>{publicateur}</Text>
          </View>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.description} numberOfLines={7}>
            {publication.Contenu.length > 0
            //Si la publication n'a pas de contenu, cela signifie que c'est une publication d'annonce d'évènement.
            //Dans ce cas-là, on affiche pas le contenu de la publication mais la description de l'évènement.
              ? publication.Contenu
              : evenement
              ? evenement.Description
              : null}
          </Text>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.commentaires}>
            {`${commentaires.length} commentaires`}
          </Text>
          <Text style={styles.date}>
            {new Date(publication.DatePublication).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerLoader: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "30%",
    borderRadius: 10,
    padding: "3%",
  },

  containerTitleAndImage: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    color: "#191716",
  },
  containerImage: {
    width: "20%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  image: {
    width: 24,
    height: 24,
  },
  containerTitle: {
    flex: 1,
    width: "70%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: "2%",
  },
  publicateur: {
    fontSize: 16,
    fontWeight: "500",
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
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "1%",
  },
  commentaires: {
    fontSize: 14,
    color: "rgba(25, 23, 22, 0.75);",
  },
  date: {
    fontSize: 14,
  },
});

export const stylesWithProps = (color: string) =>
  StyleSheet.create({
    containerOpacity: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      backgroundColor: color,
      padding: "3%",
      borderRadius: 10,
      marginBottom: "3%",
      borderColor: "rgba(0,0,0,0.3)",
      borderRightWidth: 2,
      borderBottomWidth: 2,
    },
  });

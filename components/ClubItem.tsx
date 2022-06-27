import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";
import Club from "../services/club.model";

interface ClubProps extends NavigationProps {
  //Club passé en props
  club: Club;
}

//Composant utilisé dans l'écran Bureau qui permet d'afficher un composant ClubItem
export default class ClubItem extends Component<ClubProps> {
  render() {
    const { club, navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerOpacity}
        //Si l'utilisateur clique sur le composant, il est redirigé vers la page Club
        onPress={() => {
          navigation.navigate("Club", {
            clubId: club.id,
          });
        }}
      >
        <View style={styles.containerTitleAndImage}>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={{
                uri: `https://ensc-ensciens.azurewebsites.net/${club.logo}`,
              }}
            />
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{club.nom}</Text>
          </View>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.description} numberOfLines={7}>
            {club.description}
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
    width: 48,
    height: 48,
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
  containerDescription: {
    flex: 2,
    marginTop: "3%",
  },
  description: {
    color: "#191716",
    fontWeight: "500",
    fontSize: 12,
  },
});

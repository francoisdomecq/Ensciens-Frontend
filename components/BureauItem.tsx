import React, { Component, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProps } from "../navigation/app-stacks";
import Bureau from "../services/bureau.model";

interface BureauProps extends NavigationProps {
  //Bureau passé en props
  bureau: Bureau;
}

//Composant utilisé dans la page Bureaux par le composant BureauList pour afficher une courte description du bureau et rediriger l'utilisateur vers
//une page plus détaillée du bureau lorsque celui-ci clique dessus
export default class BureauItem extends Component<BureauProps> {
  render() {
    const { navigation, bureau } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerOpacity}
        //Si l'utilisateur clique sur le composant BureauItem, il est redirigé vers l'écran Bureau
        onPress={() => {
          navigation.navigate("Bureau", {
            bureauId: bureau.id,
          });
        }}
      >
        <View style={styles.containerTitleAndImage}>
          <View style={styles.containerImage}>
            <Image
              source={{
                uri: `https://ensc-ensciens.azurewebsites.net/${bureau.logo}`,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{bureau.nom}</Text>
          </View>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.description} numberOfLines={7}>
            {bureau.description}
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

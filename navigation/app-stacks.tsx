import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import FilDActualiteScreen from "../screens/FilDActualite";
import ProfilScreen from "../screens/Profil";
import BureauxScreen from "../screens/Bureaux";
import CoupeFamilleScreen from "../screens/CoupeFamille";
import PublicationScreen from "../screens/Publication";
import BureauScreen from "../screens/Bureau";
import ClubScreen from "../screens/Club";
import EleveScreen from "../screens/Eleve";
import AuthFormScreen from "../screens/AuthForm";
import EvenementScreen from "../screens/Evenement";
import UserService from "../services/user.service";
import EvenementsScreen from "../screens/Evenements";
import Eleve from "../services/eleve.model";

// Define view (screen) names and associated params
// Enables type checking and code completion for views
// undefined = no params passed to view
export type RootStackParamList = {
  FilDActualite: undefined;
  Evenements: undefined;
  Profil: undefined;
  Bureaux: undefined;
  CoupeFamille: undefined;
  AuthForm: undefined;
  Publication: {
    publicationId: number;
  };
  Bureau: { bureauId: number };
  Club: { clubId: number };
  Evenement: { evenementId: number };
  Eleve: { eleveId: number };
};

// Base interface for all components using the navigation object
// Enables type checking and code completion for navigation
// Should be inherited to add component-specific props
export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#C0E8F7",
  },
  headerTintColor: "#2196F3",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
};

interface ConnectionProps {
  onConnection: (result: Eleve | undefined) => void;
}


//Stack du fil d'actualité. Depuis le fil d'actualité on peut naviguer vers l'écran Publication
const FilDActualiteStack = createStackNavigator<RootStackParamList>();
export const FilDActualiteStackScreen = () => {
  return (
    <FilDActualiteStack.Navigator screenOptions={stackScreenOptions}>
      <FilDActualiteStack.Screen
        name="FilDActualite"
        options={{ title: "Fil d'actualité" }}
        component={FilDActualiteScreen}
      />
      <FilDActualiteStack.Screen
        name="Publication"
        component={PublicationScreen}
      />
    </FilDActualiteStack.Navigator>
  );
};

//Stack du profil. On lui fait passer les props ConnectionProps pour gérer la déconnexion de l'utilisateur
const ProfilStack = createStackNavigator<RootStackParamList>();
export const ProfilStackScreen = (props: ConnectionProps) => {
  return (
    <ProfilStack.Navigator screenOptions={stackScreenOptions}>
      <ProfilStack.Screen
        name="Profil"
        options={{
          title: "Profil",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                //Lorsque l'utilisateur appuie sur log out, on supprime ses données de l'async storage et on utilise la fonction
                //onConnection pour définir l'utilisateur sur undefined pour afficher l'écran d'authentification
                UserService.disconnect().then(() =>
                  props.onConnection(undefined)
                );
              }}
              style={{
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Ionicons name="md-log-out" size={30} color="#2196F3" />
              <Text
                style={{ fontSize: 8, fontWeight: "700", color: "#2196F3" }}
              >
                Déconnexion
              </Text>
            </TouchableOpacity>
          ),
        }}
        component={ProfilScreen}
      />
    </ProfilStack.Navigator>
  );
};

//Stack des bureaux. 
//Depuis l'écran bureaux, on peut naviguer vers l'écran Bureau d'où on peut naviguer vers les écrans Club, Eleve et Evenement où on peut naviguer vers Publication
const BureauxStack = createStackNavigator<RootStackParamList>();
export const BureauxStackScreen = () => {
  return (
    <BureauxStack.Navigator screenOptions={stackScreenOptions}>
      <BureauxStack.Screen
        name="Bureaux"
        options={{ title: "Bureaux" }}
        component={BureauxScreen}
      />
      <BureauxStack.Screen name="Bureau" component={BureauScreen} />
      <BureauxStack.Screen name="Club" component={ClubScreen} />
      <BureauxStack.Screen name="Publication" component={PublicationScreen} />
      <BureauxStack.Screen name="Eleve" component={EleveScreen} />
      <BureauxStack.Screen name="Evenement" component={EvenementScreen} />
    </BureauxStack.Navigator>
  );
};

//Stack de la coupe des familles. On peut naviguer vers l'écran Eleve depuis l'écran CoupeFamille
const CoupeFamilleStack = createStackNavigator<RootStackParamList>();
export const CoupeFamilleStackScreen = () => {
  return (
    <CoupeFamilleStack.Navigator screenOptions={stackScreenOptions}>
      <CoupeFamilleStack.Screen
        name="CoupeFamille"
        options={{ title: "Coupe des familles" }}
        component={CoupeFamilleScreen}
      />
      <CoupeFamilleStack.Screen name="Eleve" component={EleveScreen} />
    </CoupeFamilleStack.Navigator>
  );
};


//Stack d'authentification
//On lui fait passer les props ConnectionProps pour gérer la connexion
const AuthStack = createStackNavigator<RootStackParamList>();
export const AuthStackScreen = (props: ConnectionProps) => {
  return (
    <AuthStack.Navigator screenOptions={stackScreenOptions}>
      <AuthStack.Screen
        options={{ title: "ENSCIENS" }}
        name="AuthForm"
        children={() => <AuthFormScreen onConnection={props.onConnection} />}
      />
    </AuthStack.Navigator>
  );
};

const EvenementStack = createStackNavigator<RootStackParamList>();
export const EvenementStackScreen = () => {
  return (
    <EvenementStack.Navigator screenOptions={stackScreenOptions}>
      <EvenementStack.Screen
        options={{ title: "Evenements" }}
        name="Evenements"
        component={EvenementsScreen}
      />
      <EvenementStack.Screen name="Evenement" component={EvenementScreen} />
      <EvenementStack.Screen name="Publication" component={PublicationScreen} />
    </EvenementStack.Navigator>
  );
};

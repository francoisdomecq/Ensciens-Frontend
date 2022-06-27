import React, { useState } from "react";
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

import {
  RootStackParamList,
  FilDActualiteStackScreen,
  ProfilStackScreen,
  BureauxStackScreen,
  CoupeFamilleStackScreen,
  AuthStackScreen,
  EvenementStackScreen,
} from "./app-stacks";
import userService from "../services/user.service";
import Eleve from "../services/eleve.model";

const getTabBarIcon = (
  route: { name: string },
  focused: boolean,
  color: string
) => {
  const icons: {
    [key: string]: "home" | "person" | "school" | "trophy" | "calendar";
  } = {
    FilDActualite: "home",
    Profil: "person",
    Bureaux: "school",
    CoupeFamille: "trophy",
    Evenements: "calendar",
  };
  return <Ionicons name={icons[route.name]} size={25} color={color} />;
};

const tabBarOptions: BottomTabBarOptions = {
  style: {
    backgroundColor: "#C0E8F7",
  },
  activeTintColor: "#2196F3",
  inactiveTintColor: "#191716",
  labelStyle: {
    fontSize: 10,
  },
};
const Tab = createBottomTabNavigator<RootStackParamList>();

export function TabNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = React.useState<Eleve | undefined>(undefined);

  function updateUser(result: Eleve | undefined) {
    setIsLoading(false);
    // On change d'utilisateur seulement si on passe de defined <-> undefined
    if (!!user !== !!result) setUser(result);
  }

  userService.getUserConnected().then((result) => updateUser(result));
  return (
    <NavigationContainer>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Tab.Navigator
          tabBarOptions={tabBarOptions}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) =>
              getTabBarIcon(route, focused, color),
          })}
        >
          {user ? (
            <>
              <Tab.Screen
                options={{ title: "Fil d'actualité" }}
                name="FilDActualite"
                component={FilDActualiteStackScreen}
                listeners={({ navigation, route }) => ({
                  tabPress: (e) => {
                    // Prevent default action
                    e.preventDefault();

                    // Do something with the `navigation` object
                    navigation.navigate("FilDActualite");
                  },
                })}
              />
              <Tab.Screen
                options={{ title: "Evenements" }}
                name="Evenements"
                component={EvenementStackScreen}
              />
              <Tab.Screen name="Bureaux" component={BureauxStackScreen} />
              <Tab.Screen
                options={{ title: "Familles" }}
                name="CoupeFamille"
                component={CoupeFamilleStackScreen}
              />
              <Tab.Screen
                name="Profil"
                children={() => <ProfilStackScreen onConnection={updateUser} />}
              />
            </>
          ) : (
            <Tab.Screen
              options={{ title: "" }}
              name="AuthForm"
              children={() => <AuthStackScreen onConnection={updateUser} />}
            />
          )}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

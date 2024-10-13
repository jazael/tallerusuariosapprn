import React, { useState, useContext, FC } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import UserScreen from "./User";

interface Todo {
  id: string;
  text: string;
  status: "pending" | "inProgress" | "completed";
}

type Props = {
  navigation: StackNavigationProp<Record<string, object | undefined>, any>;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Uusarios</Text>
      <UserScreen />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  todoActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  statusButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  pendingButton: {
    backgroundColor: "#FFA000",
  },
  inProgressButton: {
    backgroundColor: "#2196F3",
  },
  completedButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: "#757575",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  pending: {
    borderLeftColor: "#FFA000",
    borderLeftWidth: 5,
  },
  inProgress: {
    borderLeftColor: "#2196F3",
    borderLeftWidth: 5,
  },
  completed: {
    borderLeftColor: "#4CAF50",
    borderLeftWidth: 5,
  },
});

export default HomeScreen;

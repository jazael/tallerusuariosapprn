import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { User } from "../types";

const UserScreen: React.FC = () => {
  const [cedula, setCedula] = useState<string>("");
  const [nombres, setNombres] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<Date>(new Date());
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as User)
    );
    setUsers(userList);
  };

  const handleSave = async (): Promise<void> => {
    try {
      const newUser: User = {
        cedula,
        nombres,
        apellidos,
        sexo,
        fechaNacimiento: fechaNacimiento.toISOString(),
        username,
        password,
      };
      await addDoc(collection(db, "users"), newUser);
      Alert.alert("Usuario guardado exitosamente");
      clearForm();
      fetchUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      Alert.alert("Error al guardar usuario");
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "users", id));
      Alert.alert("Usuario eliminado exitosamente");
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Alert.alert("Error al eliminar usuario");
    }
  };

  const clearForm = (): void => {
    setCedula("");
    setNombres("");
    setApellidos("");
    setSexo("");
    setFechaNacimiento(new Date());
    setUsername("");
    setPassword("");
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text>
        {item.nombres} {item.apellidos}
      </Text>
      <Button
        title="Eliminar"
        onPress={() => item.id && handleDelete(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuarios</Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={nombres}
        onChangeText={setNombres}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />

      <Picker
        selectedValue={sexo}
        onValueChange={(itemValue: string) => setSexo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione sexo" value="" />
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Femenino" value="femenino" />
      </Picker>

      <Button
        title="Seleccionar Fecha de Nacimiento"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate?: Date) => {
            setShowDatePicker(false);
            if (selectedDate) setFechaNacimiento(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Guardar Usuario" onPress={handleSave} />

      <Text style={styles.subtitle}>Lista de Usuarios</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id || ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default UserScreen;

import React from "react";
import { View, StyleSheet, Text, Image,ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearProgress, Card, Button,Icon } from "@rneui/themed";

const Home = () => {
  return (
    <ScrollView>
    <View style={{ flex: 1, margin: "6%" }}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <MaterialIcons
                name="pets"
                size={80}
                color="orange"
                style={{ alignSelf: "center" }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  fontWeight: "bold",
                  fontFamily: "sans-serif-condensed",
                }}
              >
                AQUI ESTOY
              </Text>
            </View>
          </View>

          <View style={styles.user}>
            <FontAwesome
              name="user-circle"
              size={64}
              color="black"
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{ textAlign: "center", fontFamily: "sans-serif-light" }}
            >
              Usuario77
            </Text>
          </View>
        </View>
      </View>
      <LinearProgress
        value={0}
        variant="determinate"
        style={{ width: "100%" }}
        color="purple"
      />
      <Text style={{ fontSize: 15, backgroundColor:"#F5EEF8" }}>
        Por un mundo mejor para nuestras mascotas
      </Text>
      <LinearProgress
        value={0}
        variant="determinate"
        style={{ width: "100%" }}
        color="purple"
      />
      <Image style={{width:300,height:100,resizeMode:"stretch", alignSelf:'center'}} source={{uri:'https://controlpublicidad.com/uploads/2022/03/anuncio-colegio-de-veterinarios-2022-120559.jpg'}}></Image>
      <Card>
          <Card.Title>PERRO ENCONTRADO</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://cdn.milenio.com/uploads/media/2022/07/13/comer-piedras-causar-muerte-perro.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis interdum odio, ut auctor nisi fringilla at. Ut accumsan porta justo, sed congue ex iaculis non
          </Text>
          <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Seguir leyendo"
          />
        </Card>
        <Card>
          <Card.Title>PERRO ENCONTRADO</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://cdn.milenio.com/uploads/media/2022/07/13/comer-piedras-causar-muerte-perro.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis interdum odio, ut auctor nisi fringilla at. Ut accumsan porta justo, sed congue ex iaculis non
          </Text>
          <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Seguir leyendo"
          />
        </Card>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  top: {
    flex: 3,
    backgroundColor: "#E8DAEF",
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: "2%",
    marginTop: "2%",
  },

  user: {
    flex: 1,
    marginLeft: "6%",
    marginBottom: "2%",
    marginTop: "5%",
  },
});

export default Home;

import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home"
import Prueba from "./screens/Prueba"
import Notifications from "./screens/Notifications"
import Settings from "./screens/Settings"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'purple',
                tabBarActiveBackgroundColor:'',
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel:'Principal',
                tabBarIcon: ({color,size})=>(
                    <MaterialCommunityIcons name="home" size={size} color={color} />
                ),
                headerShown:false,
            }}/>
            <Tab.Screen name="Prueba" component={Prueba} options={{
                tabBarIcon: ({color,size})=>(
                    <MaterialCommunityIcons name="post" size={size} color={color} />
                ),
                
            }}/>
            <Tab.Screen name="Notifications" component={Notifications} options={{
                tabBarIcon: ({color,size})=>(
                    <MaterialCommunityIcons name="bell" size={size} color={color} />
                ),
                tabBarBadge:3,
                
            }} />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({color,size})=>(
                    <MaterialCommunityIcons name="tools" size={size} color={color} />
                ),
                
            }}/>
        </Tab.Navigator>
    );
}
export default function Navigation(){
    return (
        <NavigationContainer>
            <MyTabs></MyTabs>
        </NavigationContainer>
    );
}
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Home from '../Pages/Home';
import Busca from '../Pages/Busca';
import Login from '../Pages/Login';
import Observacao from '../Pages/Observacao';
import Perfil from '../Pages/Perfil';
import Inserir from '../Pages/Inserir';
import Cadastro from '../Pages/Cadastro'

const Tab = createBottomTabNavigator();

export default function Rotas() {

    const { logado, cadastro, setCadastro } = useContext(AuthContext);

    if (!logado && !cadastro ) {
        return (<Login />)
    }
    if (!logado && cadastro) {
        return (<Cadastro/>)
    }


    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: 'white',
                    },
                    tabBarActiveTintColor: "white"
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={'black'} size={size} />
                        ),
                    }}
                />
                
                
                <Tab.Screen
                    name="Videos"
                    component={Observacao}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="youtube-tv" color={'black'} size={size} />
                        ),
                    }}
                />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}
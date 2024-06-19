import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    

    const { Login, error, setCadastro } = useContext(AuthContext);

    function RealizaLogin() {
       Login( email, senha );
    }


    return (
        
        <ScrollView contentContainerStyle={css.container}>
            
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 200 }}>FINDME</Text>
            
            <View style={{flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#840000",
        marginBottom: 200}}>
            <TextInput
                inputMode="email"
                placeholder="Email do Usuário"
                style={css.input}
                value={email}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="white"
            />
            <TextInput
                inputMode="text"
                placeholder="Password"
                secureTextEntry={true}
                style={css.input}
                value={senha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="white"
            />
            
            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                <Text style={css.btnLoginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => setCadastro( true )}>
                <Text style={css.Text}> Cadastre-se aqui</Text>
            </TouchableOpacity>
            {error &&
                <View style={css.error}>
                    <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
                </View>
            }
            </View>
        </ScrollView>
    )
}
const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#840000"
    },
    logo: {
        width: "100%",
        resizeMode: "contain"
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#8b0000",
        color: "black"
    },
    forgot: {
        width: "90%",
        marginTop: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgotText: {
        color: "black",
        fontWeight: "bold"
    },
    btnLogin: {
        width: "90%",
        height: 50,

        borderRadius: 10,

        marginTop: 10,
        backgroundColor: "#640b0b"
    },
    btnLoginText: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    error: {
        width: "100%",
        height: 50,
        marginTop: 30
    },
    errorText: {
        color: "black",
        textAlign: "center"
    },
    Text:{
        color: "white",
        fontWeight: "bold",
        
    },
});
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function Inserir() {

  const { setCadastro } = useContext( AuthContext );

    const[ usuarioNome, setNome] = useState("")
    const[ usuarioEmail, setEmail] = useState("")
    const[ usuarioSenha, setSenha] = useState("")
    const[ usuarioTelefone, setTelefone] = useState("")
    const[sucesso, setSucesso] = useState(false)
    const[erro, setErro] = useState(false)

    async function Cadastro(){
        {
            await fetch('http://10.139.75.41:5251/api/Usuarios/CreateUsuario', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify ({
                usuarioNome: usuarioNome,
                usuarioEmail: usuarioEmail,
                usuarioSenha: usuarioSenha,
                usuarioTelefone: usuarioTelefone
                
              })
            })
              .then( res => (res.ok == true) ? res.json() : false)
              .then(json => console.log(json))
              .catch(err => setErro(true))
              
          }
    }

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#B03EE5'}}>
       
        <View style={css.caixatexto}>
          <Text style={css.textcadastro} >Cadastre-Se</Text>
        </View> 
        { sucesso ? <Text>Cadastro Realizado!</Text> :
        <> 
        <TextInput style={css.input}
            placeholder=" Nome" placeholderTextColor={'white'} onChangeText={(digitado) => setNome(digitado)} TextInput={usuarioNome}
        />
        <TextInput style={css.input}
            placeholder=" Email" placeholderTextColor={'white'} onChangeText={(digitado) => setEmail(digitado)} TextInput={usuarioEmail}
        />
        <TextInput style={css.input}
            placeholder=" Telefone" placeholderTextColor={'white'} onChangeText={(digitado) => setTelefone(digitado)} TextInput={usuarioTelefone}
        />
        <TextInput style={css.input}
            placeholder=" Senha" placeholderTextColor={'white'} onChangeText={(digitado) => setSenha(digitado)} TextInput={usuarioSenha}
        />
        </> 
        }
        { erro && <Text>ERRADO</Text>}

      <TouchableOpacity style={css.btnLogin} onPress={Cadastro}><Text style={css.btnLoginText}>Realizar Cadastro</Text></TouchableOpacity>
      <TouchableOpacity style={css.btnCadastro} onPress={() => setCadastro( false ) }><Text style={css.btnCadastroText} >Voltar para o Login</Text></TouchableOpacity>
    </ScrollView>
  )
}

const css = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#262626",
    color: "white"
    },
    btnLogin: {
      width: "90%",
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 30,
      backgroundColor: "#8B33FF"
    },
    btnLoginText: {
      color: "white",
      lineHeight: 45,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "bold"
    },
    btnCadastro: {
      width: "90%",
      marginTop: 10,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    btnCadastroText: {
      color: "white",
      fontWeight: "bold"
    },
    caixatexto:{
      marginBottom: "10%",
      color:"white"
    },
    textcadastro:{
       fontSize: 25,
       color: "white"
    },
    logo: {
      width: "50%",
      resizeMode: "contain"
  }
})

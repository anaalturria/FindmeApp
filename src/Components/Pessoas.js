import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';




export default function Pessoas(
    {navigation, 
    pessoaNome,
    pessoaRoupa, 
    pessoaCor, 
    pessoaSexo, 
    pessoaObservacao, 
    pessoaLocalDesaparecimento, 
    pessoaFoto, 
    pessoaDtDesaparecimento, 
    pessoaDtEncontro,
    pessoaStatus


    
}) {

    const { setNovaobs } = useContext( AuthContext );
  
    const [exibe, setExibe] = useState(false); 
    const [mostra, setMostra] = useState(false); 
    const [ criaObs, setCriaobs ] = useState(false);
    const[ observacoes, setObservacoes ] = useState([]);
    const[ error, setError ] = useState(false)
    const[ observacoesDescricao, setObservacoesDescricao] = useState("")
    const[ observacoesLocal, setObservacoesLocal] = useState("")
    const[ observacoesData, setObservacoesData] = useState("")
    const[ pessoaId, setPessoaId] = useState("")
    const[ usuarioId, setUsuarioId] = useState("")
    const[sucesso, setSucesso] = useState(false)
    const[erro, setErro] = useState(false)



    async function NovaOBS() {
        await fetch('http://10.139.75.41:5251/api/Observacoes/CreateObservacoes', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            observacoesDescricao: observacoesDescricao,
            observacoesLocal: observacoesLocal,
            observacoesData: observacoesData,
            pessoaId: pessoaId, // Ensure this has a valid value
            usuarioId: usuarioId, // Ensure this has a valid value
          })
        })
          .then(res =>res.json()) 
            .catch(err => console.log(err))
        }


    const FuncionaDetalhe = () => {
        setExibe(!exibe); 
    };

    const FuncionaOBS = () => {
        setExibe(!mostra); 
    };


        
    
      
    return (
        <View>
            
        <View style={css.caixagrandona}>
        
           <View style={css.caixaindividual}>
            <View style={css.Textealinha}>
            <View>
                <Image style={css.fotona} source={{ uri: pessoaFoto }}  ></Image>
            </View>
          <View style={css.infoexibe}>
          <View style={css.caixanomepessoa}>
                <Text style={css.nomepessoa}>{pessoaNome}</Text>
            </View>     
            <TouchableOpacity style={css.btnDetalhes} onPress={FuncionaDetalhe}>
                <Text style={css.btnDetalhesText}>
                    {exibe ? 'Fechar Detalhes' : 'Detalhes'}
                </Text>
            </TouchableOpacity>
          </View> 
            </View>
           </View>
                {exibe && ( 
                    <View style={css.caixaitens}>
                    <Text style={css.tipo}>{pessoaRoupa}</Text>
                    <Text style={css.valor}>{pessoaCor}</Text>
                    <Text style={css.descricaoproduto}>{pessoaObservacao}</Text>
                    <Text style={css.descricaoproduto}>{pessoaSexo}</Text>
                    <Text style={css.descricaoproduto}>{pessoaLocalDesaparecimento}</Text>
                    <Text style={css.descricaoproduto}>{pessoaDtDesaparecimento}</Text>
                    <Text style={css.descricaoproduto}>{pessoaDtEncontro}</Text> 
                    <Text style={css.descricaoproduto}>{pessoaStatus}</Text> 
                    <View>
                    <View style={css.caixatexto}>
          <Text style={css.textcadastro} >Cadastre-Se</Text>
        </View> 
        { sucesso ? <Text>Cadastro Realizado!</Text> :
        <> 
        <TextInput style={css.input}
            placeholder="descrição" placeholderTextColor={'white'} onChangeText={(digitado) => setObservacoesDescricao(digitado)} TextInput={observacoesDescricao}
        />
        <TextInput style={css.input}
            placeholder="local" placeholderTextColor={'white'} onChangeText={(digitado) => setObservacoesLocal(digitado)} TextInput={observacoesLocal}
        />
        <TextInput style={css.input}
            placeholder="data" placeholderTextColor={'white'} onChangeText={(digitado) => setObservacoesData(digitado)} TextInput={observacoesData}
        />
        <TextInput style={css.input}
            placeholder="pessoa" placeholderTextColor={'white'} onChangeText={(digitado) => setPessoaId(digitado)} TextInput={pessoaId}
        />
        <TextInput style={css.input}
            placeholder="usuario" placeholderTextColor={'white'} onChangeText={(digitado) => setUsuarioId(digitado)} TextInput={usuarioId}
        />
        </> 
        }
    

      <TouchableOpacity style={css.btnLogin} onPress={NovaOBS}><Text style={css.btnLoginText}>Realizar Cadastro</Text></TouchableOpacity>
      
                    </View>
                    </View>
                    
                    
                    )} 
</View>

        </View>

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
        }, container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3ff',
        
      },
    caixagrandona: {
        alignItems: 'center',
        marginTop: 50
    }, icone: {
        width: 100,
        height: 50,
        marginTop: 20
    },
    infoexibe: {
        flexDirection: 'column'
        
    }, fotona: {
        padding: 50,
        marginRight: 60,
        marginTop: 45

    }, caixaindividual: {
        width: "95%",
        height: 150,
        backgroundColor: "#640b0b",
        borderRadius: 5,
        justifyContent:"center",
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        borderBottomColor: 'white',
        borderColor: 'white'
        
    }, Textealinha: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 40,
        borderBottomColor: 'white',
    }

})
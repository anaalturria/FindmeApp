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
                <Image style={{padding: 50,
                                marginRight: 100,
                                marginTop: 45}} 
                        source={{ uri: pessoaFoto }}  ></Image>
            </View>
          <View style={{alignItems: 'center', marginTop: 30}}>
          <View style={css.caixanomepessoa}>
                <Text style={css.nomepessoa}>{pessoaNome}</Text>
            </View>     
            <TouchableOpacity style={css.btnDetalhes} onPress={FuncionaDetalhe}>
                <Text style={{color: 'white', marginTop: 10}}>
                    {exibe ? 'Fechar Detalhes' : 'Detalhes'}
                </Text>
            </TouchableOpacity>
          </View> 
            </View>
           </View>
                {exibe && ( 
                    <View style={{alignItems: 'center', 
                                    backgroundColor: '#900020',
                                    marginTop: 10,
                                    borderRadius: 10,
                                    width: 350,
                                    height: 650
                                    }}>
                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Roupa que estava usando:  </Text>
                        <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaRoupa}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Cor do individuo:  </Text>
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaCor}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>observação do individuo:  </Text>
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaObservacao}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Sexo do individuo:  </Text>
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaSexo}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Local no qual desapareceu:  </Text>
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaLocalDesaparecimento}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Dia no qual desapareceu:  </Text>
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaDtDesaparecimento}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Dia no qual foi encontrado:  </Text> 
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaDtEncontro}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Status do individuo:  </Text> 
                    <Text style={{color: 'white', fontStyle:'italic'}}>{pessoaStatus}</Text>
                    </View>
                    
                    <View>
                    <View style={css.caixatexto}>
          <Text style={{color: 'white', fontSize: 15, marginTop: 10, fontWeight: 'bold'}}> Envie uma nova observação para nosso sistema!</Text>
        </View> 
        { sucesso ? <Text>Observação enviada com sucesso!</Text> :
        <View style={{alignItems: 'center', marginTop: 10}}> 
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
        <TouchableOpacity style={{backgroundColor: '#640b0b', width: 100, alignItems: 'center', borderRadius: 10}} onPress={NovaOBS}><Text style={{color: 'white'}}>Enviar nova observação</Text></TouchableOpacity>
        </View> 
        }
    


      
                    </View>
                    </View>
                    
                    
                    )} 
</View>

        </View>

  )
}
const css = StyleSheet.create({
    nomepessoa : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
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
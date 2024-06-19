import { View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Observacao() {

    const[observacaos, setObservacaos] = useState([]);
    const[error, setError] = useState(false);
    const[edicao, setEdicao] = useState(false);
    const[observacoesId, setObservacoesId] = useState(0);
    const[observacoesLocal, setObservacoesLocal] = useState();
    const[observacoesData, setObservacoesData] = useState();
    const[observacoesDescricao, setObservacoesDescricao] = useState();
    const[pessoaId, setPessoaId] = useState();
    const[usuarioId, setUsuarioId] = useState();
    const[deleteResposta, setResposta] = useState(false);
  
    async function getObservacaos()
    {
      await fetch('http://10.139.75.41:5251/api/Observacoes/GetAllObservacoes',{
              method: 'GET',
              headers: {
                  'content-type' : 'application/json'
              }
          })
          .then( res => res.json())
          .then(json => setObservacaos(json))
          .catch(err => setError(true))
    }
  
    async function getObservacao(id)
    {    
      await fetch('http://10.139.75.41:5251/api/Observacoes/GetObservacoesId/' + id,{
              method: 'GET',
              headers: {
                  'Content-type' : 'application/json; charset=UTF-8',
              },
          })
          .then((response)=> response.json())        
          .then(json=>{
            setObservacoesId(json.observacoesId);
            setObservacoesLocal(json.observacoesLocal);
            setObservacoesData(json.observacoesData);
            setObservacoesDescricao(json.observacoesDescricao);
            setPessoaId(json.pessoaId);
            setUsuarioId(json.usuarioId);
          });
    }

    async function editObservacao()
    {    
      await fetch('http://10.139.75.41:5251/api/Observacoes/UpdateObservacoes/' + observacoesId,{
              method: 'PUT',
              headers: {
                  'Content-type' : 'application/json; charset=UTF-8',
              },
              body: JSON.stringify({
                observacoesId: observacoesId,
                observacoesLocal: observacoesLocal,
                observacoesData: observacoesData,
                observacoesDescricao: observacoesDescricao,
                pessoaId: pessoaId,
                usuarioId: usuarioId
              })
          })
          .then( (response) => response.json())
          .catch(err => console.log(err));
          getObservacaos();
          setEdicao(false);
    }
  
    function showAlert(id, observacoesLocal) {
      Alert.alert(
        '',
        'Deseja realmente excluir esse usuario?',
        [
          { text: 'Sim', onPress: () => deleteObservacao(id, observacoesLocal) },
          { text: 'Não', onPress: () => ('') }
        ],
        { cancelable: false }
      );
    }
  
    async function deleteObservacao(id, observacoesLocal) {
      await fetch('http://10.139.75.41:5251/api/Observacoes/DeleteObservacoes/' + id,{
              method: 'DELETE',
              headers: {
                  'Content-type' : 'application/json; charset=UTF-8',
              },
          })
          .then(res => res.json())
          .then(json => setResposta(json))
          .catch(err => setError(true))
  
          if(deleteResposta == true)
            {
              Alert.alert(
                '',
                'Usuario ' + observacoesLocal + 'não foi excluido com sucesso',
                [
                  { text: '', onPress: () => ('')},
                  { text: 'Ok', onPress: () => ('')},
                ],
                { cancelable: false}
              );
              getObservacaos();
            }
            else{
              Alert.alert(
                '',
                'Usuario ' + observacoesLocal + 'foi excluido com sucesso',
                [
                  { text: '', onPress: () => ('')},
                  { text: 'Ok', onPress: () => ('')},
                ],
                { cancelable: false}
              );
              getObservacaos();
            }
  
    }
  
    useEffect(()=>{
      getObservacaos();
    },[]);
  
    useFocusEffect(
      React.useCallback(()=>{
        getObservacaos();
      },[])
    );

  return (
    <View style={{ alignItems: 'center'}}>
      <View style={{ marginTop: 20}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black',  }}>Observações gerais</Text>
      </View>
      {edicao == false ?
    <FlatList
    style={css.flat}
    data={observacaos}
    keyExtractor={(item) => item.observacoesId}
    renderItem={({item})=>(
      <View style={css.caixaind}>
          
          <View style={css.caixaind2}>
          <Text style={{ color: 'white'}}>{item.observacoesData}</Text>
          <Text style={{ color: 'white'}}>{item.observacoesDescricao}</Text>
          <Text style={{ color: 'white'}}>{item.observacoesLocal}</Text>
          <Text style={{ color: 'white'}}>{item.pessoaId}</Text>
          <Text style={{ color: 'white'}}>{item.usuarioId}</Text>
          </View>
        <View style={css.caixabotao}>
        <TouchableOpacity style={{ backgroundColor: '#640b0b'}} onPress={() => {setEdicao(true); getObservacao(item.observacoesId)}}>
          <Text style={{ color: 'white'}}>EDITAR   </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#640b0b'}}  onPress={()=> showAlert(item.observacoesId, item.observacoesLocal)}>
          <Text style={{ color: 'white'}}>EXCLUIR</Text>
        </TouchableOpacity>
        </View>
      
      </View>
    )}
    />

  :
  <View style={{ width: 250, 
  height: 300, 
  backgroundColor: '#8b0000', 
  marginTop: 200, 
  borderRadius: 10,
  alignItems: 'center'
  }}>
    <TextInput
    inputMode="text"
    value={observacoesData}
    onChangeText={(digitado)=> setObservacoesData(digitado)}
    style={{ color: 'white', marginTop: 50}}
    />
    <TextInput
    inputMode="text"
    style={{ color: 'white'}}
    value={observacoesDescricao}
    onChangeText={(digitado)=> setObservacoesDescricao(digitado)}
  
    />
    <TextInput
    inputMode="text"   
    style={{ color: 'white'}}
    value={observacoesLocal}
    onChangeText={(digitado)=> setObservacoesLocal(digitado)}
  
    />
    <TextInput
    inputMode='numeric'
    
    value={pessoaId}
    onChangeText={(digitado)=> setPessoaId(digitado)}
    style={{ backgroundColor: '#640b0b', color: 'white', borderRadius: 10, marginTop: 5}}   
    />
    <TextInput
    inputMode='numeric'
    value={usuarioId}
    onChangeText={(digitado)=> setUsuarioId(digitado)}
    style={{ backgroundColor: '#640b0b', color: 'white', borderRadius: 10, marginTop: 5}}    

    />
    <TouchableOpacity style={{ alignItems: 'center'}} onPress={()=>editObservacao()}>
      <Text style={{ color: 'white'}}>SALVAR</Text>
    </TouchableOpacity>
  </View>

}
</View>
  )
}
const css = StyleSheet.create({
    container:{
      flexGrow: 1,
      backgroundColor:'white',
      alignItems:'center',
      marginTop: 20
    },
    searchBox: {
      width: "80%",
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      padding: 15,
      marginBottom: 25,
      color:"white",
      backgroundColor: "gray"
  
  }, caixaind: {
    backgroundColor: '#800000',
    width: 250,
    height: 180,
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 15
    
  }, caixaind2: {
    marginTop: 20,
    
  }, caixabotao: {
    flexDirection: 'row',
    marginTop: 20
  }
  })
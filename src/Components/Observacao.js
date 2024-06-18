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
    const[ pessoas, setPessoas ] = useState([]);

  
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
    <View style={css.container}>
      {edicao == false ?
        <FlatList
          style={css.flat}
          data={observacaos}
          keyExtractor={(item) => item.observacoesId}
          renderItem={({item})=>(
            <View >
                <Text>
                {item.observacoesLocal}
                   <TouchableOpacity style={css.btnEdit} onPress={() => {setEdicao(true); getObservacao(item.observacoesId)}}>
                      <Text style={css.btnLoginText}>EDITAR   </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.btnDelete} onPress={()=> showAlert(item.observacoesId, item.observacoesLocal)}>
                      <Text style={css.btnLoginText}>EXCLUIR</Text>
                    </TouchableOpacity>
                </Text>
            </View>
    )}
    />

  :
  <View style={css.editar}>
    <TextInput
    inputMode="text"
    style={css.input}
    value={observacoesLocal}
    onChangeText={(digitado)=> setObservacoesLocal(digitado)}
    placeholderTextColor="black"   
    />
    <TextInput
    inputMode="text"
    style={css.input}
    value={observacoesData}
    onChangeText={(digitado)=> setObservacoesData(digitado)}
    placeholderTextColor="black"   
    />
    <TextInput
    inputMode="text"
    secureTextEntry={true}
    style={css.input}
    value={observacoesDescricao}
    onChangeText={(digitado)=> setObservacoesDescricao(digitado)}
    placeholderTextColor="black"    
    />
    <TextInput
    inputMode="text"
    secureTextEntry={true}
    style={css.input}
    value={pessoaId}
    onChangeText={(digitado)=> setPessoaId(digitado)}
    placeholderTextColor="black"    
    />
    <TextInput
    inputMode="text"
    secureTextEntry={true}
    style={css.input}
    value={usuarioId}
    onChangeText={(digitado)=> setUsuarioId(digitado)}
    placeholderTextColor="black"    
    />
    <TouchableOpacity styele={css.btnCreate} onPress={()=>editObservacao()}>
      <Text styel={css.btnLoginText}>SALVAR</Text>
    </TouchableOpacity>
  </View>

}
</View>
  )
}
const css = StyleSheet.create({
    container:{
      flexGrow: 1,
      backgroundColor:'red',
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
    backgroundColor: 'red'
  }
  })
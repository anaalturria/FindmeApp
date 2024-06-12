import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';


import Pessoas from '../Components/Pessoas';
import Produto from '../Components/Produto';


export default function Home() {

  const[ pessoas, setPessoas ] = useState([]);
  const[ observacoes, setObservacoes ] = useState([]);
  const[ error, setError ] = useState(false)

  async function getPessoas() {
    await fetch('http://10.139.75.41:5251/api/Pessoas/GetAllPessoas', {
      method: 'GET',
      headers: {
          'content-type' : 'application/json'
      },
      
  })
  .then( res => (res.ok == true) ? res.json() : false )
  .then( json => setPessoas(json) )
      .catch( err => setError( true ))
  } 
  
  useEffect(() => {
    getPessoas();
  }, [] )





  return (
    <View>
      {   pessoas.length > 0 ?
          <FlatList
              data={pessoas}
              renderItem={({ item }) =>
              <Pessoas
              pessoaNome={item.pessoaNome}
              pessoaRoupa={item.pessoaRoupa}
              pessoaFoto={item.pessoaFoto}
              pessoaCor={item.pessoaCor}
              pessoaSexo={item.pessoaSexo}
              pessoaObservacao={item.pessoaObservacao}
              pessoaLocalDesaparecimento={item.pessoaLocalDesaparecimento}
              pessoaDtDesaparecimento={item.pessoaDtDesaparecimento}
              pessoaDtEncontro={item.pessoaDtEncontro}
              
              />
             

            }
            
          keyExtractor={(item) => item.id}
          
        />   /*<Detalhes 
                observacoesDescricao={item.observacoesDescricao}
                observacoesLocal={item.observacoesLocal}
                observacoesData={item.observacoesData}
                pessoaId={item.pessoaId}
                usuarioId={item.usuarioId}
              />  */
        : <ActivityIndicator size='large' color="#00ff00"/>
      } 


      

      </View>
      
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  },
  stories: {
    width: "100%",
    height: 100
  }
})
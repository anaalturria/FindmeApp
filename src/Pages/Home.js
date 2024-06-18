import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';


import Pessoas from '../Components/Pessoas';



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
      <View style={css.container}>
                <Image style={css.icone} source={require("../../assets/IconeFindmePNG.png")}></Image>
                <Text>Welcome</Text>
            </View>
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
              pessoaStatus={item.pessoaStatus}
              
              />
             

            }
            
          keyExtractor={(item) => item.id}
          
        />   
        : <ActivityIndicator size='large' color="#00ff00"/>
      } 


      

      </View>
      
  )
}
const css = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f3ff'
    }, icone: {
      width: 100,
      height: 50,
      marginTop: 80
  }

})
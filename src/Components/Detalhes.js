import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Detalhes(  
    observacoesDescricao,
    observacoesLocal,
    observacoesData,
    pessoaId,
    usuarioId) {

        const[ observacoes, setObservacoes ] = useState([]);
        const[ error, setError ] = useState(false)

        async function getObservacoes() {
            await fetch('http://10.139.75.41:5251/api/Observacoes/GetAllObservacoes', {
              method: 'GET',
              headers: {
                  'content-type' : 'application/json'
              },
              
          })
          .then( res => (res.ok == true) ? res.json() : false )
          .then( json => setObservacoes(json) )
              .catch( err => setError( true ))
          } 
        
          
          useEffect(() => {
            getObservacoes();
          }, [] )

  return (

      <View>
        <Text>{observacoesDescricao}</Text>
      </View>
    

)}
const styles = StyleSheet.create({
    
    
})

import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import Produto from './Produto';
import Observacao from './Observacao';


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
    
}) {
  
    const [exibe, setExibe] = useState(false); 
    const [ criaObs, setCriaobs ] = useState(false);
    const[ observacoes, setObservacoes ] = useState([]);
  const[ error, setError ] = useState(false)
   

        const FuncionaDetalhe = () => {
            setExibe(!exibe); 
        };
    
        const FuncObserva = () => {
            setCriaobs(!criaObs); 
            
        };

       

    
    return (
        <View style={css.caixagrandona}>
            <View style={css.caixatextaoreto}>
                <Text style={css.titulofotao}>{pessoaNome}</Text>
            </View>     
            <TouchableOpacity style={css.btnDetalhes} onPress={FuncionaDetalhe}>
                <Text style={css.btnDetalhesText}>
                    {exibe ? 'Fechar Detalhes' : 'Detalhes'}
                </Text>
            </TouchableOpacity>
                {exibe && ( 
                    <View style={css.detalhesModal}>
                        <View style={css.detalhesModal}>
                        <Text style={css.tipo}>{pessoaRoupa}</Text>
                    </View>
                    <Text style={css.valor}>{pessoaCor}</Text>
                    <Text style={css.descricaoproduto}>{pessoaObservacao}</Text>
                    <Text style={css.descricaoproduto}>{pessoaSexo}</Text>
                    <Text style={css.descricaoproduto}>{pessoaLocalDesaparecimento}</Text>
                    <Text style={css.descricaoproduto}>{pessoaFoto}</Text>
                    <Text style={css.descricaoproduto}>{pessoaDtDesaparecimento}</Text>
                    <Text style={css.descricaoproduto}>{pessoaDtEncontro}</Text>
                    <TouchableOpacity style={css.btnDetalhes} onPress={FuncObserva}>
                        <Text style={css.btnDetalhesText}>
                            {criaObs ? 'Ocultar' : 'Criar nova Observação'}
                        </Text>
                    </TouchableOpacity>
                 {criaObs && (  
                    <Observacao/>
                    
                )}
                </View>
        
      )} 
        
        </View>

  )
}
const css = StyleSheet.create({
    
    caixagrandona: {
        marginTop: 80,
        

    }, caixatextaoreto: {
        flexDirection: 'row', 
        marginLeft: 10,
        alignItems: 'center'

    }, circleAvatar: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 15

    }, titulofotao: {
      marginBottom: 10,
      marginLeft: 10,
      fontWeight: "bold",
      fontSize: 12

    }, fotonaalinha: {
        alignItems: 'center'


    }, tipo: {
        marginBottom: 10,
        color: 'blue',
        textAlign: 'center'

    }, fotao: {
        width: 380,
        height: 380,
        


    }, valor: {
        textAlign: 'center',
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 20,
        

    }, descricaoproduto: {
        fontStyle:'italic',
        marginLeft: 10,
        marginTop: 10
    }
})
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";

export default function SelecionarAssento (){
    const { idSessao} = useParams()
    const [info, setInfo] = useState([])

    useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    const promisse = axios.get(URL)
    
    promisse.then(res => {
        
        console.log(res.data)
    })

    promisse.catch((erro) => {
        console.log(erro.response.data)
    })
    
    }, [])

    

    return(
        <Main>
            <p>Selecione o(s) assento(s)</p>
        </Main>
    )
}

const Main = styled.div`
    height: auto;
    width: 400px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;


    p{
        font-size: 24px;
        color: #293845;
        font-family: "Roboto", sans-serif;
    }
`
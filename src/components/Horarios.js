import styled from "styled-components";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function SelecionarHorario({setDados}) {
    const [horarios, setHorarios] = useState([]);
    const [dias, setDias] = useState([]);
    const { idMovie } = useParams();

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);

        promisse.then(res => {
            setHorarios(res.data)
            setDias(res.data.days)
            
        })

        promisse.catch((erro) => {
            console.log(erro.response.data)
        })
        
    }, [])

    
    
    return (
        <Main>
            <p>Selecione o horário</p>
            {dias.map((h) => <HoraFilme key={h.id} dia={h.weekday} data={h.date} dado={horarios.id} botao1={h.showtimes[0].name}  botao2={h.showtimes[1].name} />)}
            <DadosFilme>
                <img src={horarios.posterURL} />
                <p>{horarios.title}</p>        
            </DadosFilme>
        </Main>
        
    )
}   

function HoraFilme(props){

    return(
        <Dia> 
            <p>{props.dia} - {props.data}</p>
               <div>
               <Link to={`/assentos/${props.dado}`}>
                    <BotaoHora >
                        <p>{props.botao1}</p>
                    </BotaoHora>
                </Link>
                <Link to={`/assentos/${props.dado}`}>
                    <BotaoHora >
                        <p>{props.botao2}</p>
                    </BotaoHora>
                </Link>
               </div>      
        </Dia>
        
    )
}



const Main = styled.div`
width: 400px;
height: auto;
margin: auto;
    p{
        font-size: 21px;
        color: #293845;
        margin: 40px 50px;
        font-family: 'Roboto', sans-serif;
    }
`
const Dia = styled.div`
    p {
    font-size: 18px;
    color: black;
    margin: 40px 0px;
    font-family: 'Roboto', sans-serif;
    }
    div{
        display: flex;
    }
    link{
        text-decoration: none;
    }
`
const BotaoHora = styled.div`

background-color: #E8833A;
width: 83px;
height: 43px;
border-radius: 3px;
margin: 3px;
display: flex;
justify-content: center;
align-items: center;


    p{
        color:white;
        font-size: 18px;
        text-decoration: none;
    }
    :hover{
        cursor: pointer;
    }
    
`
const DadosFilme = styled.div`
margin: 30px 0px;
width:100%;
height: 117px;
background-color: #DFE6ED;
display: flex;
box-sizing: border-box;
padding: 10px;
align-items: center;

    img{
        height: 72px;
        width: 48px;
        border: 6px solid white;
    }

    p {
        color: #293845;
        font-size: 24px;
        font-family: 'Roboto', sans-serif;
        margin-left: 10px;
    }
`
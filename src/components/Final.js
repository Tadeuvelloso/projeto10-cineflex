import styled from "styled-components"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"


export default function Sucesso({dados, places, identidade, documento}){

    const[datahr, setDatahr] = useState([])
    const[titulo, setTitulo] = useState([])

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${dados}/showtimes`);

        promisse.then(res => {
            setDatahr(res.data.movie)
            setTitulo(res.data.day)
        })

        promisse.catch((erro) => {
            console.log(erro.response.data)
        })
        
    }, [])

    function voltaHome (){
        Navigate("/")
    }

    return(
        <Main>
            <h2>Pedido feito com sucesso!</h2>
            <Padrão>
                <h1>Filme e sessão</h1>
                <p>{}</p>
                <p>{titulo.week} - Horarios</p>
            </Padrão>
            <Padrão>
                <h1>Ingressos</h1>
                {places.map((l) => <p>Assento {l}</p>)}
            </Padrão>
            <Padrão>
                <h1>Comprador</h1>
                <p>Nome:</p>
                <p>CPF:</p>
            </Padrão>
            <button onClick={voltaHome}>Voltar pra Home</button>
        </Main>
       
    )
}

const Main = styled.div`
width: 375px;
height: auto;
margin: auto;
font-family: "roboto", sans-serif;

    h2{
        color:#247A6B;
        font-size: 24px;
        font-weight: 700;
        line-height: 30px;
        margin: 50px 100px;
        text-align: center;
    }

    h1{
        font-size: 24px;
        font-weight: bold;
        margin: 15px 0px;
    }

    button{
        color: white;
        font-size: 18px;
        width:225px;
        height: 42px;
        background-color: #E8833A;
        display: flex;
        justify-content: center;
        align-items: center;
        border:none;
        margin:60px auto;
    }

    p{
        font-size: 22px;
        font-weight: 300;
        line-height: 30px;
    }
`
const Padrão = styled.div`

`
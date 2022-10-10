import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"


export default function Sucesso({dados, places, identidade, documento}){

    const[datahr, setDatahr] = useState([])
    const[titulo, setTitulo] = useState([])
    const[semana, setSemana] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const promisse = axios.get(dados);

        promisse.then(res => {
            console.log(res.data)
            setDatahr(res.data)
            setTitulo(res.data.movie)
            setSemana(res.data.day)
        })

        promisse.catch((erro) => {
            console.log(erro.response.data)
        })
        
    }, [])

    function voltaHome (){
        navigate("/")
    }

    return(
        <Main>
            <h2>Pedido feito com sucesso!</h2>
            <Padrão>
                <h1>Filme e sessão</h1>
                <p>{titulo.title}</p>
                <p>{semana.weekday} - {datahr.name}</p>
            </Padrão>
            <Padrão>
                <h1>Ingressos</h1>
                {places.map((l) => <p>Assento {l}</p>)}
            </Padrão>
            <Padrão>
                <h1>Comprador</h1>
                <p>Nome: {identidade}</p>
                <p>CPF: {documento}</p>
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
        cursor: pointer;
    }

    p{
        font-size: 22px;
        font-weight: 300;
        line-height: 30px;
    }
`
const Padrão = styled.div`

`
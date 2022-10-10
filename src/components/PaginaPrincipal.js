import styled from "styled-components"
import gif from "../img/200.gif"
import { Link } from "react-router-dom"

export default function PaginaInicial(props) {
    const { filmes } = props
    console.log(filmes)

    if(filmes === 0){
        return(
            <Carregando>
                <img src={gif} />
            </Carregando>
        )
    }

    return (
        <Main>
            <p>Selecione o Filme</p>
            <Filmes>
                {filmes.map((filme) => <Filme key={filme.id}><Link to={`/horarios/${filme.id}`}><img src={filme.posterURL}/></Link></Filme>)} 
            </Filmes>
        </Main>
    )
}

const Main = styled.div`
    min-height:  500px;
    width: 335px;
    margin: auto;
    background-color: #FFFFFF;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    
    
    p {
        font-size: 24px;
        color: #293845;
        margin: 40px 50px;
        font-family: 'Roboto', sans-serif;
    }
`
const Filmes = styled.div`
flex-wrap: wrap;
display: flex;
margin: 0px auto;
`
const Filme = styled.div`
height: 209px;
width: 145px;
margin: 10px;

display: flex;
justify-content: center;
align-items: center;
box-Shadow: 1px 1px 6px darkgray;
    img {
        height: 193px;
        width: 129px;
    }
`
const Carregando = styled.div`
margin:100px auto;
`
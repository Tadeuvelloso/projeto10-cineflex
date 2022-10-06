import styled from "styled-components"

export default function PaginaInicial() {
    return (
        <Main>
            <p>Selecione o Filme</p>
            <Filmes>

            </Filmes>
        </Main>
    )
}

const Main = styled.div`
    min-height:  500px;
    width: 100%;
    background-color: #FFFFFF;
    flex-direction: column;
    overflow-y: scroll;
    
    
    p {
        
        margin: 40px auto;
        
    }
`
const Filmes = styled.div`
flex-wrap: wrap;
display: flex;
margin: 0px auto;
`
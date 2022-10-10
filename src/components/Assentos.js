import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";


export default function SelecionarAssento({setDados, setPlaces, setDocumento, setIdentidade}) {
    const { idSessao } = useParams()
    const [info, setInfo] = useState([])
    const [leg, setLeg] = useState([])
    const [hora, setHora] = useState([])
    const [nome, setNome] = useState([])
    const [clienteNome, setClienteNome] = useState("")
    const [clienteCpf, setClienteCpf] = useState("")
    const [cadeiraEscolhida, setCadeiraEscolhida] = useState([])
    const [dadosCadeira, setDadosCadeira] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promisse = axios.get(URL)
        setDados(URL)


        promisse.then(res => {
            setInfo(res.data.seats)
            setLeg(res.data.movie)
            setHora(res.data.day)
            setNome(res.data.name)
        })

        promisse.catch((erro) => {
            console.log(erro.response.data)
        })

    }, [])

    

    function enviarDados (event){
        event.preventDefault()
        setIdentidade(clienteNome)
        setDocumento(clienteCpf)
        setPlaces([...dadosCadeira]);

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: cadeiraEscolhida,
            name: clienteNome,
            cpf: clienteCpf
        });

        navigate("/sucesso")
    }
    
    return (
        <Main>
            <p>Selecione o(s) assento(s)</p>
            <Lugares>
                {info.map((a) => <Cadeira setCadeiraEscolhida={setCadeiraEscolhida} dadosCadeira={dadosCadeira} setDadosCadeira={setDadosCadeira} cadeiraEscolhida={cadeiraEscolhida} livre={a.isAvailable} status={a} key={a.id} assento={a.name} />)}
            </Lugares>
            <Legenda>
                <div>
                    <Verde />
                    <p>Selecionado</p>
                </div>
                <div>
                    <Cinza />
                    <p>Disponível</p>
                </div>
                <div>
                    <Amarelo />
                    <p>Indiponível</p>
                </div>
            </Legenda>
            <Formulario onSubmit={enviarDados}>
                <p>Nome do comprador</p>
                <input type="text" value={clienteNome} onChange={e => setClienteNome(e.target.value)} required placeholder="Digite seu nome..." />
                <p>CPF do comprador:</p>
                <input type="tel" value={clienteCpf} onChange={e => setClienteCpf(e.target.value)} required placeholder="Digite seu CPF..." pattern="[0-9]{11}" />
                <button type="subimit">Reservar assento(s)</button> 
            </Formulario>
            <Footer>
                <img src={leg.posterURL} />
                <div>
                    <p>{leg.title}</p>
                    <p>{hora.weekday} - {nome}</p>
                </div>

            </Footer>
        </Main>
    )
}

function Cadeira({ setCadeiraEscolhida, cadeiraEscolhida, status, assento, livre, setDadosCadeira, dadosCadeira}) {

    function escolheCadeira(seat) {
        console.log(seat)
        if (!seat.isAvailable) {
            return
        }

        if (cadeiraEscolhida.includes(seat.id)) {
            const filteredSeats = cadeiraEscolhida.filter((s) => !(s === seat.id));
            setCadeiraEscolhida([...filteredSeats]);
            
            return;
        }
        console.log(cadeiraEscolhida)
        setCadeiraEscolhida([...cadeiraEscolhida, seat.id])
        setDadosCadeira([...dadosCadeira, seat.name])
    }

    function cor() {
        switch (livre) {
            case true: return `#C3CFD9`
            case false: return `#FBE192`
        }
    }

    return (

        <Lugar cor={cor()} num={status.id} selecionado={cadeiraEscolhida} onClick={() => escolheCadeira(status)}>
            {assento}
        </Lugar>


    )
}

const Main = styled.div`
    height: auto;
    width: 375px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        font-size: 24px;
        color: #293845;
        font-family: "Roboto", sans-serif;
        margin-bottom: 50px;
    }
`
const Lugares = styled.div`
width: 100%;
height: 300px;
flex-wrap: wrap;
display: flex;
justify-content: space-around;
align-items: center;
`
const Lugar = styled.div`
height: 26px;
width: 26px;
border-radius: 12px;
background-color: ${props => props.selecionado.includes(props.num) ? `#1AAE9E` : props.cor};
display: flex;
justify-content: center;
align-items: center;
font-size: 11px;
font-family: "roboto", sans-serif;
margin: 4px;
border: 0.5px solid #808F9D;
    :hover{
        cursor: pointer;
    }

`
const Footer = styled.div`
width: 100%;
height: 117px;
background-color: #DFE6ED;
display: flex;
justify-content: center;
align-items: center;
box-sizing: border-box;

    img{
        height: 72px;
        width: 48px;
        border: 6px solid white;
        
    }
    div{
        height: auto;
        display: flex;
        flex-direction: column;
        line-height: 0px;
        margin-top: 40px;
        justify-content: center;
        text-align: start;
    }
    p{  
        margin-left: 7px;
        font-size: 22px;
        line-height: 0px;
    }
`
const Legenda = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
width:100%;
margin-bottom:-40px;
    div{
        margin: 5px 15px 15px;
    }
    p{
        font-size: 13px;
        color: #4E5A65;
        margin-left: -5px;
    }
`
const Bola = styled.div`
width: 25px;
height: 25px;
border-radius: 17px;
`;
const Verde = styled(Bola)`
background-color: #1AAE9E;
border: 1px solid #0E7D71;
`
const Cinza = styled(Bola)`
background-color: #C3CFD9;
border: 1px solid #808F9D;
`
const Amarelo = styled(Bola)`
background-color: #FBE192;
border: 1px solid #F7C52B;
`
const Formulario = styled.form`
    input{
        height: 50px;
        width: 309px;
        border: 0.5px solid #AFAFAF;
        border-radius: 0px;
        font-size: 18px;
        font-style: italic;
        box-sizing: border-box;
        padding: 6px;
    }

    p{
        font-size:18px;
        color: #293845;
        margin:12px 0px 1px;
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
        margin:40px auto;
        cursor: pointer;
    }
`
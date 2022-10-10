import Navbar from "./components/Navbar"
import GlobalStyle from "./components/Globalstyle"
import PaginaIncial from "./components/PaginaPrincipal"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import SelecionarHorario from "./components/Horarios"
import SelecionarAssento from "./components/Assentos"
import Sucesso from "./components/Final"


export default function App (){
    const [filmes, setFilmes] = useState([])
    const [dados, setDados] = useState("")
    const [places, setPlaces] = useState([])
    const [documento, setDocumento] = useState("")
    const [identidade, setIdentidade] = useState("")

    useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    const promisse = axios.get(URL)

    promisse.then(res => {
        setFilmes(res.data)
    })

    promisse.catch((erro) => {
        console.log(erro.response.data)
    })
    
    }, [])

    return(
        <BrowserRouter>
            <GlobalStyle />
            <Navbar />
            <Routes>
                <Route path="/" element={<PaginaIncial filmes={filmes}/>}/>
                <Route path="/horarios/:idMovie" element={<SelecionarHorario/>} />
                <Route path="/assentos/:idSessao" element={<SelecionarAssento setPlaces={setPlaces} setDados={setDados} setDocumento={setDocumento} setIdentidade={setIdentidade}/>}/>
                <Route path="/sucesso" element={<Sucesso dados={dados} places={places} documento={documento} identidade={identidade}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

import Navbar from "./components/Navbar"
import GlobalStyle from "./components/Globalstyle"
import PaginaIncial from "./components/PaginaPrincipal"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App (){
    return(
        <BrowserRouter>
            <GlobalStyle />
            <Navbar />
            <Routes>
                <Route path="/" element={<PaginaIncial/>}/>
            </Routes>
        </BrowserRouter>
    )
}

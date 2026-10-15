import {Routes, Route} from"react-router-dom"
import Container from "react-bootstrap/Container"
import AppNavbar from "./components/AppNavbar"
import Search from "./pages/Search"
import Team from "./pages/Team"
import Favorites from "./pages/Favorites"

function App(){
  return(
    <>
    <AppNavbar/>
    <Container className="py-4">
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/team/:id" element={<Team/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </Container>
    </>
  )
}

export default App
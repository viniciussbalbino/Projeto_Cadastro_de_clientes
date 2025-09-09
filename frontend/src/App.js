import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NovoClientePage from "./pages/NovoClientePage";
import ListaDeClientes from "./pages/ListaClientes";
import BuscarClientes from "./pages/BuscarClientes";

function App() {
  return (
    <Router>
      <nav className="menu">
        <Link className="menu-btn" to="/">Novo Cliente</Link>
        <Link className="menu-btn" to="/clientes">Lista de Clientes</Link>
        <Link className="menu-btn" to="/buscar">Buscar Clientes</Link>
      </nav>

      <section className="fundo">
        <Routes>
          <Route path="/" element={<NovoClientePage />} />
          <Route path="/clientes" element={<ListaDeClientes />} />
          <Route path="/buscar" element={<BuscarClientes />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;

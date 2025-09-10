import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NovoClientePage from "./pages/NovoClientePage";
import ListaDeClientes from "./pages/ListaClientes";

function App() {
  return (
    <Router>
      <nav className="menu">
        <Link className="menu-btn" to="/">Novo Cliente</Link>
        <Link className="menu-btn" to="/clientes">Lista de Clientes</Link>
      </nav>

      <section className="fundo">
        <Routes>
          <Route path="/" element={<NovoClientePage />} />
          <Route path="/clientes" element={<ListaDeClientes />} />
        </Routes>
      </section>
    </Router>
  );
}

export default App;

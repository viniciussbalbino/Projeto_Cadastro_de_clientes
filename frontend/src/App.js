import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListaClientesPage from "./pages/ListaClientesPage";
import NovoClientePage from "./pages/NovoClientePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/clientes" element={<ListaClientesPage />} />
        <Route path="/novo-cliente" element={<NovoClientePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Container, Title } from "./style";
import { Link } from "react-router-dom";

const App = () => {
    return (
        <Container>
            <Title>Tela de Aplicação</Title>
            <Link to="/products">Produtos</Link>
            <Link to="/categories">Categorias</Link>
            <Link to="/orders">Pedidos</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
        </Container>
    );
};
export default App;
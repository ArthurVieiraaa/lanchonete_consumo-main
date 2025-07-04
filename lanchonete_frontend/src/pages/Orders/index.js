import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import api from "../../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const statusMap = {
  "1": "em_preparo",
  "2": "pronto",
  "3": "entregue",
};

const statusText = {
  ativo: "Ativo",
  em_preparo: "Em Preparo",
  pronto: "Pronto",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState("");
  const [showProductSelection, setShowProductSelection] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get("/orders/");
      setOrders(response.data);
    } catch (err) {
      setError("Erro ao carregar pedidos");
      console.error("Erro ao carregar pedidos:", err);
    }
  };

  const handleCreateOrder = () => {
    setError("");
    setShowProductSelection(true);
  };

  const handleProductSelectionConfirm = async (selectedProducts) => {
    try {
      setError("");
      const items = selectedProducts.map((product) => ({
        productId: product.productId || product.produtos_idproduto,
        quantity: product.quantity,
        observacao: product.observacao,
      }));

      await api.post("/orders", { items });
      setShowProductSelection(false);
      await loadOrders();
    } catch (err) {
      setError("Erro ao criar pedido com produtos selecionados.");
      console.error("Erro ao criar pedido com produtos:", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        setError("");
        await api.delete(`/orders/${id}`);
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } catch (err) {
        setError("Erro ao excluir pedido");
        console.error("Erro ao excluir pedido:", err);
      }
    }
  };

  const handleUpdateStatus = async (id, statusCode) => {
    try {
      setError("");
      const status = statusMap[statusCode];
      if (!status) {
        setError("Status inválido");
        return;
      }

      const response = await api.patch(`/orders/${id}/status`, { status });
      const updatedOrder = response.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? updatedOrder : order))
      );
    } catch (err) {
      setError("Erro ao atualizar status do pedido");
      console.error("Erro ao atualizar status do pedido:", err);
    }
  };

  const handleViewOrder = async (order) => {
    try {
      const response = await api.get(`/orders/${order.id}`);
      setCurrentOrder(response.data);
      setIsModalOpen(true);
    } catch (error) {
      alert("Erro ao buscar detalhes do pedido!");
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Pedidos</Title>
      <button onClick={handleCreateOrder}>
        <AiOutlinePlus size={20} /> Criar Novo Pedido
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{statusText[order.status] || order.status || "Pendente"}</td>
              <td>
                <button onClick={() => handleViewOrder(order)}>Visualizar</button>
                {Object.entries(statusMap).map(([code, statusStr]) => (
                  <button
                    key={code}
                    onClick={() => handleUpdateStatus(order.id, code)}
                    disabled={order.status === statusStr}
                    style={{
                      backgroundColor:
                        order.status === statusStr ? "#4CAF50" : "initial",
                      color: order.status === statusStr ? "white" : "initial",
                      cursor: order.status === statusStr ? "default" : "pointer",
                      margin: "0 5px",
                    }}
                  >
                    {statusText[statusStr]}
                  </button>
                ))}
                <button onClick={() => handleDeleteOrder(order.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showProductSelection && (
        <ProductSelectionModal
          onClose={() => setShowProductSelection(false)}
          onConfirm={handleProductSelectionConfirm}
        />
      )}

      <OrderModal
        $isOpen={isModalOpen}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={currentOrder}
      />
    </Container>
  );
};

const OrderModal = ({ $isOpen, isOpen, onClose, order }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && order?.products) {
      setOrderProducts(
        order.products.map((p) => ({
          productId: p.id,
          nome: p.name,
          valor: p.price,
          quantity: p.order_products?.quantity || 1,
          observacao: p.order_products?.observation || "",
        }))
      );
    } else if (isOpen && order && !order.products) {
      setError("Erro: Produtos do pedido não carregados. Verifique o backend.");
    }
  }, [isOpen, order]);

  if (!$isOpen) return null;

  return (
    <ModalOverlay $isOpen={$isOpen}>
      <ModalContent>
        <h2>Detalhes do Pedido #{order?.id}</h2>
        <div>
          <p><strong>Data/Hora:</strong> {order ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
          <p><strong>Status:</strong> {statusText[order?.status] || order?.status || "N/A"}</p>
        </div>
        <div>
          <h3>Produtos do Pedido</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {orderProducts.length === 0 && !error && <p>Nenhum produto associado a este pedido.</p>}
          {orderProducts.map((item) => (
            <div key={item.productId}>
              <p><strong>{item.nome}</strong> - Quantidade: {item.quantity} - R$ {item.valor}</p>
              {item.observacao && <p>Observação: {item.observacao}</p>}
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={onClose}>Fechar</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

const ProductSelectionModal = ({ onClose, onConfirm }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error("Erro ao carregar produtos:", err);
    }
  };

  const handleProductSelect = (product) => {
    const exists = selectedProducts.find((p) => p.productId === product.id);
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p.productId !== product.id));
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { productId: product.id, observacao: "", quantity: 1 },
      ]);
    }
  };

  const handleObservationChange = (productId, value) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.productId === productId ? { ...p, observacao: value } : p
      )
    );
  };

  const handleQuantityChange = (productId, value) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.productId === productId ? { ...p, quantity: Number(value) } : p
      )
    );
  };

  const handleConfirm = () => {
    if (selectedProducts.length === 0) {
      setError("Selecione pelo menos um produto");
      return;
    }
    onConfirm(selectedProducts);
  };

  return (
    <ModalOverlay $isOpen={true}>
      <ModalContent>
        <h2>Selecionar Produtos</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {products.map((product) => {
          const selected = selectedProducts.find((p) => p.productId === product.id);
          return (
            <div key={product.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={() => handleProductSelect(product)}
                />
                {product.name} - R$ {product.value}
              </label>
              {selected && (
                <>
                  <textarea
                    placeholder="Observações"
                    value={selected.observacao}
                    onChange={(e) => handleObservationChange(product.id, e.target.value)}
                  />
                  <input
                    type="number"
                    min={1}
                    value={selected.quantity}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  />
                </>
              )}
            </div>
          );
        })}
        <div>
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Orders;
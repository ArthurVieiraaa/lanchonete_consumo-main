import React, { useState, useEffect } from "react";
import { Container, Title, ModalOverlay, ModalContent } from "./style";
import api from "../../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (err) {
      setError("Erro ao carregar categorias");
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await api.delete(`/product/${id}`, {idProduct: id});
        loadProducts();
      } catch (err) {
        setError("Erro ao excluir produto");
      }
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Produtos</Title>
      <button onClick={handleAddProduct}>Adicionar Produto</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idProduct}>
              <td>{product.name}</td>
              <td>R$ {(Number(product.price) || 0).toFixed(2)}</td>
              <td>
                {
                  categories.find((cat) => cat.categoryId === product.categoryId)?.nameCategory ||
                  "Sem categoria"
                }
              </td>
              <td>
                <button onClick={() => handleEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.idProduct)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={currentProduct}
          categories={categories}
          onProductSaved={() => {
            loadProducts();
            setIsModalOpen(false);
          }}
        />
      )}
    </Container>
  );
};

const ProductModal = ({ isOpen, onClose, product, categories, onProductSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    productId: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.categoryId || "",
        productId: product.idProduct
      });
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Form data:", formData);
    if (!formData.name || !formData.price || !formData.category) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      idCategory: parseInt(formData.category),
      idProduct: parseInt(formData.productId),
    };

    try {
      if (product) {
        await api.put(`/product/${product.idProduct}`, productData);
      } else {
        await api.post("/product", productData);
      }
      onProductSaved();
    } catch (err) {
      setError("Erro ao salvar produto");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{product ? "Editar Produto" : "Novo Produto"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Preço"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
          <select
            name="category"
            value={formData.category}     
            onChange={handleChange} 
          >
            <option value="">Selecione a categoria</option>
            {categories.map((cat) => (
              <option key={cat.idCategory} value={cat.idCategory}>
                {cat.nameCategory}
              </option>
            ))}
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="button-group">
            <button type="submit">{product ? "Atualizar" : "Criar"}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Products;

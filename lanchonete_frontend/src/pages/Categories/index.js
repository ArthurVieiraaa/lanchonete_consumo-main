import React, { useState, useEffect } from "react";
import { Container, Title, ModalOverlay, ModalContent } from "./style";
import api from "../../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (err) {
      setError("Erro ao carregar categorias");
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Deseja realmente excluir esta categoria?")) {
      try {
        await api.delete(`/category/${id}`);
        loadCategories();
      } catch (err) {
        setError("Erro ao excluir categoria");
      }
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Categorias</Title>
      <button onClick={handleAddCategory}>Adicionar Categoria</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome da Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.idCategory}>
              <td>{cat.nameCategory}</td>
              <td>
                <button onClick={() => handleEditCategory(cat)}>Editar</button>
                <button onClick={() => handleDeleteCategory(cat.idCategory)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={currentCategory}
          onCategorySaved={() => {
            loadCategories();
            setIsModalOpen(false);
          }}
        />
      )}
    </Container>
  );
};

const CategoryModal = ({ isOpen, onClose, category, onCategorySaved }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.nameCategory);
    } else {
      setCategoryName("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!categoryName.trim()) {
      setError("O nome da categoria é obrigatório");
      return;
    }

    try {
      if (category) {
        await api.put(`/category/${category.idCategory}`, { nameCategory: categoryName });
      } else {
        await api.post("/category", { nameCategory: categoryName });
      }
      onCategorySaved();
    } catch (err) {
      setError("Erro ao salvar categoria");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{category ? "Editar Categoria" : "Nova Categoria"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="button-group">
            <button type="submit">{category ? "Atualizar" : "Criar"}</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Categories;

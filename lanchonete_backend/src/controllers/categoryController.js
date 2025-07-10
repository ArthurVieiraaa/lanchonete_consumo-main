const Category = require("../models/category");
const Product = require('../models/product');

class CategoryController {

  static async findAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error });
  }
}

static async createCategories(req, res) {
  const { nameCategory, description } = req.body;

  try {
    const category = await Category.create({ nameCategory, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar categoria', error });
  }
}

  static async updateCategories(req, res) {
    const { id: idCategory } = req.params;
    const { nameCategory, description } = req.body;

    try {
      const category = await Category.findByPk(idCategory);
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await category.update({
        nameCategory: nameCategory ?? category.nameCategory,
        description: description ?? category.description,
      });

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar categoria", error });
    }
  }

  static async deleteCategories(req, res) {
    const idCategory = req.params.id;

    try {
      const category = await Category.findByPk(idCategory);
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      const products = await Product.findAll({ where: { idCategory } });
      if (products.length > 0) {
        return res
          .status(400)
          .json({
            message:
              "Não é possível deletar. Existem produtos associados a essa categoria.",
          });
      }

      await category.destroy();
      res.status(200).json({ message: "Categoria deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar categoria", error });
    }
  }
}
module.exports = CategoryController;

const Product = require('../models/product');
const Category = require('../models/category'); 

class ProductController {
  
  static async findAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
  }


  static async createProducts(req, res) {
    const { name, price, idCategory } = req.body;

    try {
      const product = await Product.create({ name, price, idCategory });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error });
    }
  }

  
  static async updateProducts(req, res) {
    const { idProduct, name, price, idCategory } = req.body;

    try {
      const product = await Product.findByPk(idProduct);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      await product.update({ name, price, idCategory });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
  }

  
  static async deleteProducts(req, res) {
    const idProduct = req.params.id;

    try {
      const product = await Product.findByPk(idProduct);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      await product.destroy();
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
  }

  //Procurar produto por ID
  static async getProductsById(req, res) {
    const { id } = req.params;

    try {
      const products = await Product.findAll({ where: { idProduct: id } });

      if (products.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado para essa ID' });
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos por ID', error });
    }
  }
}

module.exports = ProductController;

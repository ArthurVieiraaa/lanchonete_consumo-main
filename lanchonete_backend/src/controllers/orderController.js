const Order = require('../models/order');

class OrderController {
  
  static async createOrders(req, res) {
    const { idUser, products } = req.body;
    try {
      const order = await Order.create({ idUser, products });
      res.status(201).json({ message: 'Pedido criada com sucesso', order });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pedidos', detalhes: error.message });
    }
  }

  static async findAllOrders(req, res) {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar pedidos', detalhes: error.message });
    }
  }

  
  static async updateOrders(req, res) {
    const { id: idOrder, idUser, products } = req.body;
    try {
      const order = await Order.findByPk(idOrder);
      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      // Atualiza apenas se houver novos valores
      order.idUser = idUser ?? order.idUser;
      order.products = products ?? order.products;

      await order.save();
      res.status(200).json({ message: 'Pedido atualizado com sucesso', order });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pedido', detalhes: error.message });
    }
  }

  
  static async deleteOrders(req, res) {
    const { id: idOrder } = req.body;
    try {
      const order = await Order.findByPk(idOrder);
      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      await order.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar pedido', detalhes: error.message });
    }
  }
}

module.exports = OrderController;

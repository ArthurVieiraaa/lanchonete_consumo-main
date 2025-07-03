const OrderItem = require('../models/orderItem');

class OrderItemController {
  // Criar item do pedido
  static async createOrderItem(req, res) {
    const { idOrder, idProduct, quantity } = req.body;
    try {
      const orderItem = await OrderItem.create({ idOrder, idProduct, quantity });
      res.status(201).json({ message: 'Item adicionado ao pedido com sucesso', orderItem });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar item ao pedido', detalhes: error.message });
    }
  }

  // Listar todos os itens
  static async findAllOrderItems(req, res) {
    try {
      const orderItems = await OrderItem.findAll();
      res.status(200).json(orderItems);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar itens de pedidos', detalhes: error.message });
    }
  }

  // Atualizar item do pedido
  static async updateOrderItem(req, res) {
    const { id } = req.params;
    const { idOrder, idProduct, quantity } = req.body;

    try {
      const orderItem = await OrderItem.findByPk(id);
      if (!orderItem) {
        return res.status(404).json({ error: 'Item do pedido não encontrado' });
      }

      orderItem.idOrder = idOrder ?? orderItem.idOrder;
      orderItem.idProduct = idProduct ?? orderItem.idProduct;
      orderItem.quantity = quantity ?? orderItem.quantity;

      await orderItem.save();
      res.status(200).json({ message: 'Item atualizado com sucesso', orderItem });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar item', detalhes: error.message });
    }
  }

  // Deletar item do pedido
  static async deleteOrderItem(req, res) {
    const { id } = req.params;

    try {
      const orderItem = await OrderItem.findByPk(id);
      if (!orderItem) {
        return res.status(404).json({ error: 'Item do pedido não encontrado' });
      }

      await orderItem.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar item do pedido', detalhes: error.message });
    }
  }
}

module.exports = OrderItemController;

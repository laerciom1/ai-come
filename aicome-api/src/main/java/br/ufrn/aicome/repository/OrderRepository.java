package br.ufrn.aicome.repository;

import br.ufrn.aicome.model.Order;

import java.util.List;

/**
 * Order Repository.
 */
public interface OrderRepository {

    /**
     * Save a order somewhere.
     * @param order the order to be saved.
     */
    public void save(Order order);

    /**
     * Find the orders by username.
     * @param username the username
     * @return list of orders.
     */
    public List<Order> findUserOrders(String username);

}

package br.ufrn.aicome.repository;

import br.ufrn.aicome.model.Order;
import br.ufrn.aicome.rethinkdb.RethinkDBConfig;
import br.ufrn.aicome.rethinkdb.RethinkDBConnection;
import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;
import com.rethinkdb.net.Cursor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Component
public class OrderRepositoryImpl implements OrderRepository {

    /**
     * RethinkDB instance.
     */
    private static final RethinkDB r = RethinkDB.r;

    /**
     * Logger instance.
     */
    private Logger logger = Logger.getLogger(OrderRepositoryImpl.class.getName());

    /**
     * RethinkDB Configuration.
     */
    @Autowired
    private RethinkDBConfig rethinkDBConfig;

    /**
     * RethinkDB Connection Factory.
     */
    @Autowired
    private RethinkDBConnection rethinkDBConnection;

    /**
     * Save the order in rethinkdb database.
     * @param order the order to be saved.
     */
    @Override
    public void save(Order order) {

        if(rethinkDBConfig.isEnabled()) {

            try (Connection connection = rethinkDBConnection.getConnection()) {
                RethinkDB.r.db("aicome")
                        .table("orders")
                        .insert(order)
                        .run(connection);
            }

        } else {
            //TODO save in local database or give an error message to the user.
            logger.warning("RethinkDB is disabled. Not saving order. " + order.toString());
        }
    }

    /**
     * Find the orders by username.
     * @param username the username
     * @return list of orders.
     */
    @Override
    public List<Order> findUserOrders(String username) {

        if(rethinkDBConfig.isEnabled()) {

            try (Connection connection = rethinkDBConnection.getConnection()) {
                Cursor<Map<String, Object>> cursor = RethinkDB.r.db("aicome")
                        .table("orders")
                        .filter(row -> row.g("username").eq(username))
                        .run(connection);

                List<Order> orders = new ArrayList<>();
                for (Map<String, Object> row : cursor) {
                    Order order = new Order();
                    order.setStoreId((Long) row.get("storeId"));
                    order.setUsername((String) row.get("username"));
                    order.setComments((String) row.get("comments"));
                    orders.add(order);
                }

                return orders;
            }

        }

        //TODO return orders from local database or give an error message to the user.
        logger.warning("RethinkDB is disabled. Returning empty 'orders' list to the user '" + username + "'.");
        return new ArrayList<>();
    }
}

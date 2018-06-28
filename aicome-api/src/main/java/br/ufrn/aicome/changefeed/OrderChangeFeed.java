package br.ufrn.aicome.changefeed;

import br.ufrn.aicome.model.Order;
import br.ufrn.aicome.rethinkdb.RethinkDBConnection;
import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;
import com.rethinkdb.net.Cursor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class OrderChangeFeed {

    /**
     * RethinkDB instance.
     */
    private static final RethinkDB r = RethinkDB.r;

    /**
     * RethinkDB Connection Factory.
     */
    @Autowired
    private RethinkDBConnection rethinkDBConnection;

    /**
     * Method to subscribe to do something when user orders change.
     * @param username
     * @param callback
     */
    @Async
    public void onUserOrdersChange(String username, Consumer<Object> callback){

        try (Connection connection = rethinkDBConnection.getConnection()) {

            Cursor<Order> cursor = RethinkDB.r.db("aicome")
                    .table("orders")
                    .filter(r.row("username").eq(username))
                    .changes().run(connection, Order.class);

            while(cursor.hasNext()){
                Order order = cursor.next();
                callback.accept(order);
            }

        }

    }



}

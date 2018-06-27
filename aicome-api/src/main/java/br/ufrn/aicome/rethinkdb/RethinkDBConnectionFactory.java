package br.ufrn.aicome.rethinkdb;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.concurrent.TimeoutException;
import java.util.logging.Logger;

@Component
public class RethinkDBConnectionFactory {

    @Value("${rethinkdb.host}")
    private String host;

    @Value("${rethinkdb.port}")
    private int port;

    @Value("${rethinkdb.enabled}")
    private boolean enabled;

    /**
     * Logger instance.
     */
    private Logger logger = Logger.getLogger(RethinkDBConnectionFactory.class.getName());

    /**
     * Holds the actual connection available.
     */
    private Connection connection;

    /**
     * Initialize this configuration bean with a connection.
     * @throws TimeoutException
     */
    @PostConstruct
    public void init() throws TimeoutException {
        if(connection == null) {
            logger.info("Initializing RethinkDB Configuration");
            connection = getConnection();
        }
    }

    @PreDestroy
    public void tearDown(){
        if(connection != null && connection.isOpen()){
            logger.info("Closing connection with rethinkdb at " + connection.hostname + ":" + connection.port);
            connection.close(true);
        }
    }

    /**
     * Create a new connection.
     * @return a connection instance.
     * @throws RuntimeException in case the connection attempt exceed the timeout.
     */
    public Connection getConnection() {

        if(connection == null || !connection.isOpen()){
            logger.info("Creating connection with rethinkDB at " + host + ":" + port);
            try {
                connection = RethinkDB.r.connection().hostname(host).port(port).connect();
            } catch (TimeoutException e) {
                throw new RuntimeException(e);
            }
            logger.info("Connected successfully with rethinkdb at " + host + ":" + port);
        } else {
            logger.info("Using previously defined connection at " + connection.hostname + ":" + connection.port);
        }

        return connection;
    }


}

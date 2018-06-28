package br.ufrn.aicome.rethinkdb;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.concurrent.TimeoutException;
import java.util.logging.Logger;

@Component
public class RethinkDBConnection {

    @Autowired
    private RethinkDBConfig config;

    /**
     * Logger instance.
     */
    private Logger logger = Logger.getLogger(RethinkDBConnection.class.getName());

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
        if(config.isEnabled()) {
            if (connection == null) {
                logger.info("Initializing RethinkDB Configuration");
                connection = getConnection();
            }
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

        if(config.isEnabled()) {

            if (connection == null || !connection.isOpen()) {
                logger.info("Creating connection with rethinkDB at " + config.getHost() + ":" + config.getPort());
                connection = RethinkDB.r.connection().hostname(config.getHost()).port(config.getPort()).connect();
                logger.info("Connected successfully with rethinkdb at " + config.getHost() + ":" + config.getPort());
            }
            else {
                logger.info("Using previously defined connection at " + connection.hostname + ":" + connection.port);
            }

        } else {
            logger.info("RethinkDB disabled");
        }

        return connection;
    }


}

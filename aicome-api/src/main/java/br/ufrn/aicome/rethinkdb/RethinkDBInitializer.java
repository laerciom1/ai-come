package br.ufrn.aicome.rethinkdb;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.logging.Logger;

@Component
public class RethinkDBInitializer implements InitializingBean {

    /**
     * RethinkDB instance.
     */
    private static final RethinkDB r = RethinkDB.r;

    /**
     * Logger instance.
     */
    private Logger logger = Logger.getLogger(RethinkDBInitializer.class.getName());

    /**
     * Tells if rethinkdb is enabled.
     */
    @Value("${rethinkdb.enabled}")
    private boolean enabled;

    /**
     * Connection Factory.
     */
    @Autowired
    private RethinkDBConnectionFactory connectionFactory;

    @Override
    public void afterPropertiesSet() throws Exception {
        if(enabled) {
            Connection connection = connectionFactory.getConnection();
            List<String> dbList = r.dbList().run(connection);
            if (!dbList.contains("chat")) {
                r.dbCreate("chat").run(connection);
            }
            List<String> tables = r.db("chat").tableList().run(connection);
            if (!tables.contains("messages")) {
                r.db("chat").tableCreate("messages").run(connection);
                r.db("chat").table("messages").indexCreate("time").run(connection);
            }

            logger.info("RethinkDB Database Initialized successfully");

        }
    }


}


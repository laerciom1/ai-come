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
     * RethinkDB Configuration.
     */
    @Autowired
    private RethinkDBConfig rethinkDBConfig;

    /**
     * Connection Factory.
     */
    @Autowired
    private RethinkDBConnection rethinkDBConnection;

    @Override
    public void afterPropertiesSet() throws Exception {
        if(rethinkDBConfig.isEnabled()) {

            try (Connection connection = rethinkDBConnection.getConnection()) {

                List<String> dbList = r.dbList().run(connection);
                if (!dbList.contains("aicome")) {
                    r.dbCreate("aicome").run(connection);
                }

                List<String> tables = r.db("aicome").tableList().run(connection);
                if (!tables.contains("orders")) {
                    r.db("aicome").tableCreate("orders").run(connection);
                    r.db("aicome").table("orders").indexCreate("time").run(connection);
                }

                logger.info("RethinkDB Database Initialized successfully");

            }

        }
    }


}


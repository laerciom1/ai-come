package br.ufrn.aicome.rethinkdb;

import com.rethinkdb.RethinkDB;
import com.rethinkdb.net.Connection;

import java.util.concurrent.TimeoutException;

public class RethinkDBConnectionFactory {
	
    private String host;
    
    private Integer port;

    public RethinkDBConnectionFactory(String host,Integer port) {
        this.host = host;
        this.port = port;
    }

    public Connection createConnection() {
        try {
            return RethinkDB.r.connection().hostname(host).port(port).connect();
        } catch (TimeoutException e) {
            throw new RuntimeException(e);
        }
    }
}

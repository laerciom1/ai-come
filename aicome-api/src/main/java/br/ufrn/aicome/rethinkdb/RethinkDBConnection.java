package br.ufrn.aicome.rethinkdb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RethinkDBConnection {

	@Autowired
	private RethinkDBConfiguration dbConfiguration;

	@Bean
	public RethinkDBConnectionFactory connectionFactory() {
		if(dbConfiguration.isEnabled())
			return new RethinkDBConnectionFactory(dbConfiguration.getDbHost(),dbConfiguration.getPort());
		return null;
	}

	@Bean
	DbInitializer dbInitializer() {
		if(dbConfiguration.isEnabled())
			return new DbInitializer();
		return null;
	}
}

package br.ufrn.aicome;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AicomeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AicomeApplication.class, args);
	}
}

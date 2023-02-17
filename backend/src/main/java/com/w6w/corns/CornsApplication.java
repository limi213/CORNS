package com.w6w.corns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CornsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CornsApplication.class, args);
	}

}

package com.sona.SAP;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = {
    "http://localhost:4202",
    "http://127.0.0.1:4201",
	"http://172.16.32.47:4201"
})

public class SapApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SapApplication.class);
	}
	public static void main(String[] args) {
		SpringApplication.run(SapApplication.class, args);
	}

}

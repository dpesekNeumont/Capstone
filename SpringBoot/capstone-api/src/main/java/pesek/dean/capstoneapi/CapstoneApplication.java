package pesek.dean.capstoneapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration
public class CapstoneApplication {
	public static void main(String[] args) {
		SpringApplication.run(CapstoneApplication.class, args);
	}
}

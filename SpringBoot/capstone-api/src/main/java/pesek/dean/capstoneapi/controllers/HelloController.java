package pesek.dean.capstoneapi.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
	@GetMapping("test/hello")
	@CrossOrigin
	public String hello() {
		return "Hello this is a test";
	}
}

package pesek.dean.capstoneapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Email;
import pesek.dean.capstoneapi.repositories.EmailJpaRepository;

@RestController
public class EmailRestController {
	
	@Autowired
	private EmailJpaRepository emailRepo;
	
	@PostMapping(path="/emails")
	@CrossOrigin
	public void CreateEmail(@RequestBody Email email) {
		emailRepo.saveAndFlush(email);
	}
}

package pesek.dean.capstoneapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.PhoneNumber;
import pesek.dean.capstoneapi.repositories.PhoneNumberJpaRepository;

@RestController
public class PhoneNumberRestController {

	@Autowired
	private PhoneNumberJpaRepository phoneRepo;
	
	@PostMapping(path="/phones")
	@CrossOrigin
	public void createPhoneNumber(@RequestBody PhoneNumber phone) {
		phoneRepo.saveAndFlush(phone);
	}
}

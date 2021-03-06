package pesek.dean.capstoneapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Address;
import pesek.dean.capstoneapi.repositories.AddressJpaRepository;

@RestController
public class AddressRestController {
	
	@Autowired
	private AddressJpaRepository addressRepo;
	
	@PostMapping(path="/address")
	@CrossOrigin
	public void createAddress(@RequestBody Address address) {
		addressRepo.saveAndFlush(address);
	}
}

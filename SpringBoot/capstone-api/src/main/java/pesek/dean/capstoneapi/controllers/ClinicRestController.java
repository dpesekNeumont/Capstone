package pesek.dean.capstoneapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Clinic;
import pesek.dean.capstoneapi.repositories.ClinicJpaRepository;

@RestController
public class ClinicRestController {
	
	@Autowired
	private ClinicJpaRepository clinicRepo;
	
	@GetMapping(path="/clinics/{name}")
	@CrossOrigin
	public Clinic getClinicByName(@PathVariable String name) {
		var clinics = clinicRepo.findAll();
		var clinic = (Clinic) clinics.stream().filter(c -> c.getName().toUpperCase().equals(name.toUpperCase())).findFirst().orElse(null);
		return clinic;
	}

}

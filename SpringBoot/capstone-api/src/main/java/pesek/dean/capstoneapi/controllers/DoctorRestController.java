package pesek.dean.capstoneapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Doctor;
import pesek.dean.capstoneapi.repositories.DoctorJpaRepository;

@RestController
public class DoctorRestController {
	
	@Autowired
	private DoctorJpaRepository docRepo;
	
	@PostMapping(path="/doctors")
	public void createDoctor(@RequestBody Doctor doc) {
		docRepo.saveAndFlush(doc);
	}

}

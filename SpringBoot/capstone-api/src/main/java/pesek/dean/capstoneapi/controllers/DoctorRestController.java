package pesek.dean.capstoneapi.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Doctor;
import pesek.dean.capstoneapi.repositories.DoctorJpaRepository;

@RestController
public class DoctorRestController {
	
	@Autowired
	private DoctorJpaRepository docRepo;
	
	@GetMapping(path="/doctors")
	@CrossOrigin
	public List<Doctor> getAllDoctors() {
		
		var thing = docRepo.findAll();
		return thing;
	}
	
	@GetMapping(path="/doctors/{doctorId}")
	@CrossOrigin
	public Doctor getDoctorById(@PathVariable int doctorId) {
		Optional<Doctor> result = docRepo.findById(doctorId);
		return result.orElseThrow(() -> new RuntimeException());
	}
	
	@PostMapping(path="/insert")
	@CrossOrigin
	public void createDefaultDoc() {
		Doctor doc = new Doctor();
		doc.setFirstName("John");
		doc.setLastName("Doe");
		docRepo.saveAndFlush(doc);
	}
	
	@PostMapping(path="/doctors")
	@CrossOrigin
	public void createDoctor(@RequestBody Doctor doc) {
		docRepo.saveAndFlush(doc);
	}

}

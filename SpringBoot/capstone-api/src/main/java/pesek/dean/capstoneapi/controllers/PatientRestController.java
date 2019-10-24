package pesek.dean.capstoneapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Patient;
import pesek.dean.capstoneapi.repositories.PatientJpaRepository;

@RestController
public class PatientRestController {

	@Autowired
	private PatientJpaRepository patientRepo;
	
//	@GetMapping(path="/searchPatient/{firstName}/{lastName}")
//	@CrossOrigin
//	public List<Patient> searchPatientsByFirstAndLastName(@PathVariable String firstName, @PathVariable String lastName) {
//		return patientRepo.findByFirstNameAndLastName(firstName, lastName
//	}
	
	@GetMapping(path="/getAllPatients")
	@CrossOrigin
	public List<Patient> getAllPatients() { 
		return patientRepo.findAll();
	}
	
	@PatchMapping(path="/updatePatient")
	@CrossOrigin
	public void updatePatient(@RequestBody Patient patient) {
		patientRepo.saveAndFlush(patient);
	}
	
	@PostMapping(path="/createPatient")
	@CrossOrigin
	public void createPatient(@RequestBody Patient patient) {
		patientRepo.saveAndFlush(patient);
	}	
}
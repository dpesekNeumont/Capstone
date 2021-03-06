package pesek.dean.capstoneapi.controllers;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping(path="/auth")
	@CrossOrigin
	public int checkCridentials(HttpServletRequest req, HttpServletResponse res) {
		String header = req.getHeader("Authorization");
		return authenticate(header, res);
	}
	
	@DeleteMapping(path="/deletePatient/{patientId}")
	@CrossOrigin
	public void deletePatient(@PathVariable int patientId) {
		patientRepo.deleteById(patientId);
	}
	
	private int authenticate(String header, HttpServletResponse response) {
		try {
			String rawCridentials = new String(Base64.getDecoder().decode(header.split(" ")[1]));
			String[] parts = rawCridentials.split(":");
			String username = parts[0];
			String password = parts[1];
			List<Patient> staff = patientRepo.findAll();
			List<Patient> staffStream = staff.stream().filter(s -> s.getUsername().equals(username)
					&& s.getPassword().equals(password)).collect(Collectors.toList());
			if (staffStream == null || staffStream.isEmpty()) {
				throw new RuntimeException();
			}
			return staffStream.get(0).getId();
		}
		catch (Exception e) {
			response.setStatus(400);
		}
		return -1;
	}
	
	@GetMapping(path="/getAllPatients")
	@CrossOrigin
	public List<Patient> getAllPatients() { 
		return patientRepo.findAll();
	}
	
	@GetMapping(path="/getPatient/{value}")
	@CrossOrigin
	public Patient getPatiendById(@PathVariable int value) {
		Optional<Patient> result = patientRepo.findById(value);
		return result.orElseThrow(() -> new RuntimeException());
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
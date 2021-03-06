package pesek.dean.capstoneapi.controllers;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.ClinicStaff;
import pesek.dean.capstoneapi.repositories.ClinicStaffJpaRepository;

@RestController
public class ClinicStaffRestController {
	@Autowired
	private ClinicStaffJpaRepository clinicStaffRepo;
	
	@RequestMapping(path="/users", method = RequestMethod.GET)
	@CrossOrigin
	public boolean checkCridentials(HttpServletRequest request, HttpServletResponse response) {
		String header = request.getHeader("Authorization");
		return authenticate(header, response);
	}
	
	private boolean authenticate(String header, HttpServletResponse response) {
		try {
			String rawCridentials = new String(Base64.getDecoder().decode(header.split(" ")[1]));
			String[] parts = rawCridentials.split(":");
			String username = parts[0];
			String password = parts[1];
			List<ClinicStaff> staff = clinicStaffRepo.findAll();
			List<ClinicStaff> staffStream = staff.stream().filter(s -> s.getUsername().equals(username)
					&& s.getPassword().equals(password)).collect(Collectors.toList());
			if (staffStream == null || staffStream.isEmpty()) {
				throw new RuntimeException();
			}
		}
		catch (Exception e) {
			response.setStatus(400);
		}
		return true;
	}
	
	@GetMapping(path="/staff")
	@CrossOrigin
	public List<ClinicStaff> getAllStaff() {
		return clinicStaffRepo.findAll();
	}
	
	@RequestMapping(path="/users", method = RequestMethod.POST)
	@CrossOrigin
	public void createClinicStaff(ClinicStaff c, HttpServletRequest request) {
		clinicStaffRepo.saveAndFlush(c);
	}
}
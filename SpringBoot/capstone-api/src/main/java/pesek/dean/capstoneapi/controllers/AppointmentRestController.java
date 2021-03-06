package pesek.dean.capstoneapi.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pesek.dean.capstoneapi.models.Appointment;
import pesek.dean.capstoneapi.repositories.AppointmentJpaRepository;
import pesek.dean.capstoneapi.repositories.DoctorJpaRepository;
import pesek.dean.capstoneapi.repositories.PatientJpaRepository;

@RestController
public class AppointmentRestController {

	@Autowired
	private AppointmentJpaRepository appRepo;
	@Autowired
	private DoctorJpaRepository docRepo;
	@Autowired
	private PatientJpaRepository patientRepo;

	@PostMapping(path = "/appointment")
	@CrossOrigin
	public void createAppointment(@RequestBody Appointment app, HttpServletRequest req) throws IOException {
		app.setPatient(patientRepo.findById(app.getPatient().getId()).orElse(null));
		app.setDoctor(docRepo.findById(app.getDoctor().getId()).orElse(null));
		appRepo.saveAndFlush(app);
	}

	@GetMapping(path = "/appointment")
	@CrossOrigin
	public List<Appointment> getAllAppointments() {
		return appRepo.findAll();
	}

	@GetMapping(path = "/appointment/{apptId}")
	@CrossOrigin
	public Appointment getAppointmentById(@PathVariable int apptId) {
		Optional<Appointment> result = appRepo.findById(apptId);
		return result.orElseThrow(() -> new RuntimeException());
	}

	// add a get for all appointments for that day

	@SuppressWarnings("static-access")
	@GetMapping(path = "/appointment/today")
	@CrossOrigin
	public List<Appointment> getAllAppointmentsForToday() {
		var appts = appRepo.findAll();
		List<Appointment> finalAppts = new ArrayList<Appointment>();
		Calendar c = Calendar.getInstance();
		appts.stream().forEach(a -> {
			Calendar ac = Calendar.getInstance();
			ac.setTimeInMillis(a.getDate());
			if (ac.MONTH == c.MONTH && ac.DAY_OF_WEEK == c.DAY_OF_WEEK && ac.YEAR == c.YEAR) {
				finalAppts.add(a);
			}
		});
		return finalAppts;
	}

	@GetMapping(path = "/appointment/patient/{patientId}")
	@CrossOrigin
	public List<Appointment> getAppointmentByPatientId(@PathVariable int patientId) {
		var appts = appRepo.findAll();
		return (List<Appointment>) appts.stream().filter(a -> a.getPatient().getId() == patientId)
				.collect(Collectors.toList());
	}

	@DeleteMapping(path = "/appointment/{appointmentId}")
	@CrossOrigin
	public void deleteAppointmentById(@PathVariable int appointmentId) {
		System.out.println(appointmentId);
		appRepo.deleteById(appointmentId);
	}

	@PatchMapping(path = "/appointment")
	@CrossOrigin
	public void updateAppointmentById(@RequestBody Appointment appt) {
		appRepo.saveAndFlush(appt);
	}
	
	@PatchMapping(path = "/appointment/{apptId}")
	@CrossOrigin
	public void setFinished(@PathVariable int apptId) {
		var appt = appRepo.findById(apptId).orElse(null);
		appt.setFinished(true);
		appRepo.saveAndFlush(appt);
	}
}

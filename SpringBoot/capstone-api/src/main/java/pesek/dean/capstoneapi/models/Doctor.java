package pesek.dean.capstoneapi.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "doctor")
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(nullable = false)
	private String firstName;
	@Column(nullable = false)
	private String lastName;
	@OneToOne(cascade=CascadeType.ALL)
	private PhoneNumber primaryPhoneNumber;
//	@OneToOne(cascade=CascadeType.ALL)
//	private PhoneNumber secondaryPhoneNumber;
	@OneToOne(cascade=CascadeType.ALL)
	private Email primaryEmail;
//	@OneToOne(cascade=CascadeType.ALL)
//	private Email secondaryEmail;
	@Column(nullable = true)
	@OneToMany(cascade=CascadeType.ALL)
	private List<Patient> patients;
	@OneToMany(cascade=CascadeType.ALL)
	private List<Appointment> appointments;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "clinic")
	private Clinic clinic;

	public Doctor() {

	}

	public Doctor(String firstName, String lastName, PhoneNumber primaryPhoneNumber, Email primaryEmail, Clinic clinic) {
		setFirstName(firstName);
		setLastName(lastName);
		setPrimaryEmail(primaryEmail);
		setPrimaryPhoneNumber(primaryPhoneNumber);
		setClinic(clinic);
	}

//	public Doctor(String firstName, String lastName, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber,
//			Email primaryEmail, Clinic clinic) {
//		this(firstName, lastName, primaryPhoneNumber, primaryEmail, clinic);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}
//
//	public Doctor(String firstName, String lastName, PhoneNumber primaryPhoneNumber, Email primaryEmail,
//			Email secondaryEmail, Clinic clinic) {
//		this(firstName, lastName, primaryPhoneNumber, primaryEmail, clinic);
//		setSecondaryEmail(secondaryEmail);
//	}
//
//	public Doctor(String firstName, String lastName, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber,
//			Email primaryEmail, Email secondaryEmail, Clinic clinic) {
//		this(firstName, lastName, primaryPhoneNumber, primaryEmail, clinic);
//		setSecondaryEmail(secondaryEmail);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		if (!firstName.isEmpty() && firstName != null)
			this.firstName = firstName;
		else {
			// throw input exception
		}
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		if (!firstName.isEmpty() && firstName != null)
			this.lastName = lastName;
		else {
			// throw input exception
		}
	}

	public PhoneNumber getPrimaryPhoneNumber() {
		return primaryPhoneNumber;
	}

	public void setPrimaryPhoneNumber(PhoneNumber primaryPhoneNumber) {
		if (primaryPhoneNumber != null)
			this.primaryPhoneNumber = primaryPhoneNumber;
		else {
			// throw input exception
		}
	}

//	public PhoneNumber getSecondaryPhoneNumber() {
//		return secondaryPhoneNumber;
//	}
//
//	public void setSecondaryPhoneNumber(PhoneNumber secondaryPhoneNumber) {
//		if (secondaryPhoneNumber != null)
//			this.secondaryPhoneNumber = secondaryPhoneNumber;
//		else {
//			// throw input exception
//		}
//	}

	public Email getPrimaryEmail() {
		return primaryEmail;
	}

	public void setPrimaryEmail(Email primaryEmail) {
		if (primaryEmail != null)
			this.primaryEmail = primaryEmail;
		else {
			// throw input exception
		}
	}

//	public Email getSecondaryEmail() {
//		return secondaryEmail;
//	}
//
//	public void setSecondaryEmail(Email secondaryEmail) {
//		if (secondaryEmail != null)
//			this.secondaryEmail = secondaryEmail;
//		else {
//			// throw input exception
//		}
//	}

	public Clinic getClinic() {
		return clinic;
	}

	public void setClinic(Clinic clinic) {
		if (clinic != null)
			this.clinic = clinic;
		else {
			// throw input exception
		}
	}

	public List<Patient> getPatients() {
		return patients;
	}

	public void setPatients(List<Patient> patients) {
		if (patients != null && patients.size() > 0)
			this.patients = patients;
		else {
			// throw input exception
		}
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}
}

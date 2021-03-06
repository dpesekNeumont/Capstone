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
@Table(name = "patient")
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(nullable = false)
	private String username;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String firstName;
	@Column(nullable = true)
	private String middlenitial;
	@Column(nullable = false)
	private String lastName;
	@Column(nullable = false)
	private long dob;
	@OneToOne(cascade=CascadeType.ALL)
	private Email primaryEmail;
//	@OneToOne(cascade=CascadeType.ALL)
//	private Email secondaryEmail;
	@OneToOne(cascade=CascadeType.ALL)
	private Address privaryAddress;
//	@OneToOne(cascade=CascadeType.ALL)
//	private Address secondaryAddress;
	@OneToOne(cascade=CascadeType.ALL)
	private PhoneNumber primaryPhoneNumber;
	@OneToOne(cascade=CascadeType.ALL)
//	private PhoneNumber secondaryPhoneNumber;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "doctor")
	private Doctor doctor;
	@OneToMany
	private List<Appointment> appointments;

	public Patient() {

	}

	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
			Address primaryAddress, PhoneNumber primaryPhoneNumber, Doctor doctor, long dob) {
		setFirstName(firstName);
		setLastName(lastName);
		setPrimaryEmail(primaryEmail);
		setPrivaryAddress(primaryAddress);
		setPrimaryPhoneNumber(primaryPhoneNumber);
		setUsername(username);
		setPassword(password);
		setDob(dob);
	}

	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
			Email primaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber, Doctor doctor, long dob) {
		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
		setMiddlenitial(middleInitial);
	}

//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryEmail(secondaryEmail);
//	}
//
//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryAddress(secondaryAddress);
//	}
//
//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Address primaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber, Doctor doctor,
//			Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}
//
//	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
//			Email primaryEmail, Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber,
//			Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setMiddlenitial(middleInitial);
//		setSecondaryEmail(secondaryEmail);
//	}
//
//	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
//			Email primaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber,
//			Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setMiddlenitial(middleInitial);
//		setSecondaryAddress(secondaryAddress);
//	}
//
//	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
//			Email primaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber,
//			PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//		setMiddlenitial(middleInitial);
//	}
//
//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Email secondaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber,
//			Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryEmail(secondaryEmail);
//		setSecondaryAddress(secondaryAddress);
//	}
//
//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber,
//			PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryEmail(secondaryEmail);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}
//
//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber,
//			PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryAddress(secondaryAddress);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}

//	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
//			Email primaryEmail, Email secondaryEmail, Address primaryAddress, Address secondaryAddress,
//			PhoneNumber primaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setMiddlenitial(middleInitial);
//		setSecondaryAddress(secondaryAddress);
//		setSecondaryEmail(secondaryEmail);
//	}

//	public Patient(String username, String password, String firstName, String middleInital, String lastName,
//			Email primaryEmail, Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber,
//			PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setMiddlenitial(middleInital);
//		setSecondaryEmail(secondaryEmail);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}

//	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
//			Email primaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber,
//			PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setMiddlenitial(middleInitial);
//		setSecondaryAddress(secondaryAddress);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}

//	public Patient(String username, String password, String firstName, String lastName, Email primaryEmail,
//			Email secondaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber,
//			PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setSecondaryEmail(secondaryEmail);
//		setSecondaryAddress(secondaryAddress);
//		setSecondaryPhoneNumber(secondaryPhoneNumber);
//	}

//	public Patient(String username, String password, String firstName, String middleInitial, String lastName,
//			Email primaryEmail, Email secondaryEmail, Address primaryAddress, Address secondaryAddress,
//			PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber, Doctor doctor, Date dob) {
//		this(username, password, firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber, doctor, dob);
//		setMiddlenitial(middleInitial);
//		setSecondaryEmail(secondaryEmail);
//		setSecondaryAddress(secondaryAddress);
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

	public String getMiddlenitial() {
		return middlenitial;
	}

	public void setMiddlenitial(String middlenitial) {
		if (!middlenitial.isEmpty() && middlenitial != null)
			this.middlenitial = middlenitial;
		else {
			// throw input exception
		}
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		if (!lastName.isEmpty() && lastName != null)
			this.lastName = lastName;
		else {
			// throw input exception
		}
	}

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

	public Address getPrivaryAddress() {
		return privaryAddress;
	}

	public void setPrivaryAddress(Address privaryAddress) {
		if (privaryAddress != null)
			this.privaryAddress = privaryAddress;
		else {
			// throw input exception
		}
	}

//	public Address getSecondaryAddress() {
//		return secondaryAddress;
//	}
//
//	public void setSecondaryAddress(Address secondaryAddress) {
//		if (secondaryAddress != null)
//			this.secondaryAddress = secondaryAddress;
//		else {
//			// throw input exception
//		}
//	}

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

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		if (doctor != null)
			this.doctor = doctor;
		else {
			// throw input exception
		}
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		if (!username.isEmpty() && username != null)
			this.username = username;
		else {
			// throw input exception
		}
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		if (!password.isEmpty() && password != null)
			this.password = password;
		else {
			// throw input exception
		}
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		if (appointments != null && appointments.size() > 0)
			this.appointments = appointments;
		else {
			// throw input exception
		}
	}

	public long getDob() {
		return dob;
	}

	public void setDob(long dob) {
		this.dob = dob;
	}
}

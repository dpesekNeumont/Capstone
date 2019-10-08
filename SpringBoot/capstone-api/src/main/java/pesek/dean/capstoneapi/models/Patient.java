package pesek.dean.capstoneapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="patient")
public class Patient {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	@Column(nullable=false)
	private String firstName;
	@Column(nullable=true)
	private String middlenitial;
	@Column(nullable=false)
	private String lastName;
	@Column(nullable=false)
	private Email primaryEmail;
	@Column(nullable=true)
	private Email secondaryEmail;
	@Column(nullable=false)
	private Address privaryAddress;
	@Column(nullable=true)
	private Address secondaryAddress;
	@Column(nullable=false)
	private PhoneNumber primaryPhoneNumber;
	@Column(nullable=true)
	private PhoneNumber secondaryPhoneNumber;
	
	public Patient() {
		
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber) {
		setFirstName(firstName);
		setLastName(lastName);
		setPrimaryEmail(primaryEmail);
		setPrivaryAddress(primaryAddress);
		setPrimaryPhoneNumber(primaryPhoneNumber);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInitial);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryEmail(secondaryEmail);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryAddress(secondaryAddress);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInitial);
		setSecondaryEmail(secondaryEmail);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInitial);
		setSecondaryAddress(secondaryAddress);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail,Address primaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
		setMiddlenitial(middleInitial);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryEmail(secondaryEmail);
		setSecondaryAddress(secondaryAddress);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryEmail(secondaryEmail);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryAddress(secondaryAddress);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInitial);
		setSecondaryAddress(secondaryAddress);
		setSecondaryEmail(secondaryEmail);
	}
	
	public Patient(String firstName, String middleInital, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInital);
		setSecondaryEmail(secondaryEmail);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInitial);
		setSecondaryAddress(secondaryAddress);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
	public Patient(String firstName, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setSecondaryEmail(secondaryEmail);
		setSecondaryAddress(secondaryAddress);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
	public Patient(String firstName, String middleInitial, String lastName, Email primaryEmail, Email secondaryEmail, Address primaryAddress, Address secondaryAddress, PhoneNumber primaryPhoneNumber, PhoneNumber secondaryPhoneNumber) {
		this(firstName, lastName, primaryEmail, primaryAddress, primaryPhoneNumber);
		setMiddlenitial(middleInitial);
		setSecondaryEmail(secondaryEmail);
		setSecondaryAddress(secondaryAddress);
		setSecondaryPhoneNumber(secondaryPhoneNumber);
	}
	
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
		this.firstName = firstName;
	}
	public String getMiddlenitial() {
		return middlenitial;
	}
	public void setMiddlenitial(String middlenitial) {
		this.middlenitial = middlenitial;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Email getPrimaryEmail() {
		return primaryEmail;
	}
	public void setPrimaryEmail(Email primaryEmail) {
		this.primaryEmail = primaryEmail;
	}
	public Email getSecondaryEmail() {
		return secondaryEmail;
	}
	public void setSecondaryEmail(Email secondaryEmail) {
		this.secondaryEmail = secondaryEmail;
	}
	public Address getPrivaryAddress() {
		return privaryAddress;
	}
	public void setPrivaryAddress(Address privaryAddress) {
		this.privaryAddress = privaryAddress;
	}
	public Address getSecondaryAddress() {
		return secondaryAddress;
	}
	public void setSecondaryAddress(Address secondaryAddress) {
		this.secondaryAddress = secondaryAddress;
	}
	public PhoneNumber getPrimaryPhoneNumber() {
		return primaryPhoneNumber;
	}
	public void setPrimaryPhoneNumber(PhoneNumber primaryPhoneNumber) {
		this.primaryPhoneNumber = primaryPhoneNumber;
	}
	public PhoneNumber getSecondaryPhoneNumber() {
		return secondaryPhoneNumber;
	}
	public void setSecondaryPhoneNumber(PhoneNumber secondaryPhoneNumber) {
		this.secondaryPhoneNumber = secondaryPhoneNumber;
	}
}

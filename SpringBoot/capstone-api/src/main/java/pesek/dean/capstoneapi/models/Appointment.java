package pesek.dean.capstoneapi.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="appointment")
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(nullable=false)
	private Date date;
	@ManyToOne
	@JoinColumn(name = "patient")
	private Patient patient;
	@ManyToOne
	@JoinColumn(name = "doctor")
	private Doctor doctor;
	@Column(nullable=true)
	private int roomNum;
	@Column(nullable=false)
	private boolean needsWorkPriorToAppt;

	public Appointment() {

	}

	public Appointment(Date date, Patient patient, Doctor doctor, boolean needswork) {
		setDate(date);
		setPatient(patient);
		setDoctor(doctor);
	}

	public Appointment(Date date, Patient patient, Doctor doctor, boolean needswork, int roomNum) {
		this(date, patient, doctor, needswork);
		setRoomNum(roomNum);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		if (date != null)
			this.date = date;
		else {
			// throw input exception
		}
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		if (patient != null)
			this.patient = patient;
		else {
			// throw input exception
		}
	}

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

	public int getRoomNum() {
		return roomNum;
	}

	public void setRoomNum(int roomNum) {
		if (roomNum > 0)
			this.roomNum = roomNum;
		else  {
			// throw input exception
		}
	}

	public boolean isNeedsWorkPriorToAppt() {
		return needsWorkPriorToAppt;
	}

	public void setNeedsWorkPriorToAppt(boolean needsWorkPriorToAppt) {
		this.needsWorkPriorToAppt = needsWorkPriorToAppt;
	}
}

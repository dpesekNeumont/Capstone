package pesek.dean.capstoneapi.models;

import javax.persistence.CascadeType;
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
	private long date;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "patient")
	private Patient patient;
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "doctor")
	private Doctor doctor;
	@Column(nullable=true)
	private int roomNum;
	@Column(nullable=false)
	private boolean needsWorkPriorToAppt;
	@Column(nullable=false)
	private boolean checkedIn;
	@Column(nullable=false)
	private boolean finished;

	public Appointment() {

	}

	public Appointment(long date, Patient patient, Doctor doctor, boolean needswork) {
		setDate(date);
		setPatient(patient);
		setDoctor(doctor);
	}

	public Appointment(long date, Patient patient, Doctor doctor, boolean needswork, int roomNum) {
		this(date, patient, doctor, needswork);
		setRoomNum(roomNum);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public boolean isCheckedIn() {
		return checkedIn;
	}

	public void setCheckedIn(boolean checkedIn) {
		this.checkedIn = checkedIn;
	}

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}
}

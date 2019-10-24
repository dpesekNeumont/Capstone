package pesek.dean.capstoneapi.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="clinic")
public class Clinic {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(nullable=false)
	private String name;
	@OneToMany(cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Doctor> doctors;
	@Column(nullable=false)
	private int numOfRooms;

	public Clinic() {

	}

	public Clinic(String name, List<Doctor> doctors, int numOfRooms) {
		setName(name);
		setDoctors(doctors);
		setNumOfRooms(numOfRooms);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		if (!name.isEmpty() && name != null)
			this.name = name;
		else {
			// throw input exception
		}
	}

	public List<Doctor> getDoctors() {
		return doctors;
	}

	public void setDoctors(List<Doctor> doctors) {
		if (doctors != null)
			this.doctors = doctors;
		else {
			// throw input exception
		}
	}

	public int getNumOfRooms() {
		return numOfRooms;
	}

	public void setNumOfRooms(int numOfRooms) {
		if (numOfRooms > 0)
			this.numOfRooms = numOfRooms;
		else {
			// throw input exception
		}
	}
}

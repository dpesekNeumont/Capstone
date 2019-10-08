package pesek.dean.capstoneapi.models;

import java.util.List;

public class Clinic {
	private int id;
	private String name;
	private List<Doctor> doctors;
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

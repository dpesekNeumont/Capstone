package pesek.dean.capstoneapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="address")
public class Address {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	@Column(nullable=false)
	private String streetAddress;
	@Column(nullable=false)
	private String city;
	@Column(nullable=false)
	private String stateAbrev;
	@Column(nullable=false)
	private int zipCode;
	@Column(nullable=false)
	private int zipCodeExtension;

	public Address() {

	}

	public Address(String streetAddress, String city, String stateAbbreviation, int zipCode) {
		if (!streetAddress.isEmpty() && streetAddress != null)
			setStreetAddress(streetAddress);
		if (!city.isEmpty() && city != null)
			setCity(city);
		if (stateAbbreviation.length() == 2 && stateAbbreviation != null)
			setStateAbrev(stateAbbreviation);
		if (zipCode >= 500)
			setZipCode(zipCode);
	}

	public Address(String streetAddress, String city, String stateAbbreviation, int zipCode, int zipCodeExtension) {
		this(streetAddress, city, stateAbbreviation, zipCode);
		if (zipCodeExtension > 0)
			setZipCodeExtension(zipCodeExtension);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		if (!streetAddress.isEmpty() && streetAddress != null)
			this.streetAddress = streetAddress;
		else {
			// throw input exception
		}
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		if (!city.isEmpty() && city != null)
			this.city = city;
		else {
			// throw input exception
		}
	}

	public String getStateAbrev() {
		return stateAbrev;
	}

	public void setStateAbrev(String stateAbrev) {
		if (!city.isEmpty() && city != null)
			this.stateAbrev = stateAbrev;
		else {
			// throw input exception
		}
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		if (zipCode >= 500)
			this.zipCode = zipCode;
		else {
			// throw input exception
		}
	}

	public int getZipCodeExtension() {
		return zipCodeExtension;
	}

	public void setZipCodeExtension(int zipCodeExtension) {
		if (zipCodeExtension > 0)
			this.zipCodeExtension = zipCodeExtension;
		else {
			// throw input exception
		}
	}
}

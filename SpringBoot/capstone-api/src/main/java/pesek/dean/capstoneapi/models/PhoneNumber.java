package pesek.dean.capstoneapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="phoneNumber")
public class PhoneNumber {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	@Column(nullable=false)
	private String areaCode;
	@Column(nullable=false)
	private String middleNums;
	@Column(nullable=false)
	private String lastFour;

	public PhoneNumber() {
		
	}
	
	public PhoneNumber(String areaCode, String middleNums, String lastFour) {
		if (areaCode.length() == 3 && middleNums.length() == 3 && lastFour.length() == 4) {
			setAreaCode(areaCode);
			setMiddleNums(middleNums);
			setLastFour(lastFour);
		}
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		if (areaCode.length() == 3)
			this.areaCode = areaCode;
		else {
			// throw custom exception, about invalid input
		}
	}

	public String getMiddleNums() {
		return middleNums;
	}

	public void setMiddleNums(String middleNums) {
		if (middleNums.length() == 3)
			this.middleNums = middleNums;
		else {
			// throw custom exception, about invalid input
		}
	}

	public String getLastFour() {
		return lastFour;
	}

	public void setLastFour(String lastFour) {
		if (lastFour.length() == 4)
			this.lastFour = lastFour;
		else {
			// throw custom exception, about invalid input
		}
	}
}

package pesek.dean.capstoneapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="email")
public class Email {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	@Column(nullable=false)
	private String username;
	@Column(nullable=false)
	private String domain;

	public Email() {

	}

	public Email(String username, String domain) {
		if ((!username.isEmpty() && username != null) && (!domain.isEmpty() && domain != null)) {
			setUsername(username);
			setDomain(domain);
		} else {
			// throw input exception
		}
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		if (!domain.isEmpty() && domain != null)
			this.domain = domain;
		else {
			//throw input exception
		}
	}
}

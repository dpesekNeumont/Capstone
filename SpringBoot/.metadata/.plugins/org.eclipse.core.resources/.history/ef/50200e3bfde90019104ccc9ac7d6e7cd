package pesek.dean.capstoneapi.models;

public class Email {
	private int id;
	private String username;
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

package pesek.dean.capstoneapi.models;

public class ClinicStaff {
	private int id;
	private String username;
	private String password;
	private boolean admin;

	public ClinicStaff() {

	}

	public ClinicStaff(String username, String password, boolean admin) {
		setUsername(username);
		setPassword(password);
		setAdmin(admin);
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		if (!password.isEmpty() && username != null)
			this.password = password;
		else {
			// throw input exception
		}
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}
}
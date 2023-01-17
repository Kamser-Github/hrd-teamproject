package user;

import java.sql.Date;

public class UserDto {
	
	private int no;
	private String name;
	private Date birthday;
	private String gender;
	private String id;
	private String address;
	private String phone;
	private String password;
	private String token;
	
	// 카카오 회원 token은 카카오에서 뺴온 id값 ex) 2353215
	public UserDto(int no, String name, Date birthday, String gender, String id, String address, String phone, String password, String token) {
		super();
		this.no = no;
		this.id = id;
		this.password = password;
		this.name = name;
		this.birthday = birthday;
		this.gender = gender;
		this.address = address;
		this.phone = phone;
		this.token = token;
	}
	
	// 일반 회원
	public UserDto(int no, String name, Date birthday, String gender, String id, String address, String phone, String password) {
		super();
		this.no = no;
		this.name = name;
		this.birthday = birthday;
		this.gender = gender;
		this.id = id;
		this.address = address;
		this.phone = phone;
		this.password = password;
	}
	//카카오 아이디 중복 검사
	public UserDto(String token) {
		super();
		this.token = token;
	}

	// getter & setter
	public int getNo() {
		return no;
	}

//	public void setNo(int no) {
//		this.no = no;
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getId() {
		return id;
	}

//	public void setId(String id) {
//		this.id = id;
//	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	@Override
	public String toString() {
		return "UserDto [no=" + no + ", name=" + name + ", birthday=" + birthday + ", gender=" + gender + ", id=" + id
				+ ", address=" + address + ", phone=" + phone + ", password=" + password + ", token=" + token + "]";
	}
//	public void setToken(String token) {
//		this.token = token;
//	}
}

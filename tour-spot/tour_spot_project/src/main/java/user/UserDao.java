package user;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import util.DBManager;
import util.Print;

public class UserDao {
	private String url;
	private String user;
	private String password;
	
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private DBManager manager = new DBManager();
	
	private UserDao() {
		this.url = manager.getUrl();
        this.user = manager.getUser();
        this.password = manager.getPassword();
        
        this.conn = null;
        this.pstmt = null;
        this.rs = null;
	}
	
	private static UserDao instance = new UserDao();
	
	public static UserDao getInstance() {
		return instance;
	}
	
	// C R U D
	// 1. C
	
	// 회원 생성
	public void createUser(UserDto dto) {
		// no, name, birthday, gender, id, address, phone, password, token
		String sql = "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
		int no = noGenerator();
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setInt(1, no);
			this.pstmt.setString(2, dto.getName());
			this.pstmt.setDate(3, dto.getBirthday());
			this.pstmt.setString(4, dto.getGender());
			this.pstmt.setString(5, dto.getId());
			this.pstmt.setString(6, dto.getAddress());
			this.pstmt.setString(7, dto.getPhone());
			this.pstmt.setString(8, dto.getPassword());
			this.pstmt.setString(9, dto.getToken());
			
			this.pstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	// 회원코드 자동생성
	public int noGenerator() {
		String sql = "SELECT MAX(`no`) FROM users;";
		int no = 0;
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.rs = this.pstmt.executeQuery();
			
			if(rs.next()) {
				no = this.rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return ++no;
	}
	
	// R
	// 유저 전체 불러오기
	public ArrayList<UserDto> getUserAll() {
		ArrayList<UserDto> list = new ArrayList<UserDto>();
		String sql = "SELECT * FROM users";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.rs = this.pstmt.executeQuery();
			
			while(rs.next()) {
				int no = this.rs.getInt(1);
				String name = this.rs.getString(2);
				Date birthday = this.rs.getDate(3);
				String gender = this.rs.getString(4);
				String id = this.rs.getString(5);
				String address = this.rs.getString(6);
				String phone = this.rs.getString(7);
				String token = this.rs.getString(8);
				
				UserDto dto = new UserDto(no, name, birthday, gender, id, address, phone, phone, token);
				list.add(dto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}
	
	// 회원코드로 유저 정보 불러오기.
	public UserDto getUserByNo(int no) {
		UserDto user = null;
		String sql = "SELECT * FROM users WHERE `no` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setInt(1, no);
			this.rs = this.pstmt.executeQuery();
			
			if(rs.next()) {
				String name = this.rs.getString(2);
				Date birthday = this.rs.getDate(3);
				String gender = this.rs.getString(4);
				String id = this.rs.getString(5);
				String address = this.rs.getString(6);
				String phone = this.rs.getString(7);
				String password = this.rs.getString(8);
				String token = this.rs.getString(9);
				
				user = new UserDto(no, name, birthday, gender, id, address, phone, password, token);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return user;
	}
	
	public String findByUserID(String userID) {
		int result = -1;
		String sql = "SELECT count(NO) FROM users WHERE id = ?";
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = conn.prepareStatement(sql);
			this.pstmt.setString(1, userID);
			this.rs = pstmt.executeQuery();
			if(rs.next()) {
				result = rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return Print.indexOf(result);
	}
	
	//토큰으로 유저 가져오기
	public UserDto getUserByToken(String token) {
		UserDto user = null;
		
		String sql = "SELECT * FROM users WHERE `token` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setString(1,token);
			this.rs = this.pstmt.executeQuery();
			
			if(rs.next()) {
				int no = this.rs.getInt(1);
				String name = this.rs.getString(2);
				Date birthday = this.rs.getDate(3);
				String gender = this.rs.getString(4);
				String id = this.rs.getString(5);
				String address = this.rs.getString(6);
				String phone = this.rs.getString(7);
				String password = this.rs.getString(8);
				user = new UserDto(no, name, birthday, gender, id, address, phone, password, token);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return user;
	}
	
	
	// id로 회원 정보 가져오기
	public UserDto getUserById(String id) {
		UserDto user = null;
		String sql = "SELECT * FROM users WHERE `id` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setString(1, id);
			this.rs = this.pstmt.executeQuery();
			
			if(rs.next()) {
				int no = this.rs.getInt(1);
				String name = this.rs.getString(2);
				Date birthday = this.rs.getDate(3);
				String gender = this.rs.getString(4);
				String address = this.rs.getString(6);
				String phone = this.rs.getString(7);
				String password = this.rs.getString(8);
				String token = this.rs.getString(9);
				
				user = new UserDto(no, name, birthday, gender, id, address, phone, password, token);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return user;
	}
	
	// 카카오 회원전용 가입
	// 없을 시 -> 회원 가입   /  있으면 -> 이 메소드를 활용해 정보를 가져와서 로그인완료.
	public UserDto getUserByToken(UserDto dto) {
		UserDto user = null;
		String token = dto.getToken();
		String sql = "SELECT * FROM users WHERE `token` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setString(1, token);
			this.rs = this.pstmt.executeQuery();
			
			if(rs.next()) {
				int no = this.rs.getInt(1);
				String name = this.rs.getString(2);
				Date birthday = this.rs.getDate(3);
				String gender = this.rs.getString(4);
				String address = this.rs.getString(6);
				String phone = this.rs.getString(7);
				String password = this.rs.getString(8);
				
				user = new UserDto(no, name, birthday, gender, gender, address, phone, password, token);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		
		return user;
	}
	//유저 확인 유무
	public boolean contain(UserDto dto) {
		boolean checkUser = false;
		String token = dto.getToken();
		String sql = "SELECT * FROM users WHERE `token` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setString(1, token);
			this.rs = this.pstmt.executeQuery();
			
			if(rs.next()) {
				checkUser = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return checkUser;
	}
	
	
	// U
	// 유저 정보 수정
	public void updateUserInfo(UserDto dto) {
		int no = dto.getNo();
		String name = dto.getName();
		String address = dto.getAddress();
		String phone = dto.getPhone();
		String password = dto.getPassword();
		
		String sql  = "UPDATE users SET `password` = ?, `name` = ?, phone = ?, address = ? where `no` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setString(1, password);
			this.pstmt.setString(2, name);
			this.pstmt.setString(3, phone);
			this.pstmt.setString(4, address);
			this.pstmt.setInt(5, no);
			
			this.pstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	// D
	public void deleteUser(UserDto dto) {
		int no = dto.getNo();
		
		String sql = "DELETE FROM users where `no` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setInt(1, no);
			
			this.pstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.conn.close();
				this.pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}

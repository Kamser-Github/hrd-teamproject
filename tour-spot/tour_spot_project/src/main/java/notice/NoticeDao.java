package notice;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import util.DBManager;

public class NoticeDao {
	
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private String url;
	private String user;
	private String password;
	
	private DBManager manager = new DBManager();
	
	private NoticeDao() {
		this.url = manager.getUrl();
        this.user = manager.getUser();
        this.password = manager.getPassword();
        
        this.conn = null;
        this.pstmt = null;
        this.rs = null;
	}
	
	private static NoticeDao instance = new NoticeDao();
	
	public static NoticeDao getInstance() {
		return instance;
	}
	
	// 생성
	public void createNotice(NoticeDto notice) {
		String sql = "insert into notices values(?, ?, ?, ?, ?, ?)";
		int n_no = noGenerator();
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			Timestamp now = new Timestamp(System.currentTimeMillis());
			this.pstmt.setInt(1, n_no);
			this.pstmt.setString(2, notice.getUser_id());
			this.pstmt.setString(3, notice.getTitle());
			this.pstmt.setString(4, notice.getContent());
			this.pstmt.setTimestamp(5, now);
			this.pstmt.setInt(6, 0);
			
			this.pstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.pstmt.close();
				this.conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	private int noGenerator() {
		String sql = "SELECT MAX(`n_no`) FROM notices";
		int n_no = 0;
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.rs = this.pstmt.executeQuery();
			
			if(this.rs.next()) {
				n_no = this.rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.rs.close();
				this.pstmt.close();
				this.conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return ++n_no;
	}
	
	// Read
	// All
	public ArrayList<NoticeDto> getNoticeAll() {
		ArrayList<NoticeDto> list = new ArrayList<NoticeDto>();
		String sql = "SELECT * FROM notices ORDER BY `n_no` DESC";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.rs = this.pstmt.executeQuery();
			
			if(this.rs.next()) {
				do {
					int n_no = this.rs.getInt(1);
					String user_id = this.rs.getString(2);
					String title = this.rs.getString(3);
					String content = this.rs.getString(4);
					Timestamp regDate = this.rs.getTimestamp(5);
					int viewCnt = this.rs.getInt(6);
					
					NoticeDto notice = new NoticeDto(n_no, user_id, title, content, regDate, viewCnt);
					list.add(notice);
						
					} while(this.rs.next());
			} else {
				System.out.println("Empty");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.rs.close();
				this.pstmt.close();
				this.conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return list;
	}
	
	// one
	public NoticeDto getNoticeByNo(int n_no) {
		NoticeDto notice = null;
		String sql = "SELECT * FROM notices WHERE `n_no` = ? ";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setInt(1, n_no);
			this.rs = this.pstmt.executeQuery();
			
			if(this.rs.next()) {
				String user_id = this.rs.getString(2);
				String title = this.rs.getString(3);
				String content = this.rs.getString(4);
				Timestamp regDate = this.rs.getTimestamp(5);
				int viewCnt = this.rs.getInt(6);
				
				notice = new NoticeDto(n_no, user_id, title, content, regDate, viewCnt);
				System.out.println(notice.getN_no());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.rs.close();
				this.pstmt.close();
				this.conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return notice;
	}
	
	// update viewCnt
	public void updateViewCnt(int n_no) {
		String sql = "UPDATE notices SET viewCnt=viewCnt+1 WHERE `n_no` = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			
			this.pstmt.setInt(1, n_no);
			
			this.pstmt.executeUpdate();
			
			System.out.println("조회수 1 증가");
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.pstmt.close();
				this.conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	// d
	public void deleteNotice(NoticeDto notice) {
		String sql = "DELETE FROM notices WHERE n_no = ?";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = conn.prepareStatement(sql);
			this.pstmt.setInt(1, notice.getN_no());
			
			this.pstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				this.pstmt.close();
				this.conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}

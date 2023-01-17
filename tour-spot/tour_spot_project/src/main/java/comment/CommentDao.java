package comment;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import util.DBManager;

public class CommentDao {
	
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private String url;
	private String user;
	private String password;
	
	private DBManager manager = new DBManager();
	
	private CommentDao() {
		this.url = manager.getUrl();
        this.user = manager.getUser();
        this.password = manager.getPassword();
        
        this.conn = null;
        this.pstmt = null;
        this.rs = null;
	}
	private static CommentDao instance = new CommentDao();
	public static CommentDao getInstance() {
		return instance;
	}
	
	// Create
	public void createComment(CommentDto comment) {
		String sql = "insert into comments values(?, ?, ?, ?, ?, ?);";
		int no = noGenerator();
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			Timestamp now = new Timestamp(System.currentTimeMillis());
			this.pstmt.setInt(1, no);
			this.pstmt.setInt(2, comment.getb_no());
			this.pstmt.setString(3, comment.getContent());
			this.pstmt.setString(4, comment.getuser_id());
			
			this.pstmt.setTimestamp(5, now);
			this.pstmt.setTimestamp(6, now);
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
	
	private int noGenerator() {
		String sql = "SELECT MAX(`c_no`) FROM comments;";
		int no = 0;
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.rs = this.pstmt.executeQuery();
			
			if(this.rs.next()) {
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
	
	// 게시글 번호로 Read
	public ArrayList<CommentDto> getCommentAll(int no){
		ArrayList<CommentDto> list = new ArrayList<CommentDto>();
		String sql = "SELECT * FROM comments WHERE `b_no`=? ORDER BY c_no DESC;";
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setInt(1, no);
			this.rs = this.pstmt.executeQuery();
			
			while(this.rs.next()) {
				int c_no = this.rs.getInt(1);
				int b_no = this.rs.getInt(2);
				String content = this.rs.getString(3);
				String user_id = this.rs.getString(4);
				Timestamp regDate = this.rs.getTimestamp(5);
				Timestamp modDate = this.rs.getTimestamp(6);
				
				CommentDto comment = new CommentDto(c_no, b_no, content, user_id, regDate, modDate);
				list.add(comment);
			}
			System.out.println("성공");
		}catch (Exception e) {
			e.printStackTrace();
			System.out.println("실패");
		}finally {
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
	// 유저 아이디로 검색.
		public ArrayList<CommentDto> getUserCommentAll(String userId){
			ArrayList<CommentDto> list = new ArrayList<CommentDto>();
			String sql = "SELECT * FROM comments WHERE `user_id`=? ORDER BY c_no DESC;";
			try {
				this.conn = DBManager.getConnection(this.url, this.user, this.password);
				this.pstmt = this.conn.prepareStatement(sql);
				this.pstmt.setString(1, userId);
				this.rs = this.pstmt.executeQuery();
				
				while(this.rs.next()) {
					int c_no = this.rs.getInt(1);
					int b_no = this.rs.getInt(2);
					String content = this.rs.getString(3);
					String user_id = this.rs.getString(4);
					Timestamp regDate = this.rs.getTimestamp(5);
					Timestamp modDate = this.rs.getTimestamp(6);
					
					CommentDto comment = new CommentDto(c_no, b_no, content, user_id, regDate, modDate);
					list.add(comment);
				}
				System.out.println("성공");
			}catch (Exception e) {
				e.printStackTrace();
				System.out.println("실패");
			}finally {
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
	
	// 댓글 번호로 Read
		public CommentDto getCommentOne(int no){
			CommentDto comment = null;
			System.out.println(no);
			String sql = "SELECT * FROM comments WHERE `c_no`=?;";
			try {
				this.conn = DBManager.getConnection(this.url, this.user, this.password);
				this.pstmt = this.conn.prepareStatement(sql);
				this.pstmt.setInt(1, no);
				this.rs = this.pstmt.executeQuery();
				
				if(this.rs.next()) {
					int c_no = this.rs.getInt(1);
					int b_no = this.rs.getInt(2);
					String content = this.rs.getString(3);
					String user_id = this.rs.getString(4);
					Timestamp regDate = this.rs.getTimestamp(5);
					Timestamp modDate = this.rs.getTimestamp(6);
					
					comment = new CommentDto(c_no, b_no, content, user_id, regDate, modDate);
				}
				System.out.println("성공");
			}catch (Exception e) {
				e.printStackTrace();
				System.out.println("실패");
			}finally {
				try {
					this.conn.close();
					this.pstmt.close();
					this.rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			return comment;
		}
	
	// Update
	public void updateComment(CommentDto comment) {
		String sql = "update comments set content = ?, modDate = ? WHERE c_no = ?;";
		
		int c_no = comment.getc_no();
		String content = comment.getContent();
		System.out.println("dao cnt : " + content);
			
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			Timestamp modDate = new Timestamp(System.currentTimeMillis());
			this.pstmt.setString(1, content);
			this.pstmt.setTimestamp(2, modDate);
			this.pstmt.setInt(3, c_no);
			this.pstmt.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	// Delete
	public void deleteComment(int no) {
		System.out.println("no : " + no);
		String sql = "DELETE FROM comments WHERE c_no = ?;";
		
		try {
			this.conn = DBManager.getConnection(this.url, this.user, this.password);
			this.pstmt = this.conn.prepareStatement(sql);
			this.pstmt.setInt(1, no);
			
			this.pstmt.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				this.conn.close();
				this.pstmt.close();
				this.rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
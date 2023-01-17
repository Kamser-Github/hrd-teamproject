package comment;

import java.sql.Timestamp;

public class CommentDto {
	
	private int c_no;				// PK
	private int b_no;				// FK
	private String content;
	private String user_id;			// FK
	private Timestamp regDate, modDate;
	
	public CommentDto(int c_no, int b_no, String content, String user_id, Timestamp regDate, Timestamp modDate) {
		super();
		this.c_no = c_no;
		this.b_no = b_no;
		this.content = content;
		this.user_id = user_id;
		this.regDate = regDate;
		this.modDate = modDate;
	}
	
	public CommentDto(String user_id, String content, int b_no) {
		super();
		this.content = content;
		this.user_id = user_id;
		this.b_no = b_no;
	}
	
	public CommentDto(String user_id, String content) {
		super();
		this.content = content;
		this.user_id = user_id;
	}
	
	public CommentDto(int c_no, String content) {
		super();
		this.c_no = c_no;
		this.content = content;
	}
	public CommentDto(int c_no) {
		super();
		this.c_no = c_no;
	}
	
	public int getc_no() {
		return c_no;
	}
	
//	public vouser_id setc_no(int c_no) {
//		this.c_no = c_no;
//	}
	
	public int getb_no() {
		return b_no;
	}
	
//	public vouser_id setb_no(int b_no) {
//		this.b_no = b_no;
//	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getuser_id() {
		return user_id;
	}
	
//	public vouser_id setuser_id(String user_id) {
//		this.user_id = user_id;
//	}
	
	public Timestamp getRegDate() {
		return regDate;
	}
	
	public void setRegDate(Timestamp regDate) {
		this.regDate = regDate;
	}
	
	public Timestamp getModDate() {
		return modDate;
	}
	
	public void setModDate(Timestamp modDate) {
		this.modDate = modDate;
	}
	// 확인
}

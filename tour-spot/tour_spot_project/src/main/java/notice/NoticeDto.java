package notice;

import java.sql.Timestamp;

public class NoticeDto {
	// 게시글넘버 / 아이디 / 타이틀 / 컨텐트 / 작성날짜 / 조회수
	private int n_no;  // PK
	private String user_id;
	private String title;
	private String content;
	private Timestamp regDate;
	private int viewCnt;
	
	public NoticeDto(int n_no, String user_id, String title, String content, Timestamp regDate, int viewCnt) {
		super();
		this.n_no = n_no;
		this.user_id = user_id;
		this.title = title;
		this.content = content;
		this.regDate = regDate;
		this.viewCnt = viewCnt;
	}
	
	public NoticeDto(String user_id, String title, String content) {
		super();
		this.user_id = user_id;
		this.title = title;
		this.content = content;
	}

	public int getN_no() {
		return n_no;
	}
	
//	public void setN_no(int n_no) {
//		this.n_no = n_no;
//	}
	
	public String getUser_id() {
		return user_id;
	}
	
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public Timestamp getRegDate() {
		return regDate;
	}
	
//	public void setRegDate(Timestamp regDate) {
//		this.regDate = regDate;
//	}
	
	public int getViewCnt() {
		return viewCnt;
	}
	
	public void setViewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}
	
	
}

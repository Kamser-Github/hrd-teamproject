package controllers.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import user.UserDao;
import user.UserDto;

public class MypageGo implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html; charset=euc-kr");
		PrintWriter out = response.getWriter();
		
		String id = request.getParameter("id");
		String password = request.getParameter("password");
		UserDao dao = UserDao.getInstance();
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("log"); 
		
		
		
		if(user_id == null) {
			System.out.println("회원인증 실패");
			out.println("<script>alert('로그인을 해주세요.');location.href='userConfirm';</script>");
		} else {
			UserDto dto = dao.getUserById(user_id);
			if(password.equals(dto.getPassword()) && id.equals(dto.getId())) {
				System.out.println("회원인증 성공");
				out.println("<script>alert('회원인증 완료');location.href='userPageNew';</script>");
			} else {
				System.out.println("회원인증 실패");
				out.println("<script>alert('회원인증 실패');location.href='userConfirm';</script>");
			}
		}
		out.flush();
	}
}

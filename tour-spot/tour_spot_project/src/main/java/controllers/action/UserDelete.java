package controllers.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import user.UserDao;
import user.UserDto;

public class UserDelete implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();

		UserDao dao = UserDao.getInstance();
		
		request.setCharacterEncoding("utf-8");
		HttpSession session = request.getSession();
		String logId = (String)session.getAttribute("log");
		UserDto dto = dao.getUserById(logId);
		
		String id = request.getParameter("id");
		String password = request.getParameter("password");
		
		System.out.println("logId : "+logId);
		System.out.println("getPassword : "+dto.getPassword());
		System.out.println("id : "+id);
		System.out.println("password : "+password);
		
		if(logId.equals(id) && password.equals(dto.getPassword())) {
			dao.deleteUser(dto);
			session.invalidate();
			out.println("<script>alert('회원탈퇴 완료');location.href='home';</script>");
		} else {
			out.println("<script>alert('회원탈퇴 실패');location.href='home';</script>");
		}
		
		
		
		out.close();
	}

}

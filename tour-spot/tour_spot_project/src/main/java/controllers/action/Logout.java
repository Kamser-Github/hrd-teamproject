package controllers.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Logout implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		String id = (String)session.getAttribute("log");
		System.out.println(id);
		
		if(id != null) {
			System.out.println("로그아웃 완료");
			session.invalidate();
			out.println("<script>alert('로그아웃 완료');location.href='home';</script>");
		}
		
		out.flush();
	}

}

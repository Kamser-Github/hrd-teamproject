package controllers.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.time.LocalDate;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import user.UserDao;
import user.UserDto;

public class Join implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		response.setContentType("text/html; charset=euc-kr");
		request.setCharacterEncoding("utf-8");
		UserDao dao = UserDao.getInstance();
		UserDto dto = null;
		
		int no = Integer.parseInt(request.getParameter("no"));
		String name = request.getParameter("name");
		
		String birth = request.getParameter("birthday");
		Date birthday = Date.valueOf(LocalDate.parse(birth));
		
		String gender = request.getParameter("gender");
		String id = request.getParameter("id");
		String address1 = request.getParameter("address1");
		String address2 = request.getParameter("address2");
		String address = address1+" "+address2;
		String phone = request.getParameter("phone1") + "-" + request.getParameter("phone2") + "-" + request.getParameter("phone3");
		String password = request.getParameter("password");
	//  String passwordCheck = request.getParameter("passwordCheck");
		String token = request.getParameter("token");
		
		System.out.println("token : "+token);
		System.out.println(name+birth+gender+id+address+phone+password+token);
		
		if(token.equals("")) {
			dto = new UserDto(no, name, birthday, gender, id, address, phone, password);
			System.out.println(dto);
			dao.createUser(dto);
			out.println("<script>alert('회원가입 완료');location.href='home';</script>");
		} else {
			dto = new UserDto(no, name, birthday, gender, id, address, phone, password, token);
			out.println("<script>alert('회원가입 완료');location.href='home';</script>");
		}
		
		
		out.flush();
	}

}

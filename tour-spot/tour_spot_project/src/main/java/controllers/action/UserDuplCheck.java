package controllers.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import user.UserDao;

public class UserDuplCheck implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.print("아이디 중복검사 : ");
		String id = request.getParameter("id");
		System.out.print(id);
		String result = UserDao.getInstance().findByUserID(id);
		try{
			response.getWriter().write(result);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}

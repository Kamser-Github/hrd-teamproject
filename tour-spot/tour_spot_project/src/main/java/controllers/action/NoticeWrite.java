package controllers.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import notice.NoticeDao;
import notice.NoticeDto;

public class NoticeWrite implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		NoticeDao dao = NoticeDao.getInstance();
		
		HttpSession session = request.getSession();
		String id = (String)session.getAttribute("log");
		
		if(id.equals("admin")) {
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			
			NoticeDto dto = new NoticeDto(id, title, content);
			dao.createNotice(dto);
		}
		
		request.getRequestDispatcher("notice").forward(request, response);
	}
}

package controllers.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import notice.NoticeDao;
import notice.NoticeDto;

public class NoticeDelete implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		
		NoticeDao dao = NoticeDao.getInstance();
		NoticeDto notice = null;
		
		if(request.getParameter("no") != null) {
			int b_no = Integer.parseInt(request.getParameter("no"));
			notice = dao.getNoticeByNo(b_no);
			dao.deleteNotice(notice);
			response.sendRedirect("notice");
		}
	}
}

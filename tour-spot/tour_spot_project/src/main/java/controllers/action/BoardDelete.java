package controllers.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import board.BoardDao;
import board.BoardDto;

public class BoardDelete implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=euc-kr");
		PrintWriter out = response.getWriter();
		
		BoardDao dao = BoardDao.getInstance();
		BoardDto board = null;
		
		if(request.getParameter("no") != null) {
			int b_no = Integer.parseInt(request.getParameter("no"));
			board = dao.getBoardByNo(b_no);
			dao.deleteBoard(board);
			
			out.println("<script>alert('삭제 완료');location.href='board';</script>");
		}
	}
}

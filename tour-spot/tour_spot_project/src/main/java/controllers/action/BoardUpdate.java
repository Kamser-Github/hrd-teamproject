package controllers.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import board.BoardDao;
import board.BoardDto;

public class BoardUpdate implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		BoardDao dao = BoardDao.getInstance();
		
		int b_no = Integer.parseInt(request.getParameter("b_no"));
		System.out.println(request.getParameter("b_no"));
		if(request.getParameter("b_no") != null) {
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String map_addr = request.getParameter("main_address");
			
			BoardDto board = new BoardDto(b_no, title, content, map_addr);
			dao.updateBoard(board);
		}
		
		response.sendRedirect("boardView?no=" + b_no);
	}
}

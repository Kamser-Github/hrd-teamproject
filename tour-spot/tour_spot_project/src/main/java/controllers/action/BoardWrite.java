package controllers.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import board.BoardDao;
import board.BoardDto;

public class BoardWrite implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		BoardDao dao = BoardDao.getInstance();
		
		HttpSession session = request.getSession();
		String id = (String)session.getAttribute("log");
		
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String map_addr = request.getParameter("main_address");
		String spot_url = request.getParameter("spot_img");
		
		
		if(title != null && content != null) {
			BoardDto dto = new BoardDto(id, title, content, map_addr, spot_url);
			dao.createBoard(dto);
		}
		
		request.getRequestDispatcher("board").forward(request, response);
	}
}

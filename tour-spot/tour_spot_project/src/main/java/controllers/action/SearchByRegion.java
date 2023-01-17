package controllers.action;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import board.BoardDao;
import board.BoardDto;

public class SearchByRegion implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		String area = request.getParameter("area");
		System.out.println("area : " + area);
		
		BoardDao dao = BoardDao.getInstance();
		
		if(area != null) {
			ArrayList<BoardDto> list = dao.getBoardSearch(area);
			if(list.size() > 0) {
				JSONArray result = new JSONArray(list);
				response.getWriter().append(result.toString());
			} else {
				response.getWriter().append("null");
			}
		}
		else {
			response.getWriter().append("null");;
		}
	}
}

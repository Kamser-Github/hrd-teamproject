package controllers.action;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import comment.CommentDao;
import comment.CommentDto;

public class CommentWrite implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		CommentDao dao = CommentDao.getInstance();
		
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("log");
		String content = request.getParameter("content");
		int b_no = Integer.parseInt(request.getParameter("b_no"));
		String command = request.getParameter("command");
		System.out.println("CW COMMAND : " + command);
		
		
		if(user_id != null && content != null && b_no != 0) {
			CommentDto comment = new CommentDto(user_id, content, b_no);
			dao.createComment(comment);	
			System.out.println("댓글 등록 성공");
		}
		else {			
			System.out.println(user_id + "님의 댓글 등록 실패");
		}
		
		ArrayList<CommentDto> list = dao.getCommentAll(b_no);
		if(list.size() > 0) {
			JSONArray result = new JSONArray();
			
			for(CommentDto dto : list) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("user_id", dto.getuser_id());
				jsonObj.put("b_no", dto.getb_no());
				jsonObj.put("content", dto.getContent());
				jsonObj.put("c_no", dto.getc_no());
				jsonObj.put("modDate", dto.getModDate());
				result.put(jsonObj);
			}
			response.getWriter().append(result.toString());
		} else {
			response.getWriter().append("null");				
		}
	}

}

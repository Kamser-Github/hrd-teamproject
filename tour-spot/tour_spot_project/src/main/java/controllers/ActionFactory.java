package controllers;

import controllers.action.Action;
import controllers.action.BoardDelete;
import controllers.action.BoardUpdate;
import controllers.action.BoardWrite;
import controllers.action.CommentDelete;
import controllers.action.CommentUpdate;
import controllers.action.CommentUpdateNo;
import controllers.action.CommentUpdateYes;
import controllers.action.CommentWrite;
import controllers.action.Join;
import controllers.action.Login;
import controllers.action.Logout;
import controllers.action.MyInfoUpdate;
import controllers.action.MypageGo;
import controllers.action.NoticeDelete;
import controllers.action.NoticeWrite;
import controllers.action.SearchByRegion;
import controllers.action.UserDelete;
import controllers.action.UserDuplCheck;

public class ActionFactory {
	
	private ActionFactory() {
		
	}
	
	private static ActionFactory instance = new ActionFactory();
	
	public static ActionFactory getInstance() {
		return instance;
	}
	
	public Action getAction(String command) {
		Action action = null;
		System.out.println("액션팩토리커맨드넘어옴 ?  : " + command);
		
		// User
		if(command.equals("Join")) { action = new Join(); }
		else if(command.equals("Login")) { action = new Login(); }
		else if(command.equals("Logout")) { action = new Logout(); }
		else if(command.equals("UserDuplCheck")) { action = new UserDuplCheck(); }
		else if(command.equals("UserDelete")) { action = new UserDelete(); }
		// Comment 
		else if(command.equals("CommentWrite")) { action = new CommentWrite(); }
		else if(command.equals("CommentDelete")) { action = new CommentDelete(); }
		else if(command.equals("CommentUpdate")) { action = new CommentUpdate(); }
		else if(command.equals("CommentUpdateYes")) { action = new CommentUpdateYes(); }
		else if(command.equals("CommentUpdateNo")) { action = new CommentUpdateNo(); }
		// Board
		else if(command.equals("BoardWrite")) { action = new BoardWrite(); }
		else if(command.equals("BoardUpdate")) { action = new BoardUpdate(); }
		else if(command.equals("BoardDelete")) { action = new BoardDelete(); }
		// Notice
		else if(command.equals("NoticeWrite")) { action = new NoticeWrite(); }
		else if(command.equals("NoticeDelete")) { action = new NoticeDelete(); }
		// Search
		else if(command.equals("SearchByRegion")) { action = new SearchByRegion(); }
		// Mypage
		else if(command.equals("MypageGo")) { action = new MypageGo(); }
		else if(command.equals("MyInfoUpdate")) { action = new MyInfoUpdate(); }
		
		System.out.println("액션팩토리 저장 잘됨 ? " + action);
		return action;
	}
}

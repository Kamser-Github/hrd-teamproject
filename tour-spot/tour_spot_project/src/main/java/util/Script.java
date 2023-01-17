package util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

public class Script {
	private Script() {}
	public static void href(String msg , String url , HttpServletResponse response) {
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>");
			out.println("alert("+msg+");");
			out.println("location.hef='"+url+"';");
			out.println("</script>");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static void print(String msg,HttpServletResponse response) {
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println(msg);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

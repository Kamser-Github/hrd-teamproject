package util;

public class Print {
	private Print() {}
	public static String indexOf(int result) {
		if (result < -1 || result > 1) {
			return "";
		}
		return result == 1 ? "EXISTS" : result == 0 ? "NOT_EXISTS" : "ERROR";
	}
}

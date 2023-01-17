package model;

public class KakaoJoinProfile {
	
	private String id;
	private String email;
	private String nickName;
	private String profileImageUrl;
	
	public KakaoJoinProfile(String id, String email, String nickName, String profileImageUrl) {
		super();
		this.id = id;
		this.email = email;
		this.nickName = nickName;
		this.profileImageUrl = profileImageUrl;
	}
	public String getId() {
		return id;
	}
	public String getEmail() {
		return email;
	}
	public String getNickName() {
		return nickName;
	}
	public String getProfileImageUrl() {
		return profileImageUrl;
	}
	@Override
	public String toString() {
		String combine = 
				String.format("","" );
		return combine;
	}
}

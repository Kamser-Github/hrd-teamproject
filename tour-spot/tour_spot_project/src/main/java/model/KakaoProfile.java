package model;

import model.KakaoProfile.KakaoAccount.Profile;

public class KakaoProfile {
	
	private String id;
	private KakaoAccount kakao_account;

	public class KakaoAccount {
		private Profile profile;
		private String email;
		private boolean has_email;
		
		public Profile getSubProfile() { return profile; }
		public String getSubEmail() { return email; }
		public boolean isHas_Subemail() { return has_email; }

		public class Profile {
			private String nickname;
			private String profile_image_url;
			
			public String getSubNickname() { return nickname; }
			public String getSubProfile_image_url() { return profile_image_url; }
		}
	}

	public String getId() { return id; }
	public String getEmail() {
		KakaoAccount account = getKakao_account();
		return account.getSubEmail();
	}
	public String getNickname() {
		return getProfile().getSubNickname();
	}
	public String getProfileImageUrl() {
		return getProfile().getSubProfile_image_url();
	}
	private KakaoAccount getKakao_account() {
		return kakao_account;
	}
	private Profile getProfile() {
		KakaoAccount account = getKakao_account();
		return account.getSubProfile();
	}
	@Override
	public String toString() {
		return "[ 유저 =" + getId() + ", email =" + getEmail() + ", 닉네임 =" + getNickname()
				+ "]";
	}
	
}

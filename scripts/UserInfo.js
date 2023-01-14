export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  }

  getUserInfo() {
    const profileInfo = {
      profileName: this._profileName.textContent,
      profileAbout: this._profileAbout.textContent,
    };
    return profileInfo;
  }

  setUserInfo(obj) {
    this._profileName.textContent = obj['popup-name_profile'];
    this._profileAbout.textContent = obj['popup-about_profile'];
  }
}

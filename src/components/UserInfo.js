export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const profileInfo = {
      profileName: this._profileName.textContent,
      profileAbout: this._profileAbout.textContent,
      profileAvatar: this._profileAvatar.src,
    };
    return profileInfo;
  }

  setUserInfo(obj) {
    this._profileName.textContent = obj.name;
    this._profileAbout.textContent = obj.about;
    this._profileAvatar.src = obj.avatar;
  }
}

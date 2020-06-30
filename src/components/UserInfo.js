export class UserInfo {
  constructor(author) {
    this._name = author.profileAuthor;
    this._info = author.profileStatus;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._info.textContent
    }
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.link;
  }
}

import mobx, { observable } from "mobx";

class FriendshipsStore {

  @observable acceptrequests = [];
  @observable stateAcceptRequest = false;

@observable friendlistcount;
@observable acceptrequestscount;

  // @observable fullscreen = !
}

var friendshipsstore = (window.friendshipsstore = new FriendshipsStore());

export default friendshipsstore;

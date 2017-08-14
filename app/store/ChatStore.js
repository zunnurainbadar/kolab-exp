import mobx, { observable } from "mobx";

class ChatStore {
    @observable groupname = " ";
    @observable groupavatar = " ";
    @observable groupId = " ";
    @observable roomData = [];
    @observable msgs = [];
    @observable chipContent = [];
    @observable notes = [];
    @observable participants = [];
    @observable individualnote = [];
    @observable individualmsg = [];
    @observable favourites = [];
    @observable note = [];
    @observable readcount;
    @observable folderId;
    @observable folderName;
    @observable notescount;
    @observable editedNote;
    @observable noteId;

    @observable leaveinfo;
    @observable leavegroupname = "";

    // @observable fullscreen = !
}

var chatstore = (window.chatstore = new ChatStore());

export default chatstore;
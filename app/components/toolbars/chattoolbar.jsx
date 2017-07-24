import React from "react";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import AppBar from "material-ui/AppBar";

import {
  grey400,
  darkBlack,
  lightBlack,
  blue300
} from "material-ui/styles/colors";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import MenuItem from "material-ui/MenuItem";
import AlertContainer from "react-alert";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import FontIcon from "material-ui/FontIcon";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ChatStore from "app/store/ChatStore.js";
import { observer } from "mobx-react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const bottomPadding = {
  paddingBottom: "12px"
};
const customContentStyle = {
  width: "30%",
  maxWidth: "none"
};
// const style =
// {
// left: '35%',
// };
const styleSearch = {
  left: "20%"
};

let users;

const iconButtonElement = (
  <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>{" "}
  </IconButton>
);
@observer
export default class Chatbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  SendFile = () => {
    var data, xhr;

    data = new FormData();
    data.append("file", $("#file")[0].files[0]);
    console.log(data);
    // xhr = new XMLHttpRequest();

    // xhr.open("POST", "/upload", true);
    // xhr.onreadystatechange = function(response) {};
    // xhr.send(data);
    // var data = new FormData();
    // var fd = new FormData();
    // fd.append("file", input.files[0]);
    // $.ajax({
    //   url: "/file/send",
    //   data: fd,
    //   processData: false,
    //   contentType: false,
    //   type: "POST",
    //   success: function(data) {
    //     alert(data);
    //   }
    // });
    // var imagedata = document.querySelector('input[type="file"]').files[0];
    // data.append("data", imagedata);
    // console.log(data);
    // $.ajax({
    //   method: "POST",
    //   url: "/file/send",
    //   data: data,
    //   cache: false,
    //   processData: false,
    //   contentType: false
    // })
    //   .done(data => {
    //     //resolve(data);
    //   })
    //   .fail(err => {
    //     //console.log("errorrr for file upload", err);
    //     //reject(err);
    //   });
  };

  render() {
    users = ChatStore.participants;
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.handleOpen}>Group Info</MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <Dialog
          modal={false}
          overlay={false}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <h5>Users in the group:</h5>
          <br />
          {users.map(Users => {
            return (
              <div key={Users.user_id}>
                <div className="" key={Users.user_id}>
                  <ListItem
                    key={Users.user_id}
                    leftAvatar={
                      <Avatar size={40} src={Users.picture}>
                        {Users.pic}
                      </Avatar>
                    }
                    primaryText={Users.name}
                  />
                </div>
              </div>
            );
          })}
          <br />
        </Dialog>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <List>
              <ListItem
                onTouchTap={this.handleOpen}
                leftAvatar={
                  <Avatar size={40} color={darkBlack}>
                    {ChatStore.groupavatar}
                  </Avatar>
                }
                primaryText={ChatStore.groupname}
              />
            </List>
          </ToolbarGroup>

          {/*<ToolbarGroup>
      		<button><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"/></svg></button>
         <button ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
          // <form method="post" action="saveBlog" enctype="multipart/form-data">
          //   <input type="file" name="myImage" />
          //   <input type="submit" name="submit" />
          // </form>

        </ToolbarGroup>*/}

          <ToolbarGroup lastChild={true} style={bottomPadding}>
            {/*<IconButton tooltip="top-center" touch={true} tooltipPosition="top-center">
      <ActionGrade />
    </IconButton>*/}
            <ListItem rightIconButton={rightIconMenu} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

// <form
//           ref="uploadForm"
//           id="uploadForm"
//           a`c`tion="http://localhost:3000/upload"
//           method="post"
//           encType="multipart/form-data"
//         >
//           <input type="file" name="sampleFile" />
//           <input type="submit" value="Upload!" />
//         </form>
//  <ToolbarGroup style={styleSearch}>
//           <IconButton
//             tooltip="search..."
//             touch={true}
//             tooltipPosition="bottom-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//             >
//               <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
//             </svg>
//           </IconButton>
//           <IconButton
//             tooltip="add attachment"
//             touch={true}
//             tooltipPosition="bottom-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//             >
//               <path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z" />
//             </svg>
//           </IconButton>
//         </ToolbarGroup>

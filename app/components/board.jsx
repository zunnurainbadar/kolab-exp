import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Scrollbars } from "react-custom-scrollbars";
import Toolbar from "Toolbar";
import Boards from "app/components/Note.jsx";
import Boardbar from "app/components/toolbars/boardtoolbar.jsx";
import Store from "app/store/UIstore.js";
import { observer } from "mobx-react";

const align = {
  textAlign: "center"
};
const style = {
  margin: 12,
  marginRight: 20
};

const heightboard = {
  height: "100%",
  backgroundColor: "white",
  marginBottom: "0%"
};
const panel = {
  border: "none%",
  boxShadow: "none",
  webkitBoxShadow: "none"
};
// let scrolling = {
//   marginBottom: "15%"
// };
@observer
export default class Board extends React.Component {
  constructor() {
    super();
    this.handle = this.handle.bind(this);
  }
  handle() {
    if (Store.full == "fullScreen") {
      Store.full = "";
      // scrolling = {
      //   marginBottom: "0%"
      // };
    } else {
      Store.full = "fullScreen";
      // scrolling = {
      //   marginBottom: "15%"
      // };
    }
  }

  render() {
    if (Store.full != "fullScreen")
      return (
        <div className={Store.full} style={heightboard}>
          <Boardbar />

          <Scrollbars
            style={{ height: "100%" }}
            autoHeightMin={0}
            autoHeightMax={300}
            thumbMinSize={30}
            renderTrackHorizontal={props =>
              <div
                {...props}
                className="track-horizontal"
                style={{ display: "none" }}
              />}
            renderThumbHorizontal={props =>
              <div
                {...props}
                className="thumb-horizontal"
                style={{ display: "none" }}
              />}
            renderView={props => <div {...props} className="view BoardClass" />}
          >
            {/*<h4 style={align}>Noteboard</h4>*/}
            <br />
            <div className="panel" className="">
              <Boards count={10} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </Scrollbars>

          {/*</Infinite>*/}
        </div>
      );
    else
      return (
        <div className={Store.full} style={heightboard}>
          <Boardbar />

          <Scrollbars
            style={{ height: "100%" }}
            autoHeightMin={0}
            autoHeightMax={300}
            thumbMinSize={30}
            renderTrackHorizontal={props =>
              <div
                {...props}
                className="track-horizontal"
                style={{ display: "none" }}
              />}
            renderThumbHorizontal={props =>
              <div
                {...props}
                className="thumb-horizontal"
                style={{ display: "none" }}
              />}
            renderView={props => <div {...props} className="view FullHeight" />}
          >
            {/*<h4 style={align}>Noteboard</h4>*/}
            <br />
            <div className="panel" className="">
              <Boards count={10} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </Scrollbars>

          {/*</Infinite>*/}
        </div>
      );
  }
}

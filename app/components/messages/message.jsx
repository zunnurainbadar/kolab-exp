import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Message extends Component{
    render(){
        const {message} = this.props;
        var formattedTime = this.formatTime(message.timeStamp);
        if (message.user==this.props.setUser)
        {
            return (
            <div className="message">
              <ol className="chat">
    <li className="self">
        <div className="avatar"><img src="http://i.imgur.com/HYcn9xO.png" draggable="false"/></div>
      <div className="msg">
        <p><strong>{message.user}</strong> {message.text}</p>
        <p><time>{formattedTime}</time></p>
      </div>
    </li>
    </ol>
            </div>
        )
    }
    else{
        return (
        <div className="message">
              <ol className="chat">
    <li className="other">
        <div className="avatar"><img src="http://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div className="msg">
        <p><strong>{message.user}</strong> {message.text}</p>
        <p><time>{formattedTime}</time></p>
      </div>
    </li>
    </ol>
    </div>
    )
    }
        
    }
    formatTime(timeStamp){
        var dt = new Date(timeStamp *1000);

        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var seconds = dt.getSeconds();

        if(hours <10){
            hours = '0' +hours;
        }
        if(minutes <10){
            minutes = '0' +hours;
        }
        if(seconds <10){
            seconds = '0' +hours;
        }
        return hours+":"+minutes+":"+seconds;
    }
}

export default Message
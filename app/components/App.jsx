import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessageList from './messages/messageList.jsx'
import MessageForm from './messages/messageForm.jsx'
import UserList from './users/userList.jsx'
import UserForm from './users/userForm.jsx'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            status:'disconnected',
            messages:[{
                timeStamp:Date.now(),
                text:""
            }],
            users:[],
            user:''
        }
    }

    componentWillMount(){
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
        this.socket.on('messageAdded', this.onMessageAdded.bind(this));
        this.socket.on('userJoined',this.onUserJoined.bind(this));
    }
    connect(){
        this.setState({status:'connected'});
        console.log('Connected: '+ this.socket.id);
    }
    disconnect(users){
        this.setState({users:users});
        this.setState({status:'disconnected'});
    }
    onUserJoined(users){
        this.setState({users:users});
    }
    emit(eventName, payyload){
        this.socket.emit(eventName,payyload);
    }
    setUser(user){
        this.setState({user:user});
    }
    onMessageAdded(message){
        this.setState({messages:this.state.messages.concat(message)});
    }
    render(){
        if(this.state.user == ''){
            return (
                <UserForm emit={this.emit.bind(this)} setUser={this.setUser.bind(this)}/>
            )
        }else {
            return (
            <div className="row">
            {/*<div className = "col-md-4">
            <UserList  {...this.state}/>
            </div>*/}
            <div className = "col-md-12">
            <MessageList  {...this.state}/>
            <MessageForm {...this.state} emit={this.emit.bind(this)}/>
            </div>
            </div>
        )
        }
        
    }
}

export default App
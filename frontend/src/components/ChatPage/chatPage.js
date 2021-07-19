import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import "./chatPage.css";
import { useHistory } from "react-router";
import SideBar from "./Sidebar/sidebar";
import Chat from "./ChatBox/chat";
import axios from "axios";

const ChatPage = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState({});

  const getAllChannels = async () => {
    try {
      const allChannels = await axios.get(
        "https://my-whatsapp-mern-clone.herokuapp.com/api/newMessage"
      );
      setChannels(allChannels.data);
      setCurrentChannel(allChannels.data[0]);
    } catch (ex) {
      console.log(ex.message);
    }
  };

  useEffect(() => {
    const newUserMail = JSON.parse(localStorage.getItem("userMail"));
    if (!newUserMail) {
      history.replace("/login");
    }
    getAllChannels();
    const newUserName = JSON.parse(localStorage.getItem("newUser"));
    const newUserImage = localStorage.getItem("userImage");
    setUserName(newUserName);
    setUserImage(newUserImage);
  }, []);

  useEffect(() => {
    const pusher = new Pusher("04d0560caeb2ef056a12", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      const newMessageData = data;
      let newChannel = {};
      newChannel = currentChannel;
      if (newChannel.messageData !== undefined) {
        newChannel.messageData.push(newMessageData);
      }
      changeFieldData(newMessageData, setCurrentChannel);
      setCurrentChannel(newChannel);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [currentChannel]);

  const changeFieldData = (data, setFieldData) => {
    setFieldData(data);
  };

  const getCurrentChannel = (channelDetails) => {
    if (channelDetails) {
      setCurrentChannel(channelDetails);
    }
  };

  return (
    <div className="chatbar">
      <div className="chatbar__body">
        <SideBar
          userName={userName}
          userImage={userImage}
          channels={channels}
          getAllChannels={getAllChannels}
          getCurrentChannel={getCurrentChannel}
        />
        <Chat
          userName={userName}
          currentChannel={currentChannel}
          getCurrentChannel={getCurrentChannel}
          changeFieldData={changeFieldData}
        />
      </div>
    </div>
  );
};

export default ChatPage;

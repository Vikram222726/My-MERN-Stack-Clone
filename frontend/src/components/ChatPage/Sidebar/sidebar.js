import React, { useState, useEffect } from "react";
import "./sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { SearchOutlined } from "@material-ui/icons";
import Sidebarchat from "./SidebarChat/sidebarchat";
import axios from "axios";
import filterChannel from "./filterChannels";

const SideBar = ({
  userName,
  userImage,
  channels,
  getAllChannels,
  getCurrentChannel,
}) => {
  const [createChannel, setCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [dummyChannels, setDummyChannels] = useState([]);
  const [searchedChat, setSearchedChat] = useState("");
  const newImageAddress =
    "https://i.pinimg.com/originals/17/5c/13/175c1355af4adc478512f2ed7d3d677f.png";

  useEffect(() => {
    getAllChannels();
    setDummyChannels(channels);
  }, []);

  useEffect(() => {
    setDummyChannels(channels);
  }, [channels]);

  const addNewChannel = async () => {
    try {
      if (newChannelName.length === 0) {
        setCreateChannel(false);
        return;
      }

      await axios.post(
        "https://my-whatsapp-mern-clone.herokuapp.com/api/newMessage",
        {
          channelName: newChannelName,
          channelIconId: channels.length,
          messageData: [],
        }
      );
      setNewChannelName("");
      setCreateChannel(false);
      getAllChannels();
    } catch (ex) {
      console.log(ex);
    }
  };

  const isChatPresent = (e) => {
    setSearchedChat(e.target.value);
    filterChannel(e.target.value, channels, setDummyChannels);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__avatar">
          <img src={userImage ? userImage : newImageAddress} alt={userName} />
        </div>
        <div className="sidebar__header__icons">
          <div className="sidebar__header__icon">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
          </div>
          <div className="sidebar__header__icon">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search Chat Groups"
            className="sidebar__textbar"
            value={searchedChat}
            onChange={isChatPresent}
          />
        </div>
      </div>

      <div className="sidebar__channel">
        {createChannel === false ? (
          <AddCircleIcon onClick={() => setCreateChannel(true)} />
        ) : (
          <div className="sidebar__channel__info">
            <input
              type="text"
              className="sidebar__channel__text"
              placeholder="Create new Channel"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
            <div className="sidebar__channel__btn" onClick={addNewChannel}>
              Add Channel
            </div>
          </div>
        )}
      </div>
      <div className="sidebar__channels">
        {dummyChannels === undefined
          ? null
          : dummyChannels.map((channel) => (
              <Sidebarchat
                channelName={channel.channelName}
                imageId={channel.channelIconId}
                message={
                  channel.messageData.length > 0
                    ? channel.messageData[channel.messageData.length - 1]
                        .message
                    : "Hey Whats up!"
                }
                key={channel._id}
                channelDetails={channel}
                getCurrentChannel={getCurrentChannel}
              />
            ))}
      </div>
    </div>
  );
};

export default SideBar;

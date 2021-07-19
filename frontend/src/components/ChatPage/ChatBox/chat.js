import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SendIcon from "@material-ui/icons/Send";
import "./chat.css";
import AllImages from "../../ImageContainer/images";
import axios from "axios";
import { useHistory } from "react-router";

const Chat = ({
  userName,
  currentChannel,
  getCurrentChannel,
  changeFieldData,
}) => {
  const history = useHistory();
  const [fieldChannel, setFieldChannel] = useState({});
  const [message, setMessage] = useState("");
  const presentDate = new Date().toUTCString().split(" ")[4].split(":");

  useEffect(() => {
    getCurrentChannel();
    changeFieldData(currentChannel, setFieldChannel);
  }, []);

  useEffect(() => {
    changeFieldData(currentChannel, setFieldChannel);
  }, [currentChannel]);

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      if (message.length === 0) {
        return;
      }
      const currentTime = presentDate[0] + ":" + presentDate[1];
      const result = await axios.post(
        `https://my-whatsapp-mern-clone.herokuapp.com/api/newMessage/${currentChannel._id}`,
        {
          channelName: currentChannel.channelName,
          message: message,
          name: userName,
          timeStamp: currentTime,
          messageType: "text",
        }
      );
      setMessage("");
    } catch (ex) {
      console.log(ex);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userMail");
    localStorage.removeItem("newUser");
    history.replace("/login");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header__avatar">
          <img
            src={
              fieldChannel.channelIconId
                ? AllImages[fieldChannel.channelIconId % AllImages.length][
                    "imgSrc"
                  ]
                : "https://i.pinimg.com/originals/17/5c/13/175c1355af4adc478512f2ed7d3d677f.png"
            }
            alt={fieldChannel ? fieldChannel.channelName : "Chat Room"}
          />
        </div>
        <div className="chat__header__info">
          <h3>{fieldChannel ? fieldChannel.channelName : "Chat Room"}</h3>
          <p className="chat__header__lastseen">
            last seen Fri, 18 Jul 2021 17:24:05{" "}
          </p>
        </div>
        <div className="chat__header__icons">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <ExitToAppIcon onClick={logoutUser} />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {fieldChannel.messageData
          ? fieldChannel.messageData.map((data) => (
              <p
                className={
                  data.name === userName
                    ? "chat__body__desc chat__currentuser"
                    : "chat__body__desc"
                }
              >
                <span className="chat__username">{data.name}</span>
                {data.message}
                <div className="chat__timespan">{data.timeStamp}</div>
              </p>
            ))
          : null}
      </div>

      <div className="chat__footer">
        <IconButton>
          <AttachFile />
        </IconButton>
        <form className="chat__footer__form">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <SendIcon onClick={sendMessage} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;

import React from "react";
import "./sidebarchat.css";
import AllImages from "../../../ImageContainer/images";

const Sidebarchat = ({
  channelName,
  imageId,
  message,
  channelDetails,
  getCurrentChannel,
}) => {
  let newMessage = message.split(" ");
  if (newMessage.length === 1) {
    newMessage = newMessage[0];
  } else if (newMessage.length === 2) {
    newMessage = newMessage[0] + " " + newMessage[1];
  } else {
    newMessage =
      newMessage[0] + " " + newMessage[1] + " " + newMessage[2] + "...";
  }

  return (
    <div
      className="sidebarchat"
      onClick={() => getCurrentChannel(channelDetails)}
    >
      <div className="sidebarchat__avatar">
        <img
          src={AllImages[imageId % AllImages.length]["imgSrc"]}
          alt="UserImage"
        />
      </div>
      <div className="sidebarchat__details">
        <div className="sidebarchat__name">{channelName}</div>
        <div className="sidebarchat__lastMessage">{newMessage}</div>
      </div>
    </div>
  );
};

export default Sidebarchat;

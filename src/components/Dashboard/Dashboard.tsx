import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { members } from "../../constants";
import { ChatMembers } from "../ChatMembers/ChatMembers";
import { Chat } from "../Chat/Chat";
import { UserProfile } from "../UserProfile/UserProfile";

// const wsUrl = "ws://localhost:4000"

export const Dashboard: React.FC = () => {
  return (
    <>
      <div className="home-page__content messages-page">
        <div className="container-fluid h-100">
          <div className="px-0 h-100">
            <ChatMembers />
            <Chat />
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
};

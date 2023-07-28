import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { members } from "../../constants";
import { ChatMembers } from "../index";
import { Chat } from "../index";
import { UserProfile } from "../index";
import { User } from "../../types";

// const wsUrl = "ws://localhost:4000"

export const Dashboard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <div className="home-page__content messages-page">
        <div className="container-fluid h-100">
          <div className="px-0 h-100">
            <ChatMembers
              selectedUser={selectedUser}
              onUserSelect={handleUserSelection}
            />
            <Chat />
            {selectedUser && (
              <UserProfile user={selectedUser} onClose={handleCloseProfile} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

import React from "react";
import { Chat } from "../index";
import "./Dashboard.scss";

export const Dashboard: React.FC = () => {
  return (
    <>
      <div className="home-page__content messages-page">
        <div className="container-fluid h-100">
          <div className="px-0 h-100">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

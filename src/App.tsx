import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { HomePage } from "./components/HomePage";
import { SocketConnection } from "./components/sockets/SocketConnection";

function App() {
  return (
    <>
      <HomePage />;
      <SocketConnection />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { members } from "../../constants";
import { useUserContext } from "../../context/UserContext";
export const ChatMembers = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedUser, setSelectedUser } = useUserContext();

  const handleUserSelection = (user: any) => {
    setSelectedUser(user);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleGlobalTheme = () => {
    toggleDarkMode();
  };

  const filteredMembers = members.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-12 col-md-4 col-lg-5 col-xl-3 px-0 messages-page__list-scroll">
      <div className="messages-page__header mb-0 px-4 pt-3 pb-3">
        <span className="messages-page__title">Chats</span>
        <div
          className="messages-page__dark-mode-toogler"
          onClick={handleGlobalTheme}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon svg-icon--dark-mode"
            viewBox="0 0 49.7 49.7"
          >
            <path
              d="M25.4,49.7A25.6,25.6,0,0,1,1.3,32.3,25.6,25.6,0,0,1,17.3.1a2,2,0,0,1,2.1.5,2.2,2.2,0,0,1,.5,2.1,19.9,19.9,0,0,0-1.2,6.8A21,21,0,0,0,25,24.7,21,21,0,0,0,40.2,31h0a20.9,20.9,0,0,0,6.9-1.2,2,2,0,0,1,2.5,2.5,25.8,25.8,0,0,1-16,16.1A28.7,28.7,0,0,1,25.4,49.7ZM15,5.5A21.4,21.4,0,0,0,5.1,31.1,21.5,21.5,0,0,0,15.9,43.4a21.2,21.2,0,0,0,28.3-8.8,17.5,17.5,0,0,1-4,.4h0a24.9,24.9,0,0,1-18-7.5,24.9,24.9,0,0,1-7.5-18A26.9,26.9,0,0,1,15,5.5Z"
              fill="#f68b3c"
            />
          </svg>
        </div>
      </div>
      <div className="messages-page__search mb-0 px-3 pb-3">
        <div className="custom-form__search-wrapper">
          <input
            type="text"
            className="form-control custom-form"
            id="search"
            placeholder="Search ..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="custom-form__search-submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon svg-icon--search"
              viewBox="0 0 46.6 46.6"
            >
              <path
                d="M46.1,43.2l-9-8.9a20.9,20.9,0,1,0-2.8,2.8l8.9,9a1.9,1.9,0,0,0,1.4.5,2,2,0,0,0,1.5-.5A2.3,2.3,0,0,0,46.1,43.2ZM4,21a17,17,0,1,1,33.9,0A17.1,17.1,0,0,1,33,32.9h-.1A17,17,0,0,1,4,21Z"
                fill="#f68b3c"
              />
            </svg>
          </button>
        </div>
      </div>

      <ul className="messages-page__list pb-5 px-1 px-md-3">
        {filteredMembers.map((user, index) => (
          <li
            className={`messaging-member ${
              selectedUser === user ? "messaging-member--active" : ""
            }`}
            key={index}
            onClick={() => handleUserSelection(user)}
          >
            <div className="messaging-member__wrapper">
              <div className="messaging-member__avatar">
                <img src={user.img} alt="Bessie Cooper" />
                <div className="user-status"></div>
              </div>

              <span className="messaging-member__name">{user.name}</span>
              {/* <span className="messaging-member__message">
                        {user.message}
                      </span> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

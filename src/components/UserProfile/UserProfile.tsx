import { User } from "../../types";

type UserProfileProps = {
  user: User;
  onClose: () => void;
};

export const UserProfile: React.FC<UserProfileProps> = ({ onClose, user }) => {
  const { name, phone, country, status, socialMedia, activities, img } = user;

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__close d-flex d-xl-none" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg-icon"
          viewBox="0 0 38.8 38.9"
        >
          <g>
            <path
              d="M2,38.9a1.9,1.9,0,0,1-1.4-.5,2.1,2.1,0,0,1,0-2.9L35.4.6a1.9,1.9,0,0,1,2.8,0,1.9,1.9,0,0,1,0,2.8L3.4,38.4A1.9,1.9,0,0,1,2,38.9Z"
              fill="#d87232"
            />
            <path
              d="M36.8,38.9a1.9,1.9,0,0,1-1.4-.5L.6,3.4A1.9,1.9,0,0,1,.6.6,1.9,1.9,0,0,1,3.4.6L38.2,35.5a2.1,2.1,0,0,1,0,2.9A1.9,1.9,0,0,1,36.8,38.9Z"
              fill="#d87232"
            />
          </g>
        </svg>
      </div>
      <div className="user-profile__wrapper">
        <div className="user-profile__avatar">
          <img src={img} alt={name} />
        </div>
        <div className="user-profile__details mt-1">
          <span className="user-profile__name">{name}</span>
          <span className="user-profile__phone">{phone}</span>
          <span className="user-profile__location">{country}</span>
        </div>
        <div className="user-profile__description">
          <p>{status}</p>
        </div>
        <div className="user-profile__learning mt-4">
          <span className="user-profile__label">Social Medias</span>
          <ul className="user-profile__tags user-profile__tags--primary mt-2">
            {socialMedia.map((item, i) => (
              <li key={i}>
                <a href={item.link} target="_blank">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="user-profile__hobbies">
          <span className="user-profile__label">Activities</span>
          <ul className="user-profile__tags user-profile__tags--secondary mt-2">
            {activities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

import { FieldAttributes } from "formik";

interface SocialMedia {
  name: string;
  link: string;
}

export interface User {
  name: string;
  img: string;
  message: string;
  country: string;
  phone: string;
  socialMedia: SocialMedia[];
  activities: string[];
  status: string;
}

export interface NewMessage {
  email: string;
  message: string;
  date: string;
}

export interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface FormFieldProps extends FieldAttributes<any> {
  name: string;
  placeholder: string;
  value?: string;
}

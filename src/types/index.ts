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
export interface WebSocketResponse {
  content: string | string[];
  date: string;
  email: string;
  id: string;
  type: "message" | "onlineUsers" | "connection"| 'errorMessage';
  errorMessage?: string;
}

export interface MessageData {
  message_type:  "message" | "onlineUsers" | "connection"| 'errorMessage'
  email: string;
  id: string;
  message_content: string;
  created_at: string
}

export interface FormFieldProps extends FieldAttributes<any> {
  name: string;
  placeholder: string;
  value?: string | null;
}

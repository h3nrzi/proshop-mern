import { Alert } from "react-bootstrap";

interface Props {
  variant?: string;
  children: React.ReactNode;
}

const Message = ({ variant = "info", children }: Props) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;

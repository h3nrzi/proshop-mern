import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export interface FooterButton {
  label: string;
  onCreate?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

interface ReusableModalProps {
  showModal: boolean;
  closeModalHandler?: () => void;
  title: string;
  body: string | JSX.Element;
  footerButtons: FooterButton[];
}

const ReusableModal = ({
  showModal,
  closeModalHandler,
  title,
  body,
  footerButtons,
}: ReusableModalProps) => {
  return (
    <Modal show={showModal} onHide={closeModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {footerButtons.map((button, index) => (
          <Button key={index} variant={button.variant} onClick={button.onCreate}>
            {button.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModal;

import React from "react";
import { Modal, Button } from "antd";

interface DeleteBookModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  visible,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal
      title="Delete Book"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={onDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this book?</p>
    </Modal>
  );
};

export default DeleteBookModal;

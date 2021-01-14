import { FunctionComponent } from 'react'
import ReactModal from 'react-modal'

import './Modal.scss'

interface ModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  isModalOpen,
  handleCloseModal,
}) => (
  <ReactModal
    className="Modal-content"
    overlayClassName="Modal-overlay"
    ariaHideApp={false}
    isOpen={isModalOpen}
    contentLabel="onRequestClose Example"
    onRequestClose={handleCloseModal}
    shouldCloseOnOverlayClick={false}
  >
    {children}
  </ReactModal>
)

export default Modal

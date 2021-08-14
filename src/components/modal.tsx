import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { generateScoreBoard } from './utils';

type ModalProps = {
    isOpen: boolean;
    currentUser: string;
    playAgain: () => void; 
    toWelcomeScreen: () => void;
}

export const ModalComponent = ({isOpen,currentUser,playAgain,toWelcomeScreen}: ModalProps) => {
  
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader >SCOREBOARD</ModalHeader>
        <ModalBody>
          {generateScoreBoard(currentUser)}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={toWelcomeScreen}>To Welcome Screen</Button>
          <Button color="warning" onClick={playAgain}>PLAY!</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

interface ButtonDeletePostProps {
  onClick: () => void;
  isLoading: boolean;
}

export const ButtonDeletePost = ({ isLoading, onClick }: ButtonDeletePostProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button ml="auto" mt={4} colorScheme="red" onClick={onOpen}>
        Excluir Postagem
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader color="gray.900">Excluir Postagem</ModalHeader>
          <ModalBody>
            <Text color="gray.800" fontSize="lg">
              Você tem certeza que quer excluir esta postagem? esta ação é irreversível.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              loadingText="Excluindo"
              isLoading={isLoading}
              onClick={onClick}
            >
              Excluir Postagem
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

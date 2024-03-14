import {useCallback, useState} from 'react';

const useDisclosure = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen(val => !val);
  }, []);

  return {isOpen, onOpen, onClose, onToggle};
};

export default useDisclosure;

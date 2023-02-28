import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { categoriesState } from "../atoms";

const CategoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useRecoilState(categoriesState);
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setNewCategory(e.currentTarget.value);
  };

  const handleClick = () => {
    if (newCategory === "") {
      alert("Please enter a category name");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory("");

    localStorage.setItem(
      "categories",
      JSON.stringify([...categories, newCategory])
    );

    onClose();
  };

  return (
    <>
      <IconButton
        variant={"ghost"}
        onClick={onOpen}
        aria-label="Toggle dark mode"
        icon={<FaPlus />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category name</FormLabel>
              <Input onInput={handleInput} placeholder="Category" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryModal;

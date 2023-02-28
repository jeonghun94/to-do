import {
  Box,
  Divider,
  Grid,
  Heading,
  IconButton,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, categoriesState } from "../atoms";
import { FaMoon, FaSun } from "react-icons/fa";
import CategoryModal from "./CategoryModal";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const textMainColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("#E2E8F0", "E2E8F0");
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);

  const [category, setCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoriesState);
  const toDos = useRecoilValue(toDoSelector);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Box maxW={"480"} m={"auto"} p={"10"}>
      <Grid
        w={"100%"}
        gridTemplateColumns={"1fr 3fr 1fr"}
        placeItems={"center"}
        color={"#3B81F6"}
      >
        <Box>
          <CategoryModal />
        </Box>
        <Heading as={"h1"} textAlign={"center"} py={"3"}>
          To-Do
        </Heading>

        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          color={"#3B81F6"}
          icon={<Icon />}
        />
      </Grid>

      <Divider my={"3"} />

      <Grid w={"100%"} gridTemplateColumns={"repeat(4, 1fr)"} gap={5} py={5}>
        {categories.map((category, index) => (
          <Box
            key={index}
            borderRadius={"32px"}
            fontSize={"sm"}
            color={textMainColor}
            borderWidth={"1px"}
            borderColor={borderColor}
            boxShadow={"sm"}
            p={"1"}
          >
            <Text noOfLines={1} textAlign={"center"}>
              {category}
            </Text>
          </Box>
        ))}
      </Grid>

      <Divider my={"3"} />

      <VStack gap={"3"}>
        <Select value={category} onInput={onInput}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <CreateToDo />
      </VStack>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Box>
  );
};

export default ToDoList;

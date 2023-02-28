import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import {
  Box,
  Divider,
  Grid,
  Heading,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  toDoSelector,
  categoriesState,
} from "../atoms";
import CategoryModal from "./CategoryModal";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("#3B81F6", "blue.200");
  const Icon = useColorModeValue(FaMoon, FaSun);

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Box maxW={"480"} m={"auto"} p={"10"} border={`1px solid ${logoColor}`}>
      <Grid
        w={"100%"}
        gridTemplateColumns={"1fr 3fr 1fr"}
        placeItems={"center"}
        color={logoColor}
      >
        <Box>
          <CategoryModal />
        </Box>
        <Heading as={"h1"} textAlign={"center"} py={"3"}>
          To Dos
        </Heading>

        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
      </Grid>
      <Divider my={"3"} />

      <Grid
        w={"100%"}
        gridTemplateColumns={"repeat(3, 1fr)"}
        gap={10}
        py={5}
        border={"1px solid blue"}
      >
        {categories.map((category, index) => (
          <Box
            // bgColor={"#ebecf0"}
            color={"#555555"}
            borderRadius={"32px"}
            p={"5"}
            key={index}
            boxShadow={"md"}
            // boxShadow={
            //   "-6px -6px 10px rgb(255 255 255 / 60%), 4px 4px 18px #c0c0de, inset -8px -8px 16px rgb(255 255 255 / 10%), inset 8px 8px 18px #e8e8f3"
            // }
          >
            <Text textAlign={"center"}>{category}</Text>
          </Box>
        ))}
      </Grid>

      <br />
      <select value={category} onInput={onInput}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Box>
  );
};

export default ToDoList;

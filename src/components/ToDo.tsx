import {
  Box,
  Button,
  Grid,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const categories = useRecoilValue(categoriesState);
  const textMainColor = useColorModeValue("black", "white");
  const textSubColor = useColorModeValue("black", "#c8c8c8");
  const borderColor = useColorModeValue("#E2E8F0", "E2E8F0");
  return (
    <Box
      borderWidth={"1px"}
      borderColor={borderColor}
      p={"3"}
      my={"3"}
      borderRadius={"md"}
    >
      <VStack placeItems={"flex-start"}>
        <HStack>
          <Text ml={"10px"} color={textMainColor}>
            {text}
          </Text>
        </HStack>
        <Grid w={"100%"} gridTemplateColumns={"repeat(4,1fr)"} gap={3}>
          {categories.map((customCategory, index) => {
            return (
              category !== customCategory && (
                <Button
                  key={index}
                  name={customCategory}
                  onClick={onClick}
                  color={textSubColor}
                  size={"sm"}
                  noOfLines={1}
                >
                  {customCategory}
                </Button>
              )
            );
          })}
        </Grid>
      </VStack>
    </Box>
  );
}

export default ToDo;

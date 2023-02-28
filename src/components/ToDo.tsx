import { Box, Button, HStack, Text } from "@chakra-ui/react";
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
  return (
    <Box>
      <HStack justifyContent={"space-between"} color={"red.200"}>
        <Text>{text}</Text>
        {categories.map((customCategory, index) => {
          return (
            category !== customCategory && (
              <Button key={index} name={customCategory} onClick={onClick}>
                {customCategory}
              </Button>
            )
          );
        })}
        {/* {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}

        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )} */}
      </HStack>
    </Box>
  );
}

export default ToDo;

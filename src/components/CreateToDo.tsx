import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <Box w={"100%"}>
      <form onSubmit={handleSubmit(handleValid)}>
        <InputGroup size="md">
          <Input
            {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a new to do"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" type="submit">
              ADD
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default CreateToDo;

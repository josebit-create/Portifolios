import styles from "./TaskForm.module.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

// interfaces
import { ITask } from "../interfaces/Task";

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  taskToUpdate?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  taskToUpdate,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  const addTaskHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      if (!title || !difficulty) {
        return;
      }

      const id = Math.floor(Math.random() * 10000000);
      const newTask: ITask = {
        id,
        title,
        difficulty,
      };

      if (setTaskList) {
        setTaskList([...taskList, newTask]);
      }

      setTitle("");
      setDifficulty(0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  };

  useEffect(() => {
    if (taskToUpdate) {
      setId(taskToUpdate.id);
      setTitle(taskToUpdate.title);
      setDifficulty(taskToUpdate.difficulty);
    }
  }, [taskToUpdate]);

  return (
    <form onSubmit={addTaskHandle} className={styles.form}>
      <div className={styles.input_container}>
        <label>Título: </label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label>Dificuldade: </label>
        <input
          type="number"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;

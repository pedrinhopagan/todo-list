"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface FormsValue {
  title: string;
}

export default function TodoGenerated() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [formsValue, setFormsValue] = useState<FormsValue>({
    title: "",
  });

  function handleSubmit() {
    const newTask = formsValue.title;
    if (newTask) {
      setTodoList((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: newTask,
          completed: false,
        },
      ]);
    }
    setFormsValue((prev) => ({
      ...prev,
      title: "",
    }));
  }

  function handleCheckboxChange(id: number) {
    setTodoList((prev) => [
      ...prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    ]);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormsValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  function handleDelete(id: number) {
    setTodoList((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center text-white">
      {/* Header */}
      <header className="flex flex-col items-center justify-between w-full max-w-3xl p-4">
        <Image src={images.logo} alt="logo" width={200} height={200} />
      </header>

      {/* Main */}
      <main className="w-full max-w-3xl p-4">
        {/* Adicionar nova tarefa */}

        <form action={handleSubmit} className="flex justify-between w-full">
          <div className="flex-1">
            <label className="sr-only" htmlFor="new-task">
              Adicione uma nova tarefa
            </label>
            <Input
              className="w-full bg-[#262626]"
              id="new-task"
              placeholder="Adicione uma nova tarefa"
              onChange={(e) => handleChange(e)}
              value={formsValue.title}
            />
          </div>
          <Button type="submit" className="ml-4 bg-[#1E6F9F] text-white">
            Criar
            <PlusIcon className="ml-2" />
          </Button>
        </form>

        {/* Header da lista de tarefas */}
        <div className="flex justify-between items-center mt-8 mb-4">
          <div className="flex gap-2">
            <h2 className="text-sm font-bold text-[#4EA8DE]">
              Tarefas criadas
            </h2>
            <Badge variant="secondary">{todoList.length}</Badge>
          </div>
          <div className="flex gap-2">
            <h2 className="text-sm font-bold">Concluídas</h2>
            <Badge variant="secondary">
              {todoList.filter((task) => task.completed).length} de{" "}
              {todoList.length}
            </Badge>
          </div>
        </div>

        {/* Lista de tarefas */}
        <ScrollArea className="w-full">
          <ul className="flex flex-col gap-2">
            {todoList.map((task) => (
              <li
                key={task.id}
                className={`flex items-center py-4 rounded-lg bg-[#262626] px-6 ${
                  task.completed ? "" : ""
                }}`}
              >
                <Checkbox
                  className="bg-transparent rounded-full border border-[#4EA8DE] data-[state=checked]:bg-[#4EA8DE] data-[state=checked]:border-transparent"
                  id={`task-${task.id}`}
                  onCheckedChange={(e) => handleCheckboxChange(task.id)}
                />
                <p
                  className={`flex-1 ml-4 ${
                    task.completed ? "text-[#808080]" : ""
                  }`}
                >
                  {task.title}
                </p>
                <Trash2
                  className="ml-4 cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </main>
    </div>
  );
}

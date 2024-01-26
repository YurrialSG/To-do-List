"use client";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "../components/InputGroup";
import { listSchema } from "../schemas/list.schema";
import Input from "../components/Input";
import inputIsValid from "@/utils/inputIsValid";
import { Container } from "../components/Container";
import Image from "next/image";
import { db } from "../firebase";

import AddIcon from "/public/add.svg";
import EditIcon from "/public/edit.svg";
import RemoveIcon from "/public/remove.svg";
import { useEffect, useState } from "react";

type Inputs = {
  name: string;
};

type Items = Array<{
  id: string;
  name?: string;
}>;

export default function Home() {
  const [data, setData] = useState<Items>([]);
  const [edit, setEdit] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    reset,
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(listSchema),
  });

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "items"));
      const querySnapshot = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(querySnapshot);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [edit, setData]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (edit) {
        await updateDoc(doc(db, "items", edit), data);
      } else {
        await addDoc(collection(db, "items"), data);
      }

      fetchData();
      reset();
      setEdit("");
    } catch (error: any) {
      console.error("FirebaseError:", error.code, "-", error.message);
    }
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
    fetchData();
  };

  const updateItem = async (data: { id: string; name?: string }) => {
    setEdit(data.id);
    setValue("name", data?.name || "");
  };

  return (
    <main>
      <Container>
        <div className="w-full max-w-[500px] justify-start items-start">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <InputGroup className="w-full mt-4" label="Task: *" id="name">
                <Input
                  isValid={inputIsValid(errors.name, touchedFields.name)}
                  {...register("name")}
                  type="text"
                />
              </InputGroup>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex rounded border min-w-10 sm:min-w-16 justify-center items-center px-1 sm:px-2 h-[39px] sm:h-[35px] text-base uppercase transition-colors"
                >
                  <Image
                    src={AddIcon}
                    alt="Add Icon"
                    className="flex w-[24px]"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
        {data?.length > 0 && (
          <ul className="flex flex-col gap-3 mt-10 bg-gray-100 rounded-xl p-3 max-h-[60vh] overflow-auto">
            {data?.map((item, key) => (
              <div
                key={key}
                className="flex bg-white rounded p-3 justify-between items-center"
              >
                <li className="text-sm sm:text-base italic">{item.name}</li>
                <div className="flex gap-1">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex justify-center items-center bg-gray-200 rounded w-[34px] h-[34px]"
                  >
                    <Image
                      src={RemoveIcon}
                      alt="Remove Icon"
                      className="w-[14px]"
                    />
                  </button>
                  <button
                    onClick={() => updateItem(item)}
                    className="flex justify-center items-center bg-gray-200 rounded w-[34px] h-[34px]"
                  >
                    <Image
                      src={EditIcon}
                      alt="Edit Icon"
                      className="w-[14px]"
                    />
                  </button>
                </div>
              </div>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}

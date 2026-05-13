"use client";

import { useState } from "react";

import { Todo } from "./types";
import { TodoForm, TodoValues } from "../_components/todo-form";
import TodoTableClient from "./_component/todo-table-client";
import { useCreateTodo } from "@/hooks/use-todo";
import SlideOverLayout from "@/app/(dashboard)/_layouts/slide-over-layout";

export default function DanhMucCoSoPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<Todo | null>(null);
    const {
        mutateAsync: createTodo,
        status
    } = useCreateTodo();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };

    const openEdit = (row: Todo) => {
        setEditTarget(row);
        setShowSlide(true);
    };

    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = (values: TodoValues) => {
        if (editTarget) {
            console.log("UPDATE", { area_id: editTarget.id, ...values });
        } else {
            createTodo({
                title: values.title,
                body: values.body,
                id: "",
                userId: "1"
            });
        }
        closeSlide();
    };

    const formInitialData: TodoValues | null = editTarget
        ? {
              title: editTarget.title,
              body: editTarget.body,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <TodoTableClient 
                openEdit={openEdit} 
                openCreate={openCreate}
            />
            <SlideOverLayout 
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={editTarget ? "Cập nhật bài đăng" : "Thêm bài đăng"}
            >
                <TodoForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}

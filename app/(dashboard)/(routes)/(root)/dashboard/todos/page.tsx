"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { SlideOver } from "@/components/wojtek-ui/slide-over";

import { Todo } from "./types";
import { TodoForm, TodoValues } from "../_components/todo-form";
import TodoTableClient from "./_component/todo-table-client";


export default function DanhMucCoSoPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<Todo | null>(null);

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
            console.log("CREATE", { area_id: crypto.randomUUID(), ...values });
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

            <SlideOver
                open={showSlide}
                onClose={closeSlide}
                side="right"
                width="780px"
            >
                <SlideOver.Header>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2445]">
                        <Building2 size={15} className="text-white" />
                    </div>
                    <SlideOver.Title>
                        {editTarget ? "Chỉnh sửa công việc" : "Tạo công việc"}
                    </SlideOver.Title>
                </SlideOver.Header>

                <SlideOver.Body>
                    <TodoForm
                        initialData={formInitialData}
                        onSubmit={handleSubmit}
                    />
                </SlideOver.Body>
            </SlideOver>
        </div>
    );
}

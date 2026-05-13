"use client";

import { useState } from "react";
import { Building2, Edit2, Trash2 } from "lucide-react";
import { SlideOver } from "@/components/wojtek-ui/slide-over";

import { InquiryClassificationForm } from "../_components/inquiry-classification-form";

import type { Area } from "./types";
import { MOCK, STATUS_OPTIONS } from "./constants";
import { ColumnDef, DataTable, RowAction } from "../_components/data-table";

type InquiryClassificationValues = {
  inquiry_classification_name: string;
  inquiry_classification_name_e: string;
  inquiry_classification_type: string;
  description: string;
  active_flag: string;
};

const columns: ColumnDef<Area>[] = [
  {
    key: "short_code",
    header: "Mã",
    render: (row) => (
      <span className="whitespace-nowrap rounded-md bg-[#eef2ff] px-2 py-0.5 font-mono text-xs font-semibold text-[#3b5bdb]">
        {row.short_code}
      </span>
    ),
  },
  { key: "area_name", header: "Tên khu vực" },
  { key: "area_name_e", header: "Tên (EN)" },
  { key: "area_name_l", header: "Tên (L)" },
  { key: "area_type_rcd", header: "Loại" },
  {
    key: "active_flag",
    header: "Trạng thái",
    render: (row) => (
      <span
        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${
          row.active_flag === "1"
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-500"
        }`}
      >
        {row.active_flag === "1" ? "Hoạt động" : "Dừng"}
      </span>
    ),
  },
];

export default function DanhMucCoSoPage() {
  const [showSlide, setShowSlide] = useState(false);
  const [editTarget, setEditTarget] = useState<Area | null>(null);

  const openCreate = () => {
    setEditTarget(null);
    setShowSlide(true);
  };

  const openEdit = (row: Area) => {
    setEditTarget(row);
    setShowSlide(true);
  };

  const closeSlide = () => {
    setShowSlide(false);
    setEditTarget(null);
  };

  const handleSubmit = (values: InquiryClassificationValues) => {
    if (editTarget) {
      console.log("UPDATE", { area_id: editTarget.area_id, ...values });
    } else {
      console.log("CREATE", { area_id: crypto.randomUUID(), ...values });
    }
    closeSlide();
  };

  const actions = (row: Area): RowAction<Area>[] => [
    {
      icon: <Edit2 size={13} />,
      label: "Chỉnh sửa",
      onClick: openEdit,
    },
    {
      icon: <Trash2 size={13} />,
      label: "Xóa",
      danger: true,
      onClick: (r) => console.log("DELETE", r.area_id),
    },
  ];

  const formInitialData: InquiryClassificationValues | null = editTarget
    ? {
        inquiry_classification_name: editTarget.area_name,
        inquiry_classification_name_e: editTarget.area_name_e,
        inquiry_classification_type: editTarget.area_type_rcd,
        description: "",
        active_flag: editTarget.active_flag ?? "",
      }
    : null;

  return (
    <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
      <DataTable
        data={MOCK}
        columns={columns}
        rowKey={(row) => row.area_id ?? ""}
        actions={actions}
        pageSize={10}
        emptyText="Không tìm thấy cơ sở nào phù hợp."
        summary={(count) => <span>{count} cơ sở</span>}
        toolbar={{
          searchPlaceholder: "Tên cơ sở, mã cơ sở...",
          searchKeys: ["area_name", "short_code"],
          filters: [
            {
              key: "active_flag",
              label: "Trạng thái",
              options: STATUS_OPTIONS,
            },
          ],
          onAdd: openCreate,
          addLabel: "Thêm mới",
        }}
      />

      <SlideOver
        open={showSlide}
        onClose={closeSlide}
        side="right"
        width="780px"
      >
        <SlideOver.Header>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2445]">
            <Building2 size={15} className="text-[#f5a623]" />
          </div>
          <SlideOver.Title>
            {editTarget ? "Chỉnh sửa khu vực" : "Thêm khu vực"}
          </SlideOver.Title>
        </SlideOver.Header>

        <SlideOver.Body>
          <InquiryClassificationForm
            initialData={formInitialData}
            onSubmit={handleSubmit}
          />
        </SlideOver.Body>
      </SlideOver>
    </div>
  );
}

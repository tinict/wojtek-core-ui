"use client";

import { useState } from "react";

import { DataPanel } from "@/components/wojtek-ui/data-panel";
import { SlideOver } from "@/components/wojtek-ui/slide-over";

import {
  Building2,
  Edit2,
  Trash2,
} from "lucide-react";

import { AreaForm } from "../_components/unit-form";

import type {
  Area,
  FacilityStatus,
  FacilityType,
} from "./types";

import {
  MOCK,
  PAGE_SIZE,
  STATUS_OPTIONS,
  COLUMNS,
} from "./constants";
import { InquiryClassificationForm } from "../_components/inquiry-classification-form";
import { InquiryTopicForm } from "../_components/inquiry-topic-form";

export default function DanhMucCoSoPage() {
  const [search, setSearch] =
    useState<string>("");

  const [type, setType] =
    useState<FacilityType | "">("");

  const [status, setStatus] =
    useState<FacilityStatus | "">("");

  const [page, setPage] = useState(1);

  const [showSlide, setShowSlide] =
    useState(false);

  const [editTarget, setEditTarget] =
    useState<Area | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Area | null>(null);

  const filtered = MOCK.filter(
    (f: Area) => {
      const q = search
        .trim()
        .toLowerCase();

      return (
        (!q ||
          f.area_name
            .toLowerCase()
            .includes(q) ||
          f.short_code
            .toLowerCase()
            .includes(q))
      );
    }
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filtered.length / PAGE_SIZE
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const rows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleClear = () => {
    setSearch("");
    setType("");
    setStatus("");
    setPage(1);
  };

  const openCreate = () => {
    setEditTarget(null);
    setShowSlide(true);
  };

  const openEdit = (
    facility: Area
  ) => {
    setEditTarget(facility);
    setShowSlide(true);
  };

  const closeSlide = () => {
    setShowSlide(false);
    setEditTarget(null);
  };

  const handleSubmit = (
    values: Omit<Area, "area_id">
  ) => {
    if (editTarget) {
      const updatedFacility: Area =
        {
          area_id: editTarget.area_id,
          ...values,
        };

      console.log(
        "UPDATE",
        updatedFacility
      );
    } else {
      const newFacility: Area = {
        area_id: crypto.randomUUID(),
        ...values,
      };

      console.log(
        "CREATE",
        newFacility
      );
    }

    closeSlide();
  };

  return (
    <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
      <DataPanel size="sm">
        <DataPanel.Control
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
          }}
        >
          <DataPanel.Control.Row className="flex-wrap items-end gap-3">
            <DataPanel.Control.SearchField
              label="Tìm kiếm"
              placeholder="Tên cơ sở, mã cơ sở..."
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              className="min-w-[160px] flex-1"
            />

            <DataPanel.Control.Select
              label="Trạng thái"
              options={STATUS_OPTIONS}
              selectedKey={status}
              onSelectionChange={(
                value
              ) => {
                setStatus(
                  value as
                    | FacilityStatus
                    | ""
                );

                setPage(1);
              }}
              className="min-w-[140px] flex-1"
              placeholder="Tất cả trạng thái"
            />
          </DataPanel.Control.Row>

          <DataPanel.Control.Row>
            <DataPanel.Control.Actions className="w-full sm:w-auto">
              <DataPanel.Control.Button
                type="submit"
                variant="primary"
                className="h-9 flex-1 px-5 text-sm font-semibold sm:flex-none"
              >
                Tìm kiếm
              </DataPanel.Control.Button>

              <DataPanel.Control.Button
                type="button"
                variant="secondary"
                onPress={handleClear}
                className="h-9 flex-1 px-4 text-sm sm:flex-none"
              >
                Xóa bộ lọc
              </DataPanel.Control.Button>

              <DataPanel.Control.Button
                type="button"
                variant="secondary"
                onPress={openCreate}
                className="h-9 flex-1 px-4 text-sm sm:flex-none"
              >
                Thêm mới
              </DataPanel.Control.Button>
            </DataPanel.Control.Actions>
          </DataPanel.Control.Row>
        </DataPanel.Control>

        <div className="overflow-x-auto">
          <DataPanel.Table columns={COLUMNS}>
            <DataPanel.Table.Body
              rowCount={rows.length}
              emptyText="Không tìm thấy cơ sở nào phù hợp."
            >
              {rows.map(
                (facility: Area) => (
                  <DataPanel.Table.Row
                    key={facility.area_id}
                  >
                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap rounded-md bg-[#eef2ff] px-2 py-0.5 font-mono text-xs font-semibold text-[#3b5bdb]">
                        {facility.short_code}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.area_name}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.area_name_e}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.area_name_l}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.area_type_rcd}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.area_type_rcd}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.active_flag}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            openEdit(
                              facility
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6e80a8] transition hover:bg-[#eef2ff] hover:text-[#3b5bdb]"
                        >
                          <Edit2
                            size={13}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget(
                              facility
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6e80a8] transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2
                            size={13}
                          />
                        </button>
                      </div>
                    </DataPanel.Table.Cell>
                  </DataPanel.Table.Row>
                )
              )}
            </DataPanel.Table.Body>

            <DataPanel.Table.Footer
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setPage}
            >
              <span>
                {filtered.length} cơ sở
              </span>
            </DataPanel.Table.Footer>
          </DataPanel.Table>
        </div>
      </DataPanel>

      <SlideOver
        open={showSlide}
        onClose={closeSlide}
        side="right"
        width="780px"
      >
        <SlideOver.Header>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2445]">
            <Building2
              size={15}
              className="text-[#f5a623]"
            />
          </div>

          <SlideOver.Title>
            {editTarget
              ? "Chỉnh sửa khu vực"
              : "Thêm khu vực"}
          </SlideOver.Title>
        </SlideOver.Header>

        <SlideOver.Body>
          <InquiryTopicForm 
            onSubmit={function (v: { inquiry_topic_name: string; inquiry_topic_name_e: string; inquiry_topic_department_id: string; description: string; active_flag: string; }): void {
              throw new Error("Function not implemented.");
            }}
          />
        </SlideOver.Body>
      </SlideOver>
    </div>
  );
}
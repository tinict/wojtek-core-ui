"use client";

import { useState } from "react";

import { DataPanel } from "@/components/wojtek-ui/data-panel";
import { SlideOver } from "@/components/wojtek-ui/slide-over";

import {
  Building2,
  Edit2,
  Trash2,
} from "lucide-react";

import { UnitForm } from "../_components/unit-form";

import type {
  Facility,
  FacilityStatus,
  FacilityType,
} from "./types";

import {
  MOCK,
  PAGE_SIZE,
  TYPE_OPTIONS,
  STATUS_OPTIONS,
  COLUMNS,
  TYPE_STYLE,
  STATUS_STYLE,
  EMPTY_FORM,
  PARENT_UNIT_OPTIONS,
} from "./constants";

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
    useState<Facility | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Facility | null>(null);

  const filtered = MOCK.filter(
    (f: Facility) => {
      const q = search
        .trim()
        .toLowerCase();

      return (
        (!q ||
          f.name
            .toLowerCase()
            .includes(q) ||
          f.code
            .toLowerCase()
            .includes(q)) &&
        (!type || f.type === type) &&
        (!status ||
          f.status === status)
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
    facility: Facility
  ) => {
    setEditTarget(facility);
    setShowSlide(true);
  };

  const closeSlide = () => {
    setShowSlide(false);
    setEditTarget(null);
  };

  const handleSubmit = (
    values: Omit<Facility, "id">
  ) => {
    if (editTarget) {
      const updatedFacility: Facility =
        {
          id: editTarget.id,
          ...values,
        };

      console.log(
        "UPDATE",
        updatedFacility
      );
    } else {
      const newFacility: Facility = {
        id: crypto.randomUUID(),
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
              label="Loại cơ sở"
              options={TYPE_OPTIONS}
              selectedKey={type}
              onSelectionChange={(
                value
              ) => {
                setType(
                  value as FacilityType | ""
                );

                setPage(1);
              }}
              className="min-w-[140px] flex-1"
              placeholder="Tất cả loại"
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
                (facility: Facility) => (
                  <DataPanel.Table.Row
                    key={facility.id}
                  >
                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap rounded-md bg-[#eef2ff] px-2 py-0.5 font-mono text-xs font-semibold text-[#3b5bdb]">
                        {facility.code}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <div className="flex min-w-[160px] flex-col">
                        <span className="font-medium text-[#1a2445]">
                          {facility.name}
                        </span>

                        <span className="mt-0.5 flex items-center gap-1 text-xs text-[#9aa3b8]">

                          {
                            facility.district
                          }
                          ,{" "}
                          {
                            facility.province
                          }
                        </span>
                      </div>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span
                        className={`inline-flex items-center whitespace-nowrap rounded-lg px-2 py-0.5 text-xs font-medium ${TYPE_STYLE[facility.type]}`}
                      >
                        {facility.type}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {
                          facility.province
                        }
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span className="whitespace-nowrap text-[#4a5568]">
                        {facility.phone}
                      </span>
                    </DataPanel.Table.Cell>

                    <DataPanel.Table.Cell>
                      <span
                        className={`inline-flex items-center whitespace-nowrap rounded-lg px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[facility.status]}`}
                      >
                        {
                          facility.status
                        }
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
              ? "Chỉnh sửa đơn vị"
              : "Thêm đơn vị mới"}
          </SlideOver.Title>
        </SlideOver.Header>

        <SlideOver.Body>
          <UnitForm
            initialData={
              editTarget
                ? {
                    code:
                      editTarget.code,
                    name:
                      editTarget.name,
                    type:
                      editTarget.type,
                    parentUnit:
                      editTarget.parentUnit ??
                      "",
                    province:
                      editTarget.province,
                    district:
                      editTarget.district,
                    address:
                      editTarget.address,
                    phone:
                      editTarget.phone,
                    status:
                      editTarget.status,
                    createdAt:
                      editTarget.createdAt,
                  }
                : EMPTY_FORM
            }
            parentUnitOptions={
              PARENT_UNIT_OPTIONS
            }
            onSubmit={handleSubmit}
          />
        </SlideOver.Body>
      </SlideOver>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
              <Trash2
                size={22}
                className="text-red-500"
              />
            </div>

            <div className="text-center">
              <p className="text-[15px] font-bold text-[#1a2445]">
                Xác nhận xóa
              </p>

              <p className="mt-1 text-sm text-[#9aa3b8]">
                Bạn có chắc muốn
                xóa cơ sở{" "}
                <span className="font-semibold text-[#1a2445]">
                  {
                    deleteTarget.name
                  }
                </span>
                ?
              </p>
            </div>

            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
                className="h-9 flex-1 rounded-xl border border-[#e8eaf0] bg-white text-sm text-[#050912]"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
                className="h-9 flex-1 rounded-xl bg-red-500 text-sm font-semibold text-white"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { Area, FacilityStatus } from "./types";

export const EMPTY_FORM: Omit<
    Area,
    "area_id"
> = {
    active_flag: "",
    area_name: "",
    area_name_e: "",
    area_name_l: "",
    area_type_rcd: "",
    created_by_user_id: "",
    created_date_time: "",
    key_struct: "",
    parent_area_id: "",
    path_name: "",
    lu_updated: "",
    lu_user_id: "",
    short_code: "",
};

export const STATUS_OPTIONS = [
    { value: "0", label: "Hoạt động" },
    { value: "1", label: "Tạm dừng" }
];

export const STATUS_STYLE: Record<
    FacilityStatus,
    string
> = {
    "0":
        "bg-emerald-50 text-emerald-600 border border-emerald-200",

    "1":
        "bg-amber-50 text-amber-600 border border-amber-200",
};

export const PAGE_SIZE = 5;

export const COLUMNS = [
    { key: "code", label: "Mã đơn vị" },
    { key: "name", label: "Tên đơn vị" },
    { key: "type", label: "Loại" },
    { key: "province", label: "Tỉnh / TP" },
    { key: "phone", label: "Điện thoại" },
    { key: "status", label: "Trạng thái" },
    { key: "actions", label: "" },
];

export const MOCK: Area[] = [];
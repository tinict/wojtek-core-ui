import { Facility, FacilityStatus, FacilityType } from "./types";

export const EMPTY_FORM: Omit<
    Facility,
    "id"
> = {
    code: "",
    name: "",
    type: "Bệnh viện",
    parentUnit: "",
    province: "",
    district: "",
    address: "",
    phone: "",
    status: "Hoạt động",
    createdAt: "",
};

export const TYPE_OPTIONS = [
    { value: "Bệnh viện", label: "Bệnh viện" },
    { value: "Phòng khám", label: "Phòng khám" },
    {
        value: "Trung tâm y tế",
        label: "Trung tâm y tế",
    },
    { value: "Nhà thuốc", label: "Nhà thuốc" },
];

export const STATUS_OPTIONS = [
    { value: "Hoạt động", label: "Hoạt động" },
    { value: "Tạm dừng", label: "Tạm dừng" },
    { value: "Đóng cửa", label: "Đóng cửa" },
];

export const STATUS_STYLE: Record<
    FacilityStatus,
    string
> = {
    "Hoạt động":
        "bg-emerald-50 text-emerald-600 border border-emerald-200",

    "Tạm dừng":
        "bg-amber-50 text-amber-600 border border-amber-200",

    "Đóng cửa":
        "bg-red-50 text-red-500 border border-red-200",
};

export const TYPE_STYLE: Record<
    FacilityType,
    string
> = {
    "Bệnh viện":
        "bg-blue-50 text-blue-600 border border-blue-200",

    "Phòng khám":
        "bg-purple-50 text-purple-600 border border-purple-200",

    "Trung tâm y tế":
        "bg-cyan-50 text-cyan-600 border border-cyan-200",

    "Nhà thuốc":
        "bg-orange-50 text-orange-600 border border-orange-200",
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

export const MOCK: Facility[] = [
    {
        id: "1",
        code: "BV-001",
        name: "Bệnh viện Đa khoa Trung ương",
        type: "Bệnh viện",
        parentUnit: "",
        province: "Hà Nội",
        district: "Đống Đa",
        address: "43 Tràng Thi",
        phone: "024 3826 3115",
        status: "Hoạt động",
        createdAt: "2024-01-10",
    },
];

export const PARENT_UNIT_OPTIONS =
    MOCK.filter(
        (f) =>
            f.type === "Bệnh viện" ||
            f.type === "Trung tâm y tế"
    ).map((f) => ({
        value: f.code,
        label: `${f.code} – ${f.name}`,
    }));
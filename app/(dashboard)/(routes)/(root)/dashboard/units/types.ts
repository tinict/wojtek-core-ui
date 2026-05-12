export const FACILITY_STATUS = [
  "Hoạt động",
  "Tạm dừng",
  "Đóng cửa",
] as const;

export type FacilityStatus =
  (typeof FACILITY_STATUS)[number];

export const FACILITY_TYPES = [
  "Bệnh viện",
  "Phòng khám",
  "Trung tâm y tế",
  "Nhà thuốc",
] as const;

export type FacilityType =
  (typeof FACILITY_TYPES)[number];

export interface Facility {
  id: string;

  code: string;

  name: string;

  type: FacilityType;

  parentUnit?: string;

  province: string;

  district: string;

  address: string;

  phone: string;

  status: FacilityStatus;

  createdAt: string;
}

export type FacilityPayload =
  Omit<Facility, "id">;
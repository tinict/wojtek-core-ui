export const FACILITY_STATUS = [
  "0",
  "1",
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

export interface Area {
  area_id?: string;
  active_flag?: string;
  area_name: string;
  area_name_e: string;
  area_name_l: string;
  area_type_rcd: string;
  created_by_user_id?: string;
  created_date_time?: string;
  key_struct?: string;
  parent_area_id: string;
  path_name?: string;
  lu_updated?: string;
  lu_user_id?: string;
  short_code: string;
}

export type FacilityPayload =
  Omit<Area, "area_id">;
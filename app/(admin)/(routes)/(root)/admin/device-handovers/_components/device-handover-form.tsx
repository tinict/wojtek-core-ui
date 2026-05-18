import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";
import { useGetDevices } from "@/hooks/use-device";
import { useGetUnits } from "@/hooks/use-unit";

const DeviceHandoverSchema = z.object({
    deviceId: z.string().min(1, "Vui lòng chọn thiết bị"),
    areaName: z.string().max(255).optional(),
    areaPathId: z.string().optional(),
    areaLocation: z.string().max(255).optional(),
    unitReceiverId: z.string().optional(),
    unitRepairId: z.string().optional(),
    handoverByUnitId: z.string().optional(),
    handoverReceiverByUnitId: z.string().optional(),
    transferCount: z.number().optional(),
    quantity: z.number().optional(),
    dateOfHandover: z.string().min(1, "Vui lòng chọn ngày bàn giao"),
    dateOfRetrieval: z.string().optional(),
    statusAtHandover: z.string().optional(),
    statusAtRetrieval: z.string().optional(),
    note: z.string().optional(),
    purpose: z.string().optional(),
});

export type DeviceHandoverValues = z.infer<typeof DeviceHandoverSchema>;

const EMPTY: DeviceHandoverValues = {
    deviceId: "",
    areaName: "",
    areaPathId: "",
    areaLocation: "",
    unitReceiverId: "",
    unitRepairId: "",
    handoverByUnitId: "",
    handoverReceiverByUnitId: "",
    transferCount: undefined,
    quantity: undefined,
    dateOfHandover: "",
    dateOfRetrieval: "",
    statusAtHandover: "",
    statusAtRetrieval: "",
    note: "",
    purpose: "",
};

export function DeviceHandoverForm({
    initialData,
    onSubmit,
}: {
    initialData?: DeviceHandoverValues | null;
    onSubmit: (v: DeviceHandoverValues) => void;
}) {
    const { data: deviceData } = useGetDevices({ activeFlag: 1, size: 999 });
    const { data: unitData } = useGetUnits({ activeFlag: 1, size: 999 });

    const deviceOptions =
        deviceData?.isError === false
            ? deviceData.data.content.map((d) => ({
                  value: d.deviceId,
                  label: `${d.deviceCode} - ${d.deviceName}`,
              }))
            : [];

    const unitOptions =
        unitData?.isError === false
            ? unitData.data.content.map((u) => ({
                  value: u.id,
                  label: `${u.unitCode} - ${u.unitName}`,
              }))
            : [];

    const fields: FieldConfig<DeviceHandoverValues>[] = [
        {
            name: "deviceId",
            type: "select",
            label: "Thiết bị",
            placeholder: "Chọn thiết bị",
            options: deviceOptions,
            required: true,
            fullWidth: true,
        },
        {
            name: "dateOfHandover",
            type: "date",
            label: "Ngày bàn giao",
            placeholder: "Chọn ngày bàn giao",
            required: true,
            fullWidth: false,
        },
        {
            name: "dateOfRetrieval",
            type: "date",
            label: "Ngày thu hồi",
            placeholder: "Chọn ngày thu hồi",
            fullWidth: false,
        },
        {
            name: "quantity",
            type: "input",
            inputType: "number",
            label: "Số lượng",
            placeholder: "Nhập số lượng",
            fullWidth: false,
        },
        {
            name: "transferCount",
            type: "input",
            inputType: "number",
            label: "Số lần bàn giao",
            placeholder: "Nhập số lần bàn giao",
            fullWidth: false,
        },
        {
            name: "unitReceiverId",
            type: "select",
            label: "Đơn vị nhận",
            placeholder: "Chọn đơn vị nhận",
            options: unitOptions,
            fullWidth: false,
        },
        {
            name: "unitRepairId",
            type: "select",
            label: "Đơn vị sửa chữa",
            placeholder: "Chọn đơn vị sửa chữa",
            options: unitOptions,
            fullWidth: false,
        },
        {
            name: "handoverByUnitId",
            type: "select",
            label: "Đơn vị bàn giao",
            placeholder: "Chọn đơn vị bàn giao",
            options: unitOptions,
            fullWidth: false,
        },
        {
            name: "handoverReceiverByUnitId",
            type: "select",
            label: "Đơn vị tiếp nhận",
            placeholder: "Chọn đơn vị tiếp nhận",
            options: unitOptions,
            fullWidth: false,
        },
        {
            name: "areaName",
            type: "input",
            label: "Tên khu vực",
            placeholder: "Nhập tên khu vực",
            fullWidth: false,
        },
        {
            name: "areaLocation",
            type: "input",
            label: "Vị trí khu vực",
            placeholder: "Nhập vị trí khu vực",
            fullWidth: false,
        },
        {
            name: "statusAtHandover",
            type: "input",
            label: "Tình trạng khi bàn giao",
            placeholder: "Nhập tình trạng khi bàn giao",
            fullWidth: false,
        },
        {
            name: "statusAtRetrieval",
            type: "input",
            label: "Tình trạng khi thu hồi",
            placeholder: "Nhập tình trạng khi thu hồi",
            fullWidth: false,
        },
        {
            name: "purpose",
            type: "textarea",
            label: "Mục đích",
            placeholder: "Nhập mục đích bàn giao",
            fullWidth: true,
        },
        {
            name: "note",
            type: "textarea",
            label: "Ghi chú",
            placeholder: "Nhập ghi chú",
            fullWidth: true,
        },
    ];

    return (
        <DynamicForm
            schema={DeviceHandoverSchema}
            fields={fields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}

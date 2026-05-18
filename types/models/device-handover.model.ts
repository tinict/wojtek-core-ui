export interface IDeviceHandover {
    handoverId: string;

    deviceId: string;
    deviceName: string;

    areaName: string;
    areaPathId: string;
    areaLocation: string;

    unitReceiverId: string;
    unitReceiverName: string;

    unitRepairId: string;
    unitRepairName: string;

    handoverByUnitId: string;
    handoverByUnitName: string;

    handoverReceiverByUnitId: string;
    handoverReceiverByUnitName: string;

    transferCount: number;
    quantity: number;

    dateOfHandover: string;
    dateOfRetrieval: string;

    statusAtHandover: string;
    statusAtRetrieval: string;

    note: string;
    purpose: string;

    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
};

export interface IDeviceHandoverRequest {
    deviceId: string;

    areaName?: string;
    areaPathId?: string;
    areaLocation?: string;

    unitReceiverId?: string;
    unitRepairId?: string;
    handoverByUnitId?: string;
    handoverReceiverByUnitId?: string;

    transferCount?: number;
    quantity?: number;

    dateOfHandover: string;
    dateOfRetrieval?: string;

    statusAtHandover?: string;
    statusAtRetrieval?: string;

    note?: string;
    purpose?: string;
};
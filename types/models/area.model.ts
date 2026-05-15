export interface IAreaChildren {
    areaId: string;
    areaName: string;
    areaTypeRcd: string;
}

export interface IAreaTree extends IAreaChildren {
    children: IAreaChildren[];
}

export interface IArea {
    areaId: string;
    areaName: string;
    areaNameE: string;
    areaNameL: string;
    areaTypeRcd: string;
    activeFlag: boolean;
    availableFlag: boolean;
    parentAreaId: string;
    seqNum: number;
    shortCode: string;
    rootFlag: boolean;
    lastFlag: boolean;
    levelNo: number;
    keyStruct: string;
};
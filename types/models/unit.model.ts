export interface IUnit {
    id:               string;
    unitCode:         string;
    unitName:         string;
    shortName?:       string;
    parentUnitId?:    string;
    parentUnitName?:  string;
    unitLevel?:       number;
    organizationName?: string;
    activeFlag:       number;
};
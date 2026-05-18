export interface IRiskLevel {
    id: string;
    code: string;
    name: string;
    levelOrder: number;
    description?: string;
    isActive: boolean;
};

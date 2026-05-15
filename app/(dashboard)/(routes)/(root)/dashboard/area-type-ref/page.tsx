"use client";

import { useState } from "react";
import { AreaTypeRefForm, AreaValues } from "../_components/area-type-ref-form";
import {
    BaseTreeNode,
    TreePageLayout,
} from "@/app/(dashboard)/_layouts/tree-layout";
import { useGetAreas, useCreateArea } from "@/hooks/use-area";
import { IArea, IAreaTree } from "@/types/models/area.model";

interface AreaNode extends BaseTreeNode {
    areaTypeRcd: string;
    children?: AreaNode[];
}

type SlideMode = "add" | "add-child" | "edit";

const buildTreeNodes = (areas: IAreaTree[]): AreaNode[] => {
    return areas.map((area) => ({
        id: area.areaId,
        label: area.areaName,
        areaTypeRcd: area.areaTypeRcd,
        children: area.children ? buildTreeNodes(area.children as IAreaTree[]) : [],
    }));
};

export default function AreaPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [slideMode, setSlideMode] = useState<SlideMode>("add");
    const [selectedNode, setSelectedNode] = useState<AreaNode | null>(null);

    const { data: areaData } = useGetAreas();
    const { mutateAsync: createArea } = useCreateArea();

    const areas: IAreaTree[] = Array.isArray(areaData?.data) ? areaData.data : [];
    const treeNodeData = buildTreeNodes(areas);

    const slideTitle: Record<SlideMode, string> = {
        add: "Thêm khu vực",
        "add-child": "Thêm khu vực con",
        edit: "Chỉnh sửa khu vực",
    };

    const handleSubmit = async (values: AreaValues) => {
        const payload: Omit<IArea, "areaId"> = {
            areaName: values.areaName,
            areaNameE: values.areaNameE ?? "",
            areaNameL: values.areaNameL ?? "",
            areaTypeRcd: values.areaTypeRcd,
            shortCode: values.shortCode,
            parentAreaId: values.parentAreaId ?? "",
            seqNum: values.seqNum,
            activeFlag: values.activeFlag,
            availableFlag: values.availableFlag,
            rootFlag: !values.parentAreaId,
            lastFlag: true,
            levelNo: 0,
            keyStruct: "",
        };

        try {
            await createArea(payload);
            setShowSlide(false);
        } catch (err) {
            console.error("Lỗi khi lưu khu vực:", err);
        }
    };

    return (
        <TreePageLayout<AreaNode>
            data={treeNodeData}
            title="Danh mục khu vực"
            description="Quản lý cây khu vực"
            searchPlaceholder="Tìm kiếm khu vực..."
            badges={[
                {
                    text: (node) => node.areaTypeRcd,
                    className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
                },
            ]}
            showChildCount
            onAdd={() => {
                setSlideMode("add");
                setSelectedNode(null);
                setShowSlide(true);
            }}
            onAddChild={(node) => {
                setSlideMode("add-child");
                setSelectedNode(node);
                setShowSlide(true);
            }}
            onEdit={(node) => {
                setSlideMode("edit");
                setSelectedNode(node);
                setShowSlide(true);
            }}
            onDelete={(node) => {
                console.log("delete", node.id);
            }}
            slideTitle={slideTitle[slideMode]}
            showSlide={showSlide}
            onCloseSlide={() => setShowSlide(false)}
            slideContent={
                <AreaTypeRefForm
                    key={`${slideMode}-${selectedNode?.id ?? "new"}`}
                    parentAreaId={slideMode === "add-child" ? selectedNode?.id : null}
                    parentAreaName={slideMode === "add-child" ? selectedNode?.label : null}
                    initialData={
                        slideMode === "edit" && selectedNode
                            ? {
                                areaName: selectedNode.label,
                                areaNameE: "",
                                areaNameL: "",
                                areaTypeRcd: selectedNode.areaTypeRcd,
                                shortCode: "",
                                parentAreaId: null,
                                seqNum: 0,
                                activeFlag: true,
                                availableFlag: true,
                            }
                            : null
                    }
                    onSubmit={handleSubmit}
                />
            }
        />
    );
}

"use client";

import { useMemo, useState, ReactNode } from "react";
import type { DataNode } from "antd/es/tree";
import { Tree } from "antd";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SlideOverLayout from "@/app/(dashboard)/_layouts/slide-over-layout";
import { Label } from "@/components/ui/label";

export interface BaseTreeNode {
    id: string;
    label: string;
    children?: any[];
    raw?: Record<string, unknown>;
}

export interface NodeBadge<T extends BaseTreeNode> {
    text: (node: T) => string;
    className?: string;
    show?: (node: T) => boolean;
}

export interface TreePageLayoutProps<T extends BaseTreeNode> {
    data: T[];
    title: string;
    description?: string;
    searchPlaceholder?: string;
    badges?: NodeBadge<T>[];
    showChildCount?: boolean;
    filterFn?: (node: T, keyword: string) => boolean;
    onAdd?: () => void;
    onAddChild?: (node: T) => void;
    onEdit?: (node: T) => void;
    onDelete?: (node: T) => void;
    actions?: {
        addChild?: boolean;
        edit?: boolean;
        delete?: boolean;
    };
    slideTitle?: string;
    slideContent?: ReactNode;
    showSlide?: boolean;
    onCloseSlide?: () => void;
    renderNodeTitle?: (node: T, defaultContent: ReactNode) => ReactNode;
}

function filterTreeNodes<T extends BaseTreeNode>(
    data: T[],
    keyword: string,
    filterFn?: (node: T, keyword: string) => boolean,
): T[] {
    if (!keyword) return data;

    return data
        .map((item) => {
            const defaultMatch = item.label
                .toLowerCase()
                .includes(keyword.toLowerCase());

            const matched = filterFn ? filterFn(item, keyword) : defaultMatch;

            const children = filterTreeNodes(
                (item.children ?? []) as T[],
                keyword,
                filterFn,
            );

            if (matched || children.length > 0) {
                return { ...item, children };
            }
            return null;
        })
        .filter(Boolean) as T[];
}

export function TreePageLayout<T extends BaseTreeNode>({
    data,
    title,
    description,
    searchPlaceholder = "Tìm kiếm...",
    badges = [],
    showChildCount = true,
    filterFn,
    onAdd,
    onAddChild,
    onEdit,
    onDelete,
    actions = { addChild: true, edit: true, delete: true },
    slideTitle = "Thêm mới",
    slideContent,
    showSlide = false,
    onCloseSlide,
    renderNodeTitle,
}: TreePageLayoutProps<T>) {
    const [search, setSearch] = useState("");

    const renderTitle = (node: T): ReactNode => {
        const childCount = node.children?.length ?? 0;

        const defaultContent = (
            <div className="group flex items-center justify-between w-full py-1 pr-2">
                <div className="flex items-center gap-2 overflow-hidden">
                    <span className="truncate text-sm text-slate-700">
                        {node.label}
                    </span>
                    {badges.map((badge, idx) => {
                        const shouldShow = badge.show ? badge.show(node) : true;
                        if (!shouldShow) return null;
                        return (
                            <Badge
                                key={idx}
                                className={
                                    badge.className ??
                                    "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                }
                            >
                                {badge.text(node)}
                            </Badge>
                        );
                    })}

                    {showChildCount && childCount > 0 && (
                        <Badge
                            variant="outline"
                            className="border-cyan-200 text-cyan-700"
                        >
                            {childCount}
                        </Badge>
                    )}
                </div>

                <div className="hidden group-hover:flex items-center gap-1">
                    {actions.addChild && onAddChild && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddChild(node);
                            }}
                        >
                            <Plus size={15} />
                        </Button>
                    )}

                    {actions.edit && onEdit && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(node);
                            }}
                        >
                            <Edit2 size={15} />
                        </Button>
                    )}

                    {actions.delete && onDelete && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-5 w-5 text-red-500 hover:text-red-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(node);
                            }}
                        >
                            <Trash2 size={15} />
                        </Button>
                    )}
                </div>
            </div>
        );

        return renderNodeTitle
            ? renderNodeTitle(node, defaultContent)
            : defaultContent;
    };

    const mapTreeData = (items: T[]): DataNode[] =>
        items.map((item) => ({
            key: item.id,
            title: renderTitle(item),
            children:
                item.children && item.children.length > 0
                    ? mapTreeData(item.children as T[])
                    : undefined,
        }));

    const treeData = useMemo(() => {
        const filtered = filterTreeNodes(data, search, filterFn);
        return mapTreeData(filtered);
    }, [search, data]);

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-800 sm:text-lg">
                                {title}
                            </h2>
                            {description && (
                                <p className="text-sm text-slate-500">
                                    {description}
                                </p>
                            )}
                        </div>

                        {onAdd && (
                            <Button
                                onClick={onAdd}
                                variant="basic"
                                className="gap-2 h-8"
                            >
                                <Plus 
                                    size={16} 
                                    className="font-semibold"
                                 />
                                <Label className="font-semibold hidden sm:block">
                                    Thêm mới
                                </Label>
                            </Button>
                        )}
                    </div>

                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="p-4">
                    <Tree
                        showLine
                        blockNode
                        defaultExpandAll
                        treeData={treeData}
                        className="custom-tree"
                    />
                </div>
            </div>

            {slideContent && (
                <SlideOverLayout
                    showSlide={showSlide}
                    closeSlide={onCloseSlide ?? (() => {})}
                    title={slideTitle}
                >
                    {slideContent}
                </SlideOverLayout>
            )}
        </div>
    );
}

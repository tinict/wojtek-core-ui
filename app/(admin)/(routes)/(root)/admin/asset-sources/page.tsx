"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import AssetSourceTableClient from "./_components/asset-source-table-client";
import { IAssetSource } from "@/types/models/asset-source.model";
import { AssetSourceForm, AssetSourceValues } from "./_components/asset-source-form";
import { useCreateAssetSource, useDeleteAssetSource, useUpdateAssetSource } from "@/hooks/use-asset-source";

export default function AssetSourcePage() {
    const [showSlide, setShowSlide]   = useState(false);
    const [editTarget, setEditTarget] = useState<IAssetSource | null>(null);

    const { mutateAsync: createAssetSource } = useCreateAssetSource();
    const { mutateAsync: updateAssetSource } = useUpdateAssetSource();
    const { mutateAsync: deleteAssetSource } = useDeleteAssetSource();

    const openCreate = () => { setEditTarget(null); setShowSlide(true); };
    const openEdit   = (row: IAssetSource) => { setEditTarget(row); setShowSlide(true); };
    const closeSlide = () => { setShowSlide(false); setEditTarget(null); };

    const handleSubmit = async (values: AssetSourceValues) => {
        const res = editTarget
            ? await updateAssetSource({ id: editTarget.id, ...values })
            : await createAssetSource(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IAssetSource) => {
        await deleteAssetSource(row.id);
    };

    const formInitialData: AssetSourceValues | null = editTarget
        ? {
              code:        editTarget.code,
              name:        editTarget.name,
              description: editTarget.description,
              isActive:    editTarget.isActive,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <AssetSourceTableClient openEdit={openEdit} openCreate={openCreate} onDelete={handleDelete} />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={editTarget ? "Cập nhật nguồn tài sản" : "Thêm nguồn tài sản"}
            >
                <AssetSourceForm initialData={formInitialData} onSubmit={handleSubmit} />
            </SlideOverLayout>
        </div>
    );
}

import { SlideOver } from "@/components/wojtek-ui/slide-over";
import { Building2 } from "lucide-react";

export default function SlideOverLayout({
    children,
    showSlide,
    closeSlide,
    title,
}: {
    children: React.ReactNode;
    showSlide: boolean;
    closeSlide: () => void;
    title: string;
}) {
    return (
        <SlideOver
            open={showSlide}
            onClose={closeSlide}
            side="right"
            width="780px"
        >
            <SlideOver.Header>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2445]">
                    <Building2 size={15} className="text-white" />
                </div>

                <SlideOver.Title>{title}</SlideOver.Title>
            </SlideOver.Header>

            <SlideOver.Body>{children}</SlideOver.Body>
        </SlideOver>
    );
}

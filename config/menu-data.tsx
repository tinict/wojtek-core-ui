import {
    Heart,
    Brain,
    Bone,
    Stethoscope,
    Activity,
    Shield,
} from "lucide-react";
import type { NavMenuData } from "@/types/type";

export const defaultMenuData: NavMenuData = {
    "Về chúng tôi": {
        featured: {
            title: "Phòng khám An Y",
            desc: "Cơ sở y tế hiện đại, đội ngũ bác sĩ chuyên nghiệp tận tâm",
            badge: "Tin cậy",
        },
        sections: [
            {
                title: "Giới thiệu",
                items: [
                    {
                        label: "Cơ sở vật chất",
                        icon: <Shield className="w-4 h-4" />,
                    },
                    {
                        label: "Trách nhiệm xã hội",
                        icon: <Heart className="w-4 h-4" />,
                    },
                ],
            },
        ],
    },

    "Cơ xương khớp": {
        featured: {
            title: "Chuyên khoa Cơ xương khớp",
            desc: "Điều trị các bệnh lý về xương khớp, cột sống với phác đồ tiên tiến",
            badge: "Chuyên sâu",
        },
        sections: [
            {
                title: "Dịch vụ",
                items: [
                    {
                        label: "Thoái hoá khớp",
                        icon: <Bone className="w-4 h-4" />,
                    },
                    {
                        label: "Loãng xương",
                        icon: <Bone className="w-4 h-4" />,
                        badge: "Mới",
                    },

                    {
                        label: "Viêm khớp dạng thấp",
                        icon: <Activity className="w-4 h-4" />,
                    },
                    {
                        label: "Đau cột sống",
                        icon: <Stethoscope className="w-4 h-4" />,
                    },
                ],
            },
        ],
    },

    "Tin tức": {
        featured: {
            title: "Tin tức sức khoẻ",
            desc: "Cập nhật thông tin y tế, kiến thức chăm sóc sức khoẻ mới nhất",
            badge: "Mới nhất",
        },
        sections: [
            {
                title: "Chuyên mục",
                items: [
                    {
                        label: "Kiến thức sức khoẻ",
                        icon: <Brain className="w-4 h-4" />,
                    },
                    {
                        label: "Hoạt động phòng khám",
                        icon: <Heart className="w-4 h-4" />,
                    },
                    {
                        label: "Y học hiện đại",
                        icon: <Stethoscope className="w-4 h-4" />,
                        badge: "Mới",
                    },
                ],
            },
        ],
    },

    "Liên hệ": null,
};

export const defaultQuickLinks = [
    "Đặt lịch khám",
    "Tra cứu kết quả",
    "Hướng dẫn thăm khám",
    "Bảng giá dịch vụ",
    "Hỏi đáp sức khỏe",
];

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface SwiperProps {
    images: SwiperImageProps[];
}

export interface SwiperImageProps {
    src: string;
    alt: string;
}

const SwiperRoot = ({ images }: SwiperProps) => {
    return (
        <section className="w-full">
            <Swiper
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="h-40 sm:h-56 md:h-80 lg:h-96 w-full rounded-lg"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export { SwiperRoot };

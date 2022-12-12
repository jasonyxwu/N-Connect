import React from "react";
import Image from "next/image";

export default function HomePageCarousel() {
    return (
        <div className="h-full">
            <Image
                src="/IMG_3813.PNG"
                className="rounded-lg opacity-80"
                width="550"
                height="550"
                alt="carousel of nintendo games"
                priority
            ></Image>
        </div>
    );
}

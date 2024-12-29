"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smart watch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel items-center flex justify-center">
      {/* Added max width and centered using mx-auto */}
      <Carousel
        infiniteLoop={true}
        // autoPlay={true}
        // interval={2000}
        showArrows={false}
        showThumbs={false}
        showStatus={false}
      >
        {heroImages.map((image, index) => (
          <div key={index}>
            <Image
              src={image.imgUrl}
              alt={image.alt}
              height={484}
              width={484}
              className="object-contain"
            />
          </div>
        ))}
      </Carousel>

      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;

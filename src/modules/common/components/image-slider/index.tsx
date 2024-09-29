"use client"
import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image";
import Banner from "@/../public/images/banner-img.png";
import Banner2 from "@/../public/images/banner-img2.png";
import Banner3 from "@/../public/images/banner-img3.png";

const AdaptiveHeight = (slider) => {
    function updateHeight() {
        slider.container.style.height =
            slider.slides[slider.track.details.rel].offsetHeight + "px"
    }
    slider.on("created", updateHeight)
    slider.on("slideChanged", updateHeight)
}
type sizeImage = {
    width: number
    height?: number
}

export default function Slider({ width, height }: sizeImage) {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            slideChanged(s) {
                setCurrentSlide(s.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
        },
        [AdaptiveHeight]
    )

    return (
        <><div className=" z-1">
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    <div className="keen-slider__slide number-slide1">
                        <Image src={Banner} width={width} height={height} alt='Picture of the author ' />
                    </div>
                    <div className="keen-slider__slide number-slide2">
                        <Image src={Banner2} width={width} height={height} alt='Picture of the author ' />
                    </div>
                    <div className="keen-slider__slide number-slide3">
                        <Image src={Banner3} width={width} height={height} alt='Picture of the author ' />
                    </div>
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </>
                )}
            </div>
        </div>

            {loaded && instanceRef.current && (
                <div className="dots">
                    {[
                        ...Array(instanceRef.current.track.details.slides.length).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            ></button>
                        )
                    })}
                </div>
            )}
        </>
    )
}
function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}

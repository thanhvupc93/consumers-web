"use client"
import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}


export default function SliderThumbnails() {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    })
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 3,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    return (
        <div className="w-[100%]">
            <div ref={sliderRef} className="keen-slider lg:h-[624px] lg:w-[624px] h-[350px] w-[350px]">
                <div className="keen-slider__slide number-slide-t1">1</div>
                <div className="keen-slider__slide number-slide-t2">2</div>
                <div className="keen-slider__slide number-slide-t3">3</div>
            </div>

            <div ref={thumbnailRef} className="w-[100%] keen-slider thumbnail">
                <div className="w-[33%] keen-slider__slide number-slide-t1">1</div>
                <div className="w-[33%] keen-slider__slide number-slide-t2">2</div>
                <div className="w-[33%] keen-slider__slide number-slide-t3">3</div>
            </div>
        </div>
    )

}
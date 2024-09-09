
import { useEffect, useState } from 'react';
import {ChevronLeft,ChevronRight} from 'react-feather'; 

export default function Carousel({children:slides ,
    autoSlide=false,
    autoSlideInterval=3500}){
    const [curr,setCurr] = useState(0)

    const prev = () => {
        setCurr((curr) => (curr === 0 ? slides.length-1 : curr-1))
    }
        
    const next = () =>
         setCurr((curr) => (curr === slides.length-1 ? 0 : curr+1))

    useEffect(() =>{
        if(!autoSlide) return
        const slideInterval = setInterval(next,autoSlideInterval)
        return () => clearInterval(slideInterval)
    })
    return(
        <div className="overflow-hidden relative">
            <div className="flex-transition fixed-image-size" style={{transform:`translateX(-${curr*100}%)`}}>
                {slides}
            </div>
            {slides.length === 1 ? "":
            <div className='absolute-flex-center-between'>
                <button onClick={prev} className='carousel-button'>
                    <ChevronLeft size={40}/>
                </button>
                <button onClick={next} className='carousel-button'>
                    <ChevronRight size={40}/>
                </button>
            </div>}

            <div className='first-div'>
                <div className='my-flex-class'>
                    {slides.map((_, i) => (
                        <div 
                            key={i} 
                            className={`my-element  ${curr === i ? "curr-on" : "bg-opacity-50"}`} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
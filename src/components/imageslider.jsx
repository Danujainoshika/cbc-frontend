import { useState } from "react"

export default function ImageSlider(props){
    const [activeimage,setActiveimage] = useState(0)
    const images = props.images
    return(
        <div>
            <div className="w-[400px] ">
                <img className="h-[400px] object-cover" src={images[activeimage]} />
                <div className="h-[100px] flex justify-center items-center gap-2 ">
                    {
                        images.map((img,index)=>{
                            return(
                                <img key={index} className={"w-[90px] h-[90px] object-cover " + (activeimage == index && "border-[4px] border-accent")} src={img} onClick={()=>(setActiveimage(index))}/>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}
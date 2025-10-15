
import { useState } from "react"
import mediaUpload from "../utils/mediaupload"


export default function Test(){
    const[file,setfile] = useState(null)
    async function uploadimage(){
        const link = await mediaUpload(file)
        console.log(link)
    }
    return(
        
        <div className="w-full h-[100vh] flex flex-row justify-center items-center text-white bg-amber-500">
            <input type="file" onChange={
                (e)=>{
                    setfile(e.target.files[0])
            }}/>
            <button className="bg-amber-700 p-2 rounded-2xl" onClick={uploadimage}>Upload</button>

        </div>

    )
}
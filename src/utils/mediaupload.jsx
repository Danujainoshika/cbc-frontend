import { createClient } from "@supabase/supabase-js"

const annonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d2FycHBuc3FhZm9reHRja3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTcxNDcsImV4cCI6MjA3NTg3MzE0N30.huy3r6sMT4VShUpE0uI8LLQUp7H5r6cCxivGI45-TTo"
const supabaseurl = "https://zwwarppnsqafokxtckzk.supabase.co"
const supabase = createClient(supabaseurl,annonkey)

export default function mediaUpload(file){
    return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }else{
            
            const timestamp =  new Date().getTime();
            const filename = timestamp+file.name
            supabase.storage.from("images").upload(filename , file ,
            {
                upsert: false,
                cacheControl:"3600"
            }).then(
                ()=>{
                    const publicurl = supabase.storage.from("images").getPublicUrl(filename).data.publicUrl;
                    resolve(publicurl)
                }
            
         ).catch(
            ()=>{
                reject("An error occured")
            }
         )
        }
    })
}
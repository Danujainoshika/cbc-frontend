import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import toast from "react-hot-toast";
import Loading from "../../components/loader";
import { MdVerified } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
function UserBlockConfirm(props){

  const email = props.user.email
  const close = props.close
  const refresh = props.refresh

  function blockUser(){
    const token = localStorage.getItem("token");
    axios.put(import.meta.env.VITE_API_URL+"/api/users/block/"+email,
      {
        isBlock : !props.user.isBlock
      },
      {
        headers:{
          Authorization : "Bearer " + token
      }
      }).then(
      (response)=>{
        console.log(response.data)  
        close();
        props.user.isBlock ? toast.success("User Unblocked successfully") : toast.success("User blocked successfully");
        refresh();
      }
    ).catch(()=>{
        toast.error("Failed to block user")
    })
  }

  return (
          <div className=" fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
            <div className="w-[400px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[20px] ">
              <button className="absolute right-[-40px] top-[-40px] w-[40px] h-[40px] bg-red-600 text-white rounded-full font-bold border-red-600 hover:bg-white hover:text-red-600 " onClick={close}>X</button>
              <p className="font-semibold text-center">Are you sure you want to {props.user.isBlock ? "unblock" : "block"} this user with email: {email}?</p>
              <div className="flex gap-[20px]">
                <button onClick={blockUser} className="w-[70px] h-[30px] bg-blue-600 text-white hover:bg-accent">Yes</button>
                <button className="w-[70px] h-[30px] bg-red-600 text-white  hover:bg-accent" onClick={close}>Cancel</button>
              </div>
            </div>
              
              
          </div>)
}
export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  const [isBlockConfirmVisible,setIsBlockConfirmVisible] = useState(false)
  const [userToBlock,setUserToBlock] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    if(isLoading){
      const token = localStorage.getItem("token");
      axios
      .get(import.meta.env.VITE_API_URL + "/api/users/all-users",{
        headers:{
          Authorization : "Bearer " + token
        }
      })
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false)
      });
    }
    
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen p-8 bg-[var(--color-primary)] text-[var(--color-secondary)]">
        {
          isBlockConfirmVisible && <UserBlockConfirm refresh={()=>{setIsLoading(true)}} user={userToBlock} close={()=>{setIsBlockConfirmVisible(false)}}/>
        }
        
      {/* Main Container */}
      <div className="overflow-x-auto rounded-xl shadow-xl bg-[var(--color-primary)]/70 backdrop-blur-lg border border-[var(--color-secondary)]/10 p-6">
        
        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-6 text-[var(--color-secondary)] border-l-4 border-[var(--color-accent)] pl-3">
          Users
        </h1>

        {/* Table */}
        {isLoading?<Loading/>:
        <table className="min-w-full border border-[var(--color-secondary)]/20 text-center rounded-lg overflow-hidden">
          <thead className="bg-[var(--color-secondary)] text-[var(--color-primary)] uppercase text-sm">
            <tr>
              <th className="py-3 px-4 font-medium">Image</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">First Name</th>
              <th className="py-3 px-4 font-medium">Last Name</th>
              <th className="py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-secondary)]/15">
            {users.map((user) => (
              <tr
                key={user.email}
                className="hover:bg-[var(--color-accent)]/15 transition-all duration-300"
              >
                <td className="py-3 px-4 flex justify-center">
                  <img
                    src={user.image}
                    referrerPolicy="no-referrer"
                    alt={user.firstname}
                    className={"w-16 h-16 object-cover rounded-full  shadow-sm "+(user.isBlock?"border-4 border-red-500":"border-4 border-green-500")}
                  />
                </td>
                <td className="py-3 px-4 font-medium"><div className="flex items-center justify-center w-full gap-2">{user.email}{user.isEmailVerified && <MdVerified className="text-blue-500"/>}</div></td>
                <td className="py-3 px-4">{user.firstname}</td>
                <td className="py-3 px-4 ">{user.lastname}</td>
                <td className="py-3 px-4 ">
                    <div className="flex justify-center items-center gap-2">
                      <p>
                      {user.role == "admin" && <MdOutlineAdminPanelSettings className="text-lg" />}
                      </p>
                      {user.role}
                    </div>
                    
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-row gap-[16px] justify-center items-center">
                    {
                      <button className="bg-[var(--color-accent)] text-white py-1 px-4 rounded hover:bg-accent/80 cursor-pointer" onClick={
                        ()=>{
                          setUserToBlock(user)
                          setIsBlockConfirmVisible(true)
                        }
                      }>{user.isBlock ? "Unblock" : "Block"}</button>
                    }
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

      {/* Footer */}
      <p className="text-sm text-center mt-6 text-[var(--color-secondary)]/70 italic">
        CBC Admin Panel — managing beauty with clarity ✨
      </p>
    </div>
  );
}

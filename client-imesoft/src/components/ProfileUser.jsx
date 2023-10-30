import Button from "./Button"
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import Image from "next/image";


const ProfileUser = ({closeModal}) => {
  
  const navigate = useRouter();
  const user = useSelector((state) => state.user.user);
  
  return (
    <div>
      <div> 
        <div>
          <Image src={"/profile.png"} width={100} height={100} alt="Profile"/>
        </div>
        <div>
          {user.data.fullname}
        </div>
        <div>
        <Button text={"Editar Perfil"} onClick={() => {closeModal();navigate.push("/homePage/profile")}}/>
        </div>
      </div>
      <Button text={"X"} className="bg-red-600 h-10 p-2" onClick={()=>{closeModal()}} />
    </div>
  )
}

export default ProfileUser;
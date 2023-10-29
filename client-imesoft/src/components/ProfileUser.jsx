import Button from "./Button"

const ProfileUser = ({closeModal}) => {
  return (
    <div>
      <div> 
        <div>
          Imagen
        </div>
        <div>
          fullname
        </div>
        <div>
          Editar Perfil
        </div>
      </div>
      <Button text={"X"} className="bg-red-600 h-10 p-2" onClick={()=>{closeModal()}} />
    </div>
  )
}

export default ProfileUser
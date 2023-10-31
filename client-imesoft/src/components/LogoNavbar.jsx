import Image from "next/image";

function Logo(){
    return (
    <div className="">
        <Image src="/IMEblanco.png" 
        alt="Logo de navbar"
              width={170}
              height={170}
              priority={true}/>  
  </div>
    )
}

export default Logo

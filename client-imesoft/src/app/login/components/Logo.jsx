import Image from "next/image";
import styles from "../../styles/homePage.css";

function Logo(){
    return (
    <div className={styles.logo}>
        <Image src="/IMEnegro.png" 
        alt="Feed"
              width={170}
              height={170}
              priority={true}/>  
  </div>
    )
}

export default Logo
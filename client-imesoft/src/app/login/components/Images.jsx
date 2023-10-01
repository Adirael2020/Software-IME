import Image from "next/image";
import styles from "../../styles/login.module.css";

function Images() {
  return (
    <div className={styles.conteiner}>
      <ul className="styles.slider">
        <li className="styles.slide" id="slider1">
          <div className="md:shrink-0 opacity-70">
            <Image
              src="/feed.jpg"
              alt="Feed"
              width={370}
              height={370}
              priority={true}
            />
          </div>
        </li>
        <li className="styles.slide" id="slider2">
          <div className=" md:shrink-0 opacity-70 ">
            <Image src="/feed_2.jpg" alt="Feed" width={370} height={370} />
          </div>
        </li>
        <li className="styles.slide" id="slider3 ">
          <div className=" md:shrink-0 opacity-70 ">
            <Image src="/feed_3 (1).jpg" alt="Feed" width={370} height={370} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Images;

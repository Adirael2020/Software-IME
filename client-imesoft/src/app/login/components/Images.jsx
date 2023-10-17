import Image from "next/image";
import styles from "../../styles/login.module.css";

function Images() {
  return (
    <div className={styles.conteiner}>
        <li className={styles.slide}>
          <div className="md:shrink-0 opacity-70 w-auto h-auto">
            <Image
              src="/feed.jpg"
              alt="Feed"
              width={367}
              height={200}
              priority={true}
            />
          </div>
        </li>
        <li className={styles.slide}>
          <div className=" md:shrink-0 opacity-70">
            <Image src="/feed_2.jpg" alt="Feed" width={370} height={370} />
          </div>
        </li>
        <li className={styles.slide}>
          <div className=" md:shrink-0 opacity-70">
            <Image src="/feed_3 (1).jpg" alt="Feed" width={370} height={370} />
          </div>
        </li>
    </div>
  );
}

export default Images;

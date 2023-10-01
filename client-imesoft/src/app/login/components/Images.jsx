import Image from 'next/image';
import styles from "../../styles/login.module.css"

function Images() {
  return (
    <div className={styles.conteiner}>
     <ul className='styles.slider'>
      <li className='styles.slide' id='slider1'>
    <div className='w-auto h-auto md:shrink-0 opacity-70' >
      <Image src="/feed.jpg" alt="Feed" width={367} height={200} priority={true}/>
    </div>
    </li>
    <li className='styles.slide' id='slider1'>
    <div className='w-auto h-auto md:shrink-0 opacity-70'>
    <Image src="/feed_2.jpg" alt="Feed" width={367} height={200} />
  </div></li>
  <li className='styles.slide' id='slider1'>
    <div className='w-auto h-auto md:shrink-0 opacity-70'>
      <Image src="/feed_3 (1).jpg" alt="Feed" width={367} height={200} />
  </div></li>
  </ul>
  </div>
  );
}

export default Images;

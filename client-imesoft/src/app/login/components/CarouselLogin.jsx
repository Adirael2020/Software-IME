import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "../../styles/login.module.css";


const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Avanzar al siguiente índice de la imagen
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia la imagen cada 5 segundos

    return () => {
      clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [images.length]);

  return (
    <div className={styles.carousel}>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentImageIndex ? styles.active : styles.inactive
          }`}
        >
          <Image
            src={imageUrl}
            alt={`Slide ${index}`}
            width={450} 
            height={450} 
          />
        </div>
      ))}
    </div>
  );
};
export default Carousel;






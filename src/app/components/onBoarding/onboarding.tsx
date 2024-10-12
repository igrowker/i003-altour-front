// components/Onboarding.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OnboardingProps {
  onComplete: () => void;  
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<any>(null); // Referencia para el Swiper
  const totalSlides = 3; 

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const handleContinue = () => {
    if (swiperRef.current) {
      if (currentSlide < totalSlides - 1) {
        swiperRef.current.slideNext(); 
      } else {
        console.log('Onboarding complete'); // Añade este log
        onComplete(); // Si es la última diapositiva, completamos el onboarding
      }
    }
  };

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="relative flex items-center justify-center bg-gray-200 overflow-hidden">
      
      <div className="absolute top-6 md:top-8  items-center w-[70%] md:w-[60%] h-3 bg-gray-300 bg-opacity-25 z-50 shadow-sm drop-shadow-lg rounded-full">
        <div
          className="h-full bg-yellow-500 transition-all duration-300 rounded-xl shadow-sm drop-shadow-lg overflow-hidden p-1"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      {/*   <Link href="/home"><button className="mt-4 text-black  font-bold text-baseline px-4 py-2 rounded drop-shadow-lg">Omitir</button></Link> */}
      </div>

      <Swiper
        onSlideChange={handleSlideChange}
        className="w-full h-screen"
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Guardar la referencia del swiper
      >
        <SwiperSlide>
          <div className="relative h-screen bg-cover bg-center bg-[url('/images/onboarding1.jpg')]">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="flex flex-col items-center justify-between text-center max-w-4xl mx-auto px-4 md:px-8 lg:px-16 h-full">
                <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md mb-6 mt-6">¡Bienvenido a Altour!</h1>
            <Image
              src="/isotipo_altour.png"
              width={260}
              height={260}
              alt="Altour"
              className="mb-8 md:mb-12 w-40 md:w-60 lg:w-80"
            />
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-md">Descubre una nueva forma de explorar las ciudades más visitadas.</p>
              <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-md">Con Altour, podrás evitar las zonas más congestionadas y disfrutar de una experiencia turística única y cómoda.</p>
            </div></div>
            <button onClick={handleContinue} className="mt-4 md:mt-8 mb-4 bg-yellow-500 text-black font-bold text-lg md:text-xl px-6 py-3 rounded-lg drop-shadow-lg hover:bg-yellow-400 transition-colors">Comenzar</button>
          </div>
          </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-screen bg-cover bg-center bg-[url('/images/onboarding2.jpg')]">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="flex flex-col items-center justify-between text-center max-w-4xl mx-auto px-4 md:px-8 lg:px-16 h-full">
                <div className="flex flex-col items-center justify-center flex-grow">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md mb-6">Evita las zonas saturadas</h2>
            <span className="my-8 mt-14"></span>
            <span className="my-8 mt-14"></span>
            
            <div className="flex flex-col items-center gap-4 max-w-2xl mt-12">
              <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-md">Nuestro mapa de calor en tiempo real te muestra las áreas más concurridas de la ciudad.</p>
              <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-md">¡Explora con tranquilidad, alejándote de las multitudes!</p>
            </div></div>
            <button onClick={handleContinue} className="mt-4 md:mt-8 mb-4 bg-yellow-500 text-black font-bold text-lg md:text-xl px-6 py-3 rounded-lg drop-shadow-lg hover:bg-yellow-400 transition-colors">Sigue explorando</button>
          </div></div></div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-screen bg-cover bg-center bg-[url('/images/onboarding3.jpg')]">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="flex flex-col items-center justify-between text-center max-w-4xl mx-auto px-4 md:px-8 lg:px-16 h-full">
                <div className="flex flex-col items-center justify-center flex-grow">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md mb-6">Descubre destinos alternativos</h2>
            
            <span className="my-8 mt-14"></span>
            <span className="my-8  mt-14"></span>
            
            <div className="flex flex-col items-center gap-4 max-w-2xl mt-12">
              <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-md">Te recomendaremos lugares menos concurridos cercanos para que disfrutes de una experiencia relajada.</p>
            </div>
            </div>
            <Link href="/explore">
              <button className="mt-4 md:mt-8 mb-4 bg-yellow-500 text-black font-bold text-lg md:text-xl px-6 py-3 rounded-lg drop-shadow-lg hover:bg-yellow-400 transition-colors">
            Entrar
          </button>
          </Link>
          </div>
          </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Onboarding;

// components/Onboarding.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useRef } from 'react';
import Image from 'next/image';

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
        onComplete(); // Si es la última diapositiva, completamos el onboarding
      }
    }
  };

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="h-screen relative flex items-center justify-center bg-gray-200 ">
      
      <div className="absolute top-8 items-center w-[70%] h-3 bg-gray-300 bg-opacity-25 z-50 shadow-sm drop-shadow-lg ">
        <div
          className="h-full bg-yellow-500 transition-all duration-300 rounded-xl shadow-sm drop-shadow-lg overflow-hidden p-1"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <Swiper
        onSlideChange={handleSlideChange}
        className="w-full h-full"
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Guardar la referencia del swiper
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-between text-center h-full bg-cover bg-center bg-[url('/images/onboarding1.jpg')] p-16">
            <h1 className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">¡Bienvenido a Altour!</h1>
            <Image
              src="/isotipo_altour.png"
              width={300}
              height={300}
              alt="Altour"
              className="mb-4"
            />
            <div className="flex flex-col items-center gap-2">
              <p className="text-white text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">Descubre una nueva forma de explorar las ciudades más visitadas.</p>
              <p className="text-white text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">Con Altour, podrás evitar las zonas más congestionadas y disfrutar de una experiencia turística única y cómoda.</p>
            </div>
            <button onClick={handleContinue} className="mt-4 bg-yellow-500 text-black font-bold text-xl px-4 py-2 rounded drop-shadow-lg">Comenzar</button>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col items-center justify-between text-center h-full bg-cover bg-center bg-[url('/images/onboarding2.jpg')] p-16">
            <h2 className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">Evita las zonas saturadas</h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">Nuestro mapa de calor en tiempo real te muestra las áreas más concurridas de la ciudad.</p>
              <p className="text-white text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">¡Explora con tranquilidad, alejándote de las multitudes!</p>
            </div>
            <button onClick={handleContinue} className="mt-4 bg-yellow-500 text-black font-bold text-xl px-4 py-2 rounded drop-shadow-lg">Sigue explorando</button>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col items-center justify-between text-center h-full bg-cover bg-center bg-[url('/images/onboarding3.jpg')] p-16">
            <h2 className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">Descubre destinos alternativos</h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0.90,1)]">Te recomendaremos lugares menos concurridos cercanos para que disfrutes de una experiencia relajada.</p>
            </div>
            <button onClick={handleContinue} className="mt-4 bg-yellow-500 text-black font-bold text-xl px-8 py-2 rounded drop-shadow-lg">Entrar</button>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Onboarding;

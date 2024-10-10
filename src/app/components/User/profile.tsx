import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import UserPreferencesPage from "@/app/components/preferences/preferences";
export default function Profile() {
    const [isPreferencesVisible, setIsPreferencesVisible] = useState(false);

    const handleButtonClick = () => {
        setIsPreferencesVisible(true);
    };

    const closeModal = () => {
        setIsPreferencesVisible(false);
    };

    return (
        <div className="min-h-screen bg-[#f6fafd] flex flex-col justify-start items-start">
            {/* Título de la página */}
            <div className="w-full py-4 px-4">
                <div className="text-[#08121e] text-2xl font-bold font-['Lato']">Perfil</div>
            </div>
            <div className='w-full px-5'>
                {/* Sección de menú completa */}
                <Link href="/Información personal">
                    <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                        <div className="w-6 h-6" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5.85 17.1C6.7 16.45 7.65 15.9375 8.7 15.5625C9.75 15.1875 10.85 15 12 15C13.15 15 14.25 15.1875 15.3 15.5625C16.35 15.9375 17.3 16.45 18.15 17.1C18.7333 16.4167 19.1875 15.6417 19.5125 14.775C19.8375 13.9083 20 12.9833 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 12.9833 4.1625 13.9083 4.4875 14.775C4.8125 15.6417 5.26667 16.4167 5.85 17.1ZM12 13C11.0167 13 10.1875 12.6625 9.5125 11.9875C8.8375 11.3125 8.5 10.4833 8.5 9.5C8.5 8.51667 8.8375 7.6875 9.5125 7.0125C10.1875 6.3375 11.0167 6 12 6C12.9833 6 13.8125 6.3375 14.4875 7.0125C15.1625 7.6875 15.5 8.51667 15.5 9.5C15.5 10.4833 15.1625 11.3125 14.4875 11.9875C13.8125 12.6625 12.9833 13 12 13ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C12.8833 20 13.7167 19.8708 14.5 19.6125C15.2833 19.3542 16 18.9833 16.65 18.5C16 18.0167 15.2833 17.6458 14.5 17.3875C13.7167 17.1292 12.8833 17 12 17C11.1167 17 10.2833 17.1292 9.5 17.3875C8.71667 17.6458 8 18.0167 7.35 18.5C8 18.9833 8.71667 19.3542 9.5 19.6125C10.2833 19.8708 11.1167 20 12 20ZM12 11C12.4333 11 12.7917 10.8583 13.075 10.575C13.3583 10.2917 13.5 9.93333 13.5 9.5C13.5 9.06667 13.3583 8.70833 13.075 8.425C12.7917 8.14167 12.4333 8 12 8C11.5667 8 11.2083 8.14167 10.925 8.425C10.6417 8.70833 10.5 9.06667 10.5 9.5C10.5 9.93333 10.6417 10.2917 10.925 10.575C11.2083 10.8583 11.5667 11 12 11Z" fill="#08121E" />
                        </svg>
                        <div className="ml-1 text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Información personal</div>
                        <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                    </div>
                </Link>

                <div onClick={handleButtonClick} className="w-full py-4 border-b border-[#dddddd] flex items-center px-4 cursor-pointer">
                    <div className="w-6 h-6" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11 21V15H13V17H21V19H13V21H11ZM3 19V17H9V19H3ZM7 15V13H3V11H7V9H9V15H7ZM11 13V11H21V13H11ZM15 9V3H17V5H21V7H17V9H15ZM3 7V5H13V7H3Z" fill="#08121E" />
                    </svg>
                    <div className="ml-1 text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Preferencias</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>
                {isPreferencesVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center">
                        <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[90%] sm:max-w-md sm:rounded-lg shadow-lg mt-0 sm:mt-10 relative flex flex-col">
                            <div className="p-4 border-b border-gray-200 flex justify-start items-center space-x-4 bg-slate-50 rounded-lg">
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <ArrowLeftIcon className="w-6 h-6" />
                                </button>
                                <h1 className="text-xl font-bold">Preferencias</h1>

                            </div>
                            <div className="flex-grow overflow-y-auto">
                                <UserPreferencesPage />
                            </div>
                        </div>
                    </div>
                )}


                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 19V17H5.25V10C5.25 8.61667 5.71875 7.3875 6.65625 6.3125C7.59375 5.2375 8.8125 4.53333 10.3125 4.2V3.5C10.3125 3.08333 10.4766 2.72917 10.8047 2.4375C11.1328 2.14583 11.5312 2 12 2C12.4688 2 12.8672 2.14583 13.1953 2.4375C13.5234 2.72917 13.6875 3.08333 13.6875 3.5V4.2C15.1875 4.53333 16.4062 5.2375 17.3438 6.3125C18.2812 7.3875 18.75 8.61667 18.75 10V17H21V19H3ZM12 22C11.3812 22 10.8516 21.8042 10.4109 21.4125C9.97031 21.0208 9.75 20.55 9.75 20H14.25C14.25 20.55 14.0297 21.0208 13.5891 21.4125C13.1484 21.8042 12.6187 22 12 22ZM7.5 17H16.5V10C16.5 8.9 16.0594 7.95833 15.1781 7.175C14.2969 6.39167 13.2375 6 12 6C10.7625 6 9.70312 6.39167 8.82187 7.175C7.94062 7.95833 7.5 8.9 7.5 10V17Z" fill="#08121E" />
                    </svg>
                    <div className="ml-1 text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Notificaciones</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>

                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 9.9V8.2C14.55 7.96667 15.1125 7.79167 15.6875 7.675C16.2625 7.55833 16.8667 7.5 17.5 7.5C17.9333 7.5 18.3583 7.53333 18.775 7.6C19.1917 7.66667 19.6 7.75 20 7.85V9.45C19.6 9.3 19.1958 9.1875 18.7875 9.1125C18.3792 9.0375 17.95 9 17.5 9C16.8667 9 16.2583 9.07917 15.675 9.2375C15.0917 9.39583 14.5333 9.61667 14 9.9ZM14 15.4V13.7C14.55 13.4667 15.1125 13.2917 15.6875 13.175C16.2625 13.0583 16.8667 13 17.5 13C17.9333 13 18.3583 13.0333 18.775 13.1C19.1917 13.1667 19.6 13.25 20 13.35V14.95C19.6 14.8 19.1958 14.6875 18.7875 14.6125C18.3792 14.5375 17.95 14.5 17.5 14.5C16.8667 14.5 16.2583 14.575 15.675 14.725C15.0917 14.875 14.5333 15.1 14 15.4ZM14 12.65V10.95C14.55 10.7167 15.1125 10.5417 15.6875 10.425C16.2625 10.3083 16.8667 10.25 17.5 10.25C17.9333 10.25 18.3583 10.2833 18.775 10.35C19.1917 10.4167 19.6 10.5 20 10.6V12.2C19.6 12.05 19.1958 11.9375 18.7875 11.8625C18.3792 11.7875 17.95 11.75 17.5 11.75C16.8667 11.75 16.2583 11.8292 15.675 11.9875C15.0917 12.1458 14.5333 12.3667 14 12.65ZM6.5 16C7.28333 16 8.04583 16.0875 8.7875 16.2625C9.52917 16.4375 10.2667 16.7 11 17.05V7.2C10.3167 6.8 9.59167 6.5 8.825 6.3C8.05833 6.1 7.28333 6 6.5 6C5.9 6 5.30417 6.05833 4.7125 6.175C4.12083 6.29167 3.55 6.46667 3 6.7V16.6C3.58333 16.4 4.1625 16.25 4.7375 16.15C5.3125 16.05 5.9 16 6.5 16ZM13 17.05C13.7333 16.7 14.4708 16.4375 15.2125 16.2625C15.9542 16.0875 16.7167 16 17.5 16C18.1 16 18.6875 16.05 19.2625 16.15C19.8375 16.25 20.4167 16.4 21 16.6V6.7C20.45 6.46667 19.8792 6.29167 19.2875 6.175C18.6958 6.05833 18.1 6 17.5 6C16.7167 6 15.9417 6.1 15.175 6.3C14.4083 6.5 13.6833 6.8 13 7.2V17.05ZM12 20C11.2 19.3667 10.3333 18.875 9.4 18.525C8.46667 18.175 7.5 18 6.5 18C5.8 18 5.1125 18.0917 4.4375 18.275C3.7625 18.4583 3.11667 18.7167 2.5 19.05C2.15 19.2333 1.8125 19.225 1.4875 19.025C1.1625 18.825 1 18.5333 1 18.15V6.1C1 5.91667 1.04583 5.74167 1.1375 5.575C1.22917 5.40833 1.36667 5.28333 1.55 5.2C2.31667 4.8 3.11667 4.5 3.95 4.3C4.78333 4.1 5.63333 4 6.5 4C7.46667 4 8.4125 4.125 9.3375 4.375C10.2625 4.625 11.15 5 12 5.5C12.85 5 13.7375 4.625 14.6625 4.375C15.5875 4.125 16.5333 4 17.5 4C18.3667 4 19.2167 4.1 20.05 4.3C20.8833 4.5 21.6833 4.8 22.45 5.2C22.6333 5.28333 22.7708 5.40833 22.8625 5.575C22.9542 5.74167 23 5.91667 23 6.1V18.15C23 18.5333 22.8375 18.825 22.5125 19.025C22.1875 19.225 21.85 19.2333 21.5 19.05C20.8833 18.7167 20.2375 18.4583 19.5625 18.275C18.8875 18.0917 18.2 18 17.5 18C16.5 18 15.5333 18.175 14.6 18.525C13.6667 18.875 12.8 19.3667 12 20Z" fill="#08121E" />
                    </svg>
                    <div className="ml-1 text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Términos y condiciones</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>

                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#08121E" />
                    </svg>
                    <div className="ml-1 text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Cerrar sesión</div>
                </div>
            </div>
        </div>
    )
}

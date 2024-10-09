import React from 'react'

export default function Profile() {
    return (
        <div className="min-h-screen bg-[#f6fafd] flex flex-col justify-start items-start">
            {/* Título de la página */}
            <div className="w-full py-4 px-4">
                <div className="text-[#08121e] text-2xl font-bold font-['Lato']">Perfil</div>
            </div>
            <div className='w-full px-5'>
                {/* Sección de menú completa */}
                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <div className="text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Información personal</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>

                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <div className="text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Preferencias</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>

                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <div className="text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Notificaciones</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>

                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <div className="text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Términos y condiciones</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>

                <div className="w-full py-4 border-b border-[#dddddd] flex items-center px-4">
                    <div className="w-6 h-6" />
                    <div className="text-[#08121e] text-base font-bold font-['Lato'] text-left flex-1">Cerrar sesión</div>
                    <div className="text-[#08121e] text-base font-bold">{'>'}</div>
                </div>
            </div>
        </div>
    )
}

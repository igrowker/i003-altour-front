import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface ModalProps {
  title?: string; // Título del modal
  content?: string; // Contenido del modal
  isOpen: boolean; // Control de apertura/cierre del modal
  onClose: () => void; // Función para cerrar el modal
}

export default function Modal({ title = "Título", content = "Contenido", isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md bg-white rounded-lg p-6">
          <DialogTitle as="h3" className="text-lg font-semibold text-gray-800">
            {title}
          </DialogTitle>
          <p className="mt-2 text-sm text-gray-600">{content}</p>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-transparent bg-[#FE2A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#e0244c] focus:outline-none focus:ring-2 focus:ring-[#FE2A5C] focus:ring-offset-2"
            >
              Cerrar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

// Hook personalizado para centralizar peticiones
export const useRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para realizar la petición
  const apiFetch = async ({
    url = `/`,
    method = "GET",
    data = {},
    params = {},
    headers = {},
    token = "",
    baseUrl = process.env.NEXT_PUBLIC_API_URL || "",
    sendFile = false,
    responseBuffer = false, 
  }: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "RPC";
    data?: any;
    params?: any;
    headers?: any;
    token?: string;
    baseUrl?: string;
    sendFile?: boolean;
    responseBuffer?: boolean;
  }) => {
    setLoading(true);
    setError(null);

    const fullUrl = `${baseUrl}${url}`;
    
    // Configuración de la petición
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        ...(token && { Authorization: `Bearer ${token.replace("Bearer ", "")}` }),
        ...(sendFile && { "Content-Type": "multipart/form-data" }),
      },
      params,  // Parámetros para GET
      responseType: responseBuffer ? "arraybuffer" : "json",
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    };

    try {
      let response;
      switch (method.toUpperCase()) {
        case "POST":
          response = await axios.post(fullUrl, data, config);
          break;
        case "PUT":
          response = await axios.put(fullUrl, data, config);
          break;
        case "DELETE":
          response = await axios.delete(fullUrl, { ...config, data });
          break;
        case "GET":
        default:
          response = await axios.get(fullUrl, config);
          break;
      }
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      setLoading(false);
      return { ok: false, message: err.message };
    }
  };

  return { apiFetch, loading, error };
};


//Notas 
//responseBuffer = para decidir como será tratada la respuesta del servidor.
//responseBuffer true: recibir la respuesta como un buffer binario (generalmente usado cuando esperas archivos binarios como imágenes o archivos).
//responseBuffer false: recibir la respuesta como un objeto JSON (generalmente usado cuando esperas datos en formato JSON).
//arraybuffer: esperas una respuesta binaria, puede ser cualquier tipo de archivo (como una imagen o archivo descargable).
//maxBodyLength y maxContentLength: ropias de Axios y sirven para limitar el tamaño máximo del cuerpo de una solicitud o respuesta.
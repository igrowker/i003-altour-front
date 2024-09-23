// lib/formValidation.ts

export interface ErrorState {
    password?: string;
  }
  
  export interface FormState {
    password: string;
  }
  
  export const validatePass = (formState: FormState): { valid: boolean; errors: ErrorState } => {
    let valid = true;
    let newErrors: ErrorState = {};
  
    // Validación de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;
    if (!passwordRegex.test(formState.password)) {
      newErrors.password = "La contraseña debe tener al menos 1 mayúscula, 1 minúscula, 1 número y mínimo 4 caracteres.";
      valid = false;
    }
  
    return { valid, errors: newErrors };
  };
  
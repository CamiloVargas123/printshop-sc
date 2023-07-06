import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido",
  }),
  password: z
    .string()
    .min(6, {
      message: "Contraseña debe tener al menos 6 caracteres",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])(?=.{6,})/, {
      message: "Contraseña debe tener al menos una mayúscula, un número y un caracter especial",
    }),
})

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
})

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Código de verificación tiene debe tener una longitud de 6 caracteres",
    })
    .max(6),
})
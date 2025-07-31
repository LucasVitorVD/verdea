import { z } from "zod";

export const plantFormSchema = z.object({
  name: z.string().min(2, "Nome da planta é obrigatório"),
  species: z.string().min(2, "Espécie é obrigatória"),
  location: z.string().min(2, "Localização é obrigatória"),
  notes: z.string().optional(),

  wateringFrequency: z.enum([
    "daily",
    "twice-daily",
    "every-other-day",
    "weekly",
  ], {
    required_error: "Selecione a frequência de irrigação",
  }),

  wateringTime: z
    .string()
    // .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Horário inválido")
    .optional(),

  idealSoilMoisture: z
    .number()
    .min(0, "Mínimo de 0%")
    .max(100, "Máximo de 100%"),

  device: z.string().min(1, "Selecione um dispositivo"),

  image: z
    .instanceof(File)
    .optional()
    .or(z.literal(null)),
});

export type PlantFormSchema = z.infer<typeof plantFormSchema>;

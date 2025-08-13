import { z } from "zod";

export const plantFormSchema = z.object({
  name: z.string().min(2, "Nome da planta é obrigatório"),
  species: z.string().min(2, "Espécie é obrigatória"),
  location: z.string().min(2, "Localização é obrigatória"),
  notes: z.string().optional(),

  wateringFrequency: z.enum(["once_a_day", "twice_a_day", "every_2_days", "weekly"], {
    required_error: "Selecione a frequência de irrigação",
  }),
  wateringTime: z
    .string()
    .min(1, "Horário de irrigação é obrigatório")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "Formato de hora inválido"),

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

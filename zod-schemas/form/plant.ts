import { z } from "zod";
import { timeStringToMinutes } from "@/lib/utils";

export const plantFormSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .or(z.literal(null)),
  name: z.string().min(2, "Nome da planta é obrigatório"),
  species: z.string().min(2, "Espécie é obrigatória"),
  location: z.string().min(2, "Localização é obrigatória"),
  notes: z.string().optional(),

  mode: z.enum(["AUTO", "SCHEDULED"], {
    required_error: "Selecione o tipo de irrigação",
  }),

  wateringFrequency: z.enum(["once_a_day", "twice_a_day", "every_2_days", "weekly"], {
    required_error: "Selecione a frequência de irrigação",
  }).optional(),

  wateringTimes: z
    .array(
      z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        "Formato de hora inválido"
      )
    )
    .optional(),

  idealSoilMoisture: z
    .number()
    .min(0, "Mínimo de 0%")
    .max(100, "Máximo de 100%")
    .optional(),
  device: z.string().min(1, "Selecione um dispositivo"),
})
  .superRefine((data, ctx) => {
    if (data.mode === "SCHEDULED") {
      if (!data.wateringFrequency) {
        ctx.addIssue({
          path: ["wateringFrequency"],
          code: z.ZodIssueCode.custom,
          message: "Selecione a frequência de irrigação",
        });
      }

      if (!data.wateringTimes || data.wateringTimes.length === 0) {
        ctx.addIssue({
          path: ["wateringTimes"],
          code: z.ZodIssueCode.custom,
          message: "Informe pelo menos um horário de irrigação",
        });
      }

      if (!data.idealSoilMoisture) {
        ctx.addIssue({
          path: ["idealSoilMoisture"],
          code: z.ZodIssueCode.custom,
          message: "Informe a umidade ideal do solo",
        });
      }

      if (data.wateringFrequency === "twice_a_day" && data.wateringTimes) {
        const first = timeStringToMinutes(data.wateringTimes[0]);
        const second = timeStringToMinutes(data.wateringTimes[1]);

        if (first === second) {
          ctx.addIssue({
            path: ["wateringTimes"],
            code: z.ZodIssueCode.custom,
            message: "Os horários de irrigação não podem ser iguais",
          });
        } else if (second < first) {
          ctx.addIssue({
            path: ["wateringTimes"],
            code: z.ZodIssueCode.custom,
            message: "O segundo horário deve ser após o primeiro",
          });
        }
      }
    }
  });

export type PlantFormSchema = z.infer<typeof plantFormSchema>;

import { z } from "zod";

export const TankTypes = [
  "HEAVY_TANK",
  "MEDIUM_TANK",
  "LIGHT_TANK",
  "SPG",
  "TANK_DESTROYER",
] as const;

export const createTakFormSchema = z.object({
  name: z.string(),
  nation: z.string(),
  type: z.enum(TankTypes),
  hitpoints: z.number().min(0).max(3500),
  numofcrew: z.number().min(1).max(7),
});

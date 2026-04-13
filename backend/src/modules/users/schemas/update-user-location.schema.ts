/**
 * User location update validation schema.
 */

import { z } from "zod";

export const updateUserLocationSchema = z.object({
  homeLatitude: z
    .number()
    .min(-90, "Latitude must be greater than or equal to -90")
    .max(90, "Latitude must be less than or equal to 90"),

  homeLongitude: z
    .number()
    .min(-180, "Longitude must be greater than or equal to -180")
    .max(180, "Longitude must be less than or equal to 180"),
});

export type UpdateUserLocationInput = z.infer<
  typeof updateUserLocationSchema
>;
/**
 * UpdateUserLocationDTO
 *
 * Represents the input required to update the authenticated user's
 * saved home coordinates.
 */
export interface UpdateUserLocationDTO {
  homeLatitude: number;
  homeLongitude: number;
}
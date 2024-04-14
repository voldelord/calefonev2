import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

export type GeoLocation = {lat: number; long: number};

const EARTH_RADIUS_IN_KM = 6371;

export function degreesToRadians(degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return radians;
}

export function calculateDistance(
  locationA: GeoLocation,
  locationB: GeoLocation,
): {kilometers: number; meters: number} {
  const distance =
    Math.acos(
      Math.sin(degreesToRadians(locationA.lat)) *
        Math.sin(degreesToRadians(locationB.lat)) +
        Math.cos(degreesToRadians(locationA.lat)) *
          Math.cos(degreesToRadians(locationB.lat)) *
          Math.cos(
            degreesToRadians(locationB.long) - degreesToRadians(locationA.long),
          ),
    ) * EARTH_RADIUS_IN_KM;

  return {
    kilometers: distance,
    meters: distance * 1000,
  };
}

export const getCurrentPosition = () =>
  new Promise<GeolocationResponse>((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    }),
  );

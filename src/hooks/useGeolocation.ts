
import { useState } from 'react';

interface UseGeolocationReturn {
  getCurrentLocation: () => Promise<{
    latitude: number;
    longitude: number;
    formatted: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = (): Promise<{
    latitude: number;
    longitude: number;
    formatted: string;
  }> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by your browser";
        setError(errorMsg);
        setIsLoading(false);
        reject(new Error(errorMsg));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setIsLoading(false);
          resolve({
            latitude,
            longitude,
            formatted: "Current location (detected)"
          });
        },
        (error) => {
          let errorMsg;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMsg = "Location permission denied";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information is unavailable";
              break;
            case error.TIMEOUT:
              errorMsg = "Location request timed out";
              break;
            default:
              errorMsg = "An unknown error occurred";
          }
          setError(errorMsg);
          setIsLoading(false);
          reject(new Error(errorMsg));
        },
        { enableHighAccuracy: true }
      );
    });
  };

  return {
    getCurrentLocation,
    isLoading,
    error
  };
};

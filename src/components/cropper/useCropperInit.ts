import { useEffect, useState } from "react";
import { loadCropperLibrary } from "./cropper-loader";

export function useCropperInit() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadCropperLibrary().then(() => {
      if (mounted) setIsLoaded(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return isLoaded;
}

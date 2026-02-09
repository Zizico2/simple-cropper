let loadPromise: Promise<void> | null = null;

export function loadCropperLibrary(): Promise<void> {
    // If we've already started loading, return the existing promise.
    // This handles the case where 5 components mount simultaneously.
    if (loadPromise) {
        return loadPromise;
    }

    // Otherwise, start the import
    loadPromise = import('cropperjs').then(() => {
        // Optional: Log or setup global configs here
    });

    return loadPromise;
}
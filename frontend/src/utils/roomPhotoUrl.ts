const backendOrigin =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export const roomPhotoUrl = (photoPath: string) =>
  new URL(photoPath, backendOrigin).href;
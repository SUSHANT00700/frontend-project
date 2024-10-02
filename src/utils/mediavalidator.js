const validateMediaUrl = async (url) => {
  try {
    new URL(url);
  } catch (e) {
    return{type:"Invalid URL",valid:false}
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");

    if (contentType.startsWith("image/")) {
      return { type: "image", valid: true };
    } else if (contentType.startsWith("video/")) {
      const videoBlob = await (await fetch(url)).blob();
      const video = document.createElement("video");
      video.src = URL.createObjectURL(videoBlob);
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          if (video.duration <= 15) {
            resolve({ type: "video", valid: true, duration: video.duration });
          } else {
            resolve({ type: "video", valid: false, duration: video.duration });
          }
        };
      });
    } else {
      return { type: "unknown", valid: false };
    }
  } catch (error) {
    throw new Error("Error validating URL: " + error.message);
  }
};


export { validateMediaUrl };

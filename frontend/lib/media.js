import { getStrapiURL } from "./api"

export function getStrapiMedia(media, debugInfo) {
  if (process.env.DEBUG_MODE) {
    console.log("getStrapiMedia", media, debugInfo)
  }

  const { url } = media.data.attributes
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}

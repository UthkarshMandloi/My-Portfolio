import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// Standard helper to construct Sanity image URLs dynamically
export const urlFor = (source: any) => {
  return builder.image(source)
}
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

// Standard helper to construct Sanity image URLs dynamically
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import profile from './profile'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, profile],
}
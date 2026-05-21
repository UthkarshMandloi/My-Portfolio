import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import profile from './profile'
import experience from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, profile, experience],
}
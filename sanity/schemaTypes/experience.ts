import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experiences',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    }),
    defineField({
      name: 'period',
      title: 'Employment Period',
      type: 'string',
      description: 'e.g. 2024 - Present or Jan 2025 - May 2026',
    }),
    defineField({
      name: 'description',
      title: 'Role Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'skills',
      title: 'Skills / Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'orderNumber',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first.',
      initialValue: 0,
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      description: 'Optional club/organization GitHub link',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Optional club/organization LinkedIn link',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Optional club/organization Instagram link',
    })
  ]
})


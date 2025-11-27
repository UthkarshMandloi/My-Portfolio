import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text', 
      rows: 3
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'link',
      title: 'Live Demo Link',
      type: 'url'
    }),
    defineField({
      name: 'github',
      title: 'GitHub Repo Link',
      type: 'url'
    })
  ]
})
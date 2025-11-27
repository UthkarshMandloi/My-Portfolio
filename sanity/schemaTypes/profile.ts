import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'e.g. Engineering Student & Developer',
      type: 'string',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'resume',
      title: 'Resume / CV (PDF)',
      type: 'file',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'github', type: 'url', title: 'GitHub URL'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn URL'},
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
        {name: 'twitter', type: 'url', title: 'X (Twitter) URL'},
      ]
    })
  ]
})
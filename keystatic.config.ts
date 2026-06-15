import { collection, config, fields, singleton } from '@keystatic/core';

const coverImage = {
	directory: 'public/uploads/covers',
	publicPath: '/uploads/covers/',
};

export default config({
	storage: {
		kind: 'local',
	},
	ui: {
		brand: { name: 'GitOps Blog' },
		navigation: {
			Content: ['posts', 'authors'],
			Settings: ['site'],
		},
	},
	collections: {
		posts: collection({
			label: 'Posts',
			path: 'src/content/posts/*',
			slugField: 'title',
			entryLayout: 'content',
			format: { contentField: 'body' },
			previewUrl: '/blog/{slug}',
			columns: ['title', 'pubDate', 'category', 'draft', 'featured'],
			schema: {
				title: fields.slug({
					name: {
						label: 'Title',
						validation: { isRequired: true },
					},
					slug: {
						label: 'Slug',
						validation: {
							pattern: {
								regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
								message: 'Use lowercase letters, numbers, and hyphens.',
							},
						},
					},
				}),
				description: fields.text({
					label: 'Description',
					multiline: true,
					validation: { isRequired: true },
				}),
				pubDate: fields.date({
					label: 'Published date',
					defaultValue: { kind: 'today' },
					validation: { isRequired: true },
				}),
				updatedDate: fields.date({
					label: 'Updated date',
					defaultValue: { kind: 'today' },
				}),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: (props) => props.value || 'Tag',
				}),
				category: fields.text({
					label: 'Category',
					defaultValue: '云原生',
					validation: { isRequired: true },
				}),
				cover: fields.image({
					label: 'Cover image',
					...coverImage,
				}),
				draft: fields.checkbox({
					label: 'Draft',
					defaultValue: false,
				}),
				featured: fields.checkbox({
					label: 'Featured',
					defaultValue: false,
				}),
				body: fields.mdx({
					label: 'Body',
					options: {
						image: {
							directory: 'public/uploads/posts',
							publicPath: '/uploads/posts/',
						},
					},
				}),
			},
		}),
		authors: collection({
			label: 'Authors',
			path: 'src/content/authors/*',
			slugField: 'name',
			format: { data: 'yaml' },
			columns: ['name'],
			schema: {
				name: fields.slug({
					name: {
						label: 'Name',
						validation: { isRequired: true },
					},
				}),
				avatar: fields.image({
					label: 'Avatar',
					directory: 'public/uploads/authors',
					publicPath: '/uploads/authors/',
				}),
				bio: fields.text({
					label: 'Bio',
					multiline: true,
				}),
			},
		}),
	},
	singletons: {
		site: singleton({
			label: 'Site Settings',
			path: 'src/content/settings/site',
			format: { data: 'yaml' },
			schema: {
				siteName: fields.text({
					label: 'Site name',
					defaultValue: 'GitOps Blog',
					validation: { isRequired: true },
				}),
				description: fields.text({
					label: 'Description',
					multiline: true,
					validation: { isRequired: true },
				}),
				navigation: fields.array(
					fields.object({
						label: fields.text({
							label: 'Label',
							validation: { isRequired: true },
						}),
						href: fields.text({
							label: 'Href',
							defaultValue: '/',
							validation: { isRequired: true },
						}),
					}),
					{
						label: 'Navigation',
						itemLabel: (props) => props.fields.label.value || 'Navigation item',
					},
				),
				socialLinks: fields.array(
					fields.object({
						label: fields.text({
							label: 'Label',
							validation: { isRequired: true },
						}),
						url: fields.url({
							label: 'URL',
							validation: { isRequired: true },
						}),
					}),
					{
						label: 'Social links',
						itemLabel: (props) => props.fields.label.value || 'Social link',
					},
				),
			},
		}),
	},
});

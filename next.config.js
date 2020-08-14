const data = require('./utils/projectsData')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

module.exports = {
	env: {
		API: IS_DEVELOPMENT ? 'http://localhost:7071/api' : 'api',
	},
	exportTrailSlash: true,
	exportPathMap: async function () {
		const { projects } = data

		const paths = {
			'/': { page: '/' },
		}

		projects.forEach((project) => {
			paths[`/project/${project.slug}`] = {
				page: '/project/[path]',
				query: {
					path: project.slug,
				},
			}
		})

		return paths
	},
}

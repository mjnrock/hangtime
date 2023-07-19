module.exports = {
	purge: {
		content: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
		options: {
			safelist: [
				// standard color classes
				/^(bg|text)-[a-z]+-\d{2,3}$/,
				/^(bg|text)-[a-z]+-\d{2,3}-dark$/,
				/^(bg|text)-[a-z]+-\d{2,3}-light$/,

				// hover color classes
				/^hover:(bg|text)-[a-z]+-\d{2,3}$/,
				/^hover:(bg|text)-[a-z]+-\d{2,3}-dark$/,
				/^hover:(bg|text)-[a-z]+-\d{2,3}-light$/,

				// active color classes
				/^active:(bg|text)-[a-z]+-\d{2,3}$/,
				/^active:(bg|text)-[a-z]+-\d{2,3}-dark$/,
				/^active:(bg|text)-[a-z]+-\d{2,3}-light$/,
			],
		},
	},
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
};

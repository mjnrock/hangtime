module.exports = {
	content: [ "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html" ],
	safelist: [
		{
			pattern: /^(bg|text)-(gray|red|yellow|green|blue|indigo|purple|pink|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
			variants: [ "hover", "focus", "active" ],
		},
	],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
};
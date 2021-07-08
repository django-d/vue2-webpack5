function exec(begin, step, end, action) {
	for (let i = begin; i <= end; i += step) {
		action(i);
	}
}

function pxAction(begin, step, end) {
	const res = {};
	exec(begin, step, end, function (i) {
		res[i] = i + 'px';
	});
	return res;
}

function numberAction(begin, step, end) {
	const res = {};
	exec(begin, step, end, function (i) {
		res[i] = i.toString();
	});
	return res;
}

function boxShadow(begin, step, end) {
	const res = {};
	exec(begin, step, end, function (i) {
		res[i] =
			'0 ' +
			(i + 1) +
			'px 1px 0px rgba(0, 0, 0, 0.2), 0 ' +
			i +
			'px 0px 0 rgba(0, 0, 0, 0.14), 0 1px ' +
			(1 + i * 2) +
			'px 0 rgba(0, 0, 0, 0.12) !important';
	});
	return res;
}

module.exports = {
	purge: {
		enabled: process.env.NODE_ENV !== 'development' ? true : false,
		content: [
			'./src/**/*.html',
			'./src/**/*.vue',
			'./src/**/*.jsx',
			'./src/**/*.ts',
		],
	},

	darkMode: false, // or 'media' or 'class'
	corePlugins: {
		color: false,
		screens: false,
	},
	theme: {
		screens: {},
		spacing: pxAction(0, 2, 100),
		colors: {
			black: '#000',
			white: '#fff',

			primary: { DEFAULT: '#3D7FFF', light: '#3D6BFF' },
			success: { DEFAULT: '#11c048', light: '#e0ffea' },
			warning: { DEFAULT: '#fd9312', light: '#fff6eb' },
			danger: { DEFAULT: '#ff3d61', light: '#ffdbe2' },
		},
		borderColor: { DEFAULT: '#E2E5E9' },
		borderRadius: Object.assign(pxAction(0, 2, 8), {
			DEFAULT: '4px',
			full: '9999px',
		}),
		borderWidth: { DEFAULT: '1px' },
		boxShadow: Object.assign(boxShadow(0, 1, 24), {
			none: 'none',
		}),
		fontSize: Object.assign(pxAction(10, 2, 50), {
			0: '0px',
		}),
		fontWeight: Object.assign(numberAction(100, 100, 700), {
			bold: 'bold',
			normal: 'normal',
		}),
		height: Object.assign(pxAction(0, 100, 700), pxAction(12, 2, 98), {
			auto: 'auto',
			full: '100%',
			screen: '100vh',
		}),
		lineHeight: pxAction(12, 2, 100),
		textColor: (theme) =>
			Object.assign(theme('colors'), {
				main: '#101217',
				secondary: '#515151',
				muted: '#BFBFBF',
				note: '#BFBFBF',
			}),
		width: Object.assign(pxAction(0, 100, 700), {
			auto: 'auto',
			full: '100%',
			screen: '100vw',
		}),
	},
	variants: ['important'],
	plugins: [addImportantVariant],
};

// important 变体
function addImportantVariant({ addVariant }) {
	addVariant('important', ({ container }) => {
		container.walkRules((rule) => {
			rule.selector = `.${rule.selector.slice(1)}\\!`;
			rule.walkDecls((decl) => {
				decl.important = true;
			});
		});
	});
}

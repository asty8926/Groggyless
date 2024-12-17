/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				night: {
					50: '#F3F4F6',
					100: '#E5E7EB',
					200: '#1a1f2e',
					300: '#161b27',
					400: '#111827',
					500: '#0d131f',
					600: '#090f18',
					700: '#060b12',
					800: '#030609',
					900: '#010203'
				},
				moon: {
					50: '#fefce8',
					100: '#fef9c3',
					200: '#fef08a',
					300: '#fde047',
					400: '#facc15'
				}
			},
			animation: {
				'twinkle': 'twinkle 1.5s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite'
			},
			keyframes: {
				twinkle: {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.3 }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
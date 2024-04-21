const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

// Add opacity
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}) / ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          sand: withOpacity('--color-sand'),
          error: withOpacity('--color-error'),
        },
      },
    },
  },
  plugins: [],
}

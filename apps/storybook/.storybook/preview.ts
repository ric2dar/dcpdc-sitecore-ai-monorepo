import type { Preview } from '@storybook/react-vite'
import "@repo/ui/globals.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "414px", height: "896px" } },
        tablet: { name: "Tablet", styles: { width: "1024px", height: "1366px" } },
      },
    },
  },
};

export default preview;
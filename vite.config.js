import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to find all index.html files in src/widgets
function getWidgetInputs() {
  const widgetsDir = resolve(__dirname, 'src/widgets');
  const inputs = {};
  
  if (fs.existsSync(widgetsDir)) {
    const widgets = fs.readdirSync(widgetsDir);
    widgets.forEach(widget => {
      const widgetPath = resolve(widgetsDir, widget, 'index.html');
      if (fs.existsSync(widgetPath)) {
        inputs[widget] = widgetPath;
      }
    });
  }
  return inputs;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...getWidgetInputs()
      }
    }
  }
});

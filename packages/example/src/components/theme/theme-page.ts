import m from 'mithril';
import { ThemeSwitcher, ThemeToggle, FileUpload, CodeBlock, Button } from 'mithril-materialized';

export const ThemePage = () => {
  const state = {
    uploadedFiles: [] as File[],
    currentTheme: 'auto',
  };

  return {
    view: () =>
      m('.col.s12', [
        m('h2.header', 'Theme & File Upload'),
        m('p', [
          'New components for theme switching and file uploads with drag-and-drop support. ',
          'The theme switcher allows users to choose between light, dark, and auto (system preference) themes.',
        ]),

        m('h3.header', 'Theme Switcher'),
        m('p', 'Full theme switcher with light/dark/auto options:'),
        m('.row', [
          m('.col.s12.m6', [
            m(ThemeSwitcher, {
              theme: state.currentTheme as any,
              showLabels: true,
              onThemeChange: (theme) => {
                state.currentTheme = theme;
                console.log('Theme changed to:', theme);
              },
            }),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { ThemeSwitcher } from 'mithril-materialized';

m(ThemeSwitcher, {
  theme: 'auto', // 'light' | 'dark' | 'auto'
  showLabels: true,
  onThemeChange: (theme) => {
    console.log('Theme changed to:', theme);
  },
})`,
        }),

        m('h3.header', 'Theme Toggle'),
        m('p', 'Simple toggle button that switches between light and dark themes:'),
        m('.row', [
          m('.col.s12.m6', [
            m('p', 'Theme toggle button: '),
            m(ThemeToggle, {
              className: 'left',
            }),
            m('.clearfix', { style: 'clear: both; height: 20px;' }),
          ]),
        ]),
        m(CodeBlock, {
          code: `import { ThemeToggle } from 'mithril-materialized';

m(ThemeToggle, {
  className: 'left', // Optional CSS classes
})`,
        }),

        m('h3.header', 'File Upload'),
        m('p', 'Drag-and-drop file upload with image preview, file validation, and progress tracking:'),
        m('.row', [
          m('.col.s12', [
            m(FileUpload, {
              accept: 'image/*,.pdf,.doc,.docx',
              multiple: true,
              maxSize: 5 * 1024 * 1024, // 5MB
              maxFiles: 3,
              showPreview: true,
              label: 'Drag files here or click to browse',
              helperText: 'Upload up to 3 files (images, PDFs, or documents)',
              onFilesSelected: (files) => {
                state.uploadedFiles = files;
                console.log('Files selected:', files);
              },
              onFileRemoved: (file) => {
                console.log('File removed:', file.name);
              },
            }),
          ]),
        ]),
        
        state.uploadedFiles.length > 0 && m('.row', [
          m('.col.s12', [
            m('h5', 'Uploaded Files:'),
            m('ul.collection', 
              state.uploadedFiles.map(file => 
                m('li.collection-item', [
                  m('span.title', file.name),
                  m('p', [
                    'Size: ', (file.size / 1024).toFixed(1), ' KB',
                    file.type && m('br'),
                    file.type && ['Type: ', file.type],
                  ]),
                ])
              )
            ),
          ]),
        ]),

        m(CodeBlock, {
          code: `import { FileUpload } from 'mithril-materialized';

m(FileUpload, {
  accept: 'image/*,.pdf,.doc,.docx', // Accepted file types
  multiple: true,                    // Allow multiple files
  maxSize: 5 * 1024 * 1024,         // 5MB max size
  maxFiles: 3,                      // Max 3 files
  showPreview: true,                // Show image previews
  label: 'Drag files here or click to browse',
  helperText: 'Upload up to 3 files (images, PDFs, or documents)',
  
  // Callbacks
  onFilesSelected: (files) => {
    console.log('Files selected:', files);
  },
  onFileRemoved: (file) => {
    console.log('File removed:', file.name);
  },
  onProgress: (progress, file) => {
    console.log(\`Upload progress: \${progress}% for \${file.name}\`);
  },
})`,
        }),

        m('h3.header', 'Features'),
        m('ul.collection', [
          m('li.collection-item', [
            m('strong', 'Theme System'),
            m('ul', [
              m('li', 'CSS custom properties for runtime theme switching'),
              m('li', 'Light, dark, and auto (system preference) themes'),
              m('li', 'localStorage persistence of theme choice'),
              m('li', 'Programmatic theme control via ThemeManager class'),
            ]),
          ]),
          m('li.collection-item', [
            m('strong', 'File Upload'),
            m('ul', [
              m('li', 'Drag-and-drop file handling with visual feedback'),
              m('li', 'File type and size validation'),
              m('li', 'Image preview generation'),
              m('li', 'Progress tracking and error handling'),
              m('li', 'Multiple file support with configurable limits'),
              m('li', 'Responsive design'),
            ]),
          ]),
        ]),

        m('h3.header', 'CSS Custom Properties'),
        m('p', 'The theme system uses CSS custom properties that can be customized:'),
        m(CodeBlock, {
          code: `:root {
  --mm-primary-color: #26a69a;
  --mm-background-color: #ffffff;
  --mm-text-primary: rgba(0, 0, 0, 0.87);
  --mm-border-color: rgba(0, 0, 0, 0.12);
  /* ... and many more */
}

[data-theme="dark"] {
  --mm-primary-color: #80cbc4;
  --mm-background-color: #121212;
  --mm-text-primary: rgba(255, 255, 255, 0.87);
  --mm-border-color: rgba(255, 255, 255, 0.12);
  /* ... dark theme overrides */
}`,
        }),
      ]),
  };
};
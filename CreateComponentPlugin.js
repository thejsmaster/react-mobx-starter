export default function createComponentPlugin(options = {}) {
  const { include = /\.tsx$/ } = options;

  return {
    name: 'create-component-plugin',
    enforce: 'pre',
    async transform(code, id) {
      if (
        id.endsWith('.tsx') &&
        !id.includes('node_modules') &&
        include.test(id) &&
        !id.endsWith('main.tsx') &&
        !id.endsWith('CreateComponent.tsx') &&
        !id.endsWith('ErrorBoundary.tsx') &&
        !id.endsWith('Router.tsx')
      ) {
        console.log('vite plugin', id);
        if (!code.match(/^import CreateComponent from/m) || !code.match(/CreateComponent\(/m)) {
          console.log('error hit');
          throw new Error(`File "${id}" must export a  Component created using CreateComponent`);
        }
      }
      return null;
    },
  };
}

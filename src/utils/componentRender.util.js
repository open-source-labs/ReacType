const componentRender = (component, data) => {
  const {
    stateful,
    id,
    position,
    childrenArray,
    title,
    props,
  } = component;

  if (stateful) {
    return `
      import React, { Component } from 'react';
      import PropTypes from 'prop-types';
      ${childrenArray.map(child => `import ${child.componentName} from './${child.componentName}.tsx'`).join('\n')}
      
      class ${title} extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      render() {
        const { ${props.map(p => `${p.key}`).join(', ')} } = this.props;
        return (
          <div>
          ${childrenArray.map(child => `<${child.componentName}/>`).join('\n')}
          </div>
        )
        }
      }

      ${title}.propTypes = {
        ${props.map(p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`).join('\n')}
      }

      export default ${title};
    `;
  }

  return `
    import React from 'react';
    import PropTypes from 'prop-types';
    ${childrenArray.map(child => `import ${child.componentName} from './${child.componentName}.tsx'`).join('\n')}
    

    type Props = {
      
    }
    const ${title} = props => (
      <div>
        ${childrenArray.map(child => `<${child.componentName}/>`).join('\n')}
      </div>
    );

    ${title}.propTypes = {
      ${props.map(p => `${p.key}: PropTypes.${p.type}${p.required ? '.isRequired' : ''},`).join('\n')}
    }

    export default ${title};
  `;
};

export default componentRender;

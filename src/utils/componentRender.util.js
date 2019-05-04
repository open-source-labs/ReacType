const componentRender = (component, data) => {
  const { stateful, id, position, childrenArray, title, props } = component;

  function typeSwitcher(type) {
    switch (type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'object':
        return 'object';
      case 'array':
        return 'any[]';
      case 'bool':
        return 'boolean';
      case 'function':
        return '() => any';
      // case 'symbol':
      //   return 'string';
      case 'node':
        return 'string';
      case 'element':
        return 'string';
      case 'tuple':
        return '[any]';
      case 'enum':
        return '{}';
      case 'any':
        return 'any';
      default:
        return 'any';
    }
  }

  function propDrillTextGenerator(child) {
    if (child.childType === 'COMP') {
      return data
        .find(c => c.id === child.childComponentId)
        .props.map(prop => `${prop.key}={${prop.value}}`)
        .join(' ');
    }
    return '';
  }

  // need to filter with reduce the import, copy from below
  if (stateful) {
    return `
      import React, { Component } from 'react';
      ${childrenArray
        .filter(child => child.childType !== 'HTML')
        .map(child => `import ${child.componentName} from './${child.componentName}.tsx'`)
        .reduce((acc, child) => {
          if (!acc.includes(child)) {
            acc.push(child);
            return acc;
          }
          return acc;
        }, [])
        .join('\n')}
      
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

      export default ${title};
    `;
  }
  return `
    import React from 'react';
    ${childrenArray
      .filter(child => child.childType !== 'HTML')
      .map(child => `import ${child.componentName} from './${child.componentName}.tsx'`)
      .reduce((acc, child) => {
        if (!acc.includes(child)) {
          acc.push(child);
          return acc;
        }
        return acc;
      }, [])
      .join('\n')}
    
    type Props = {
      ${props.map(prop => `${prop.key}: ${prop.type}`).join('\n')}
    }

    const ${title} = (props: Props) => {
      const {${props.map(el => el.key).join(',\n')}} = props
      
      return (
        <div>
          ${childrenArray.map(child => `<${child.componentName} ${propDrillTextGenerator(child)}/>`).join('\n')}
        </div>
      );
    }
    export default ${title};
  `;
};

export default componentRender;

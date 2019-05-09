import { ComponentInt, ChildInt, ChildrenInt, PropInt } from "./Interfaces";

const componentRender = (component: ComponentInt, data: any) => {
  const {
    // stateful,
    // id,
    // position,
    childrenArray,
    title,
    props
  }: {
    childrenArray: ChildrenInt;
    title: string;
    props: PropInt[];
  } = component;

  function typeSwitcher(type: string) {
    switch (type) {
      case "string":
        return "string";
      case "number":
        return "number";
      case "object":
        return "object";
      case "array":
        return "any[]";
      case "bool":
        return "boolean";
      case "function":
        return "() => any";
      // case 'symbol':
      //   return 'string';
      case "node":
        return "string";
      case "element":
        return "string";
      case "tuple":
        return "[any]";
      case "enum":
        return "{}";
      case "any":
        return "any";
      default:
        return "any";
    }
  }

  function propDrillTextGenerator(child: ChildInt) {
    if (child.childType === "COMP") {
      return data
        .find((c: any) => c.id === child.childComponentId)
        .props.map((prop: PropInt) => `${prop.key}={${prop.value}}`)
        .join(" ");
    }
    return "";
  }

  function componentNameGenerator(child: ChildInt) {
    if (child.childType === "HTML") {
      switch (child.componentName) {
        case "Image":
          return "img";
        case "Form":
          return "form";
        case "Button":
          return "button";
        case "Link":
          return 'a href=""';
        case "List":
          return "ul";
        case "Paragraph":
          return "p";
        default:
          return "div";
      }
    } else {
      return child.componentName;
    }
  }

  // need to filter with reduce the import, copy from below
  // if (stateful) {
  //   return `
  //     import React, { Component } from 'react';
  //     ${childrenArray
  //       .filter(child => child.childType !== "HTML")
  //       .map(
  //         child =>
  //           `import ${child.componentName} from './${child.componentName}.tsx'`
  //       )
  //       .reduce((acc: Array<string>, child) => {
  //         if (!acc.includes(child)) {
  //           acc.push(child);
  //           return acc;
  //         }
  //         return acc;
  //       }, [])
  //       .join("\n")}

  //     class ${title} extends Component {
  //     constructor(props) {
  //       super(props);
  //       this.state = {};
  //     }
  //     render() {
  //       const { ${props.map(p => `${p.key}`).join(", ")} } = this.props;
  //       return (
  //         <div>
  //         ${childrenArray.map(child => `<${child.componentName}/>`).join("\n")}
  //         </div>
  //       )
  //       }
  //     }

  //     export default ${title};
  //   `;
  // }

  return `
    import React from 'react';
    ${childrenArray
      .filter(child => child.childType !== "HTML")
      .map(
        child =>
          `import ${child.componentName} from './${child.componentName}.tsx'`
      )
      .reduce((acc: Array<string>, child) => {
        if (!acc.includes(child)) {
          acc.push(child);
          return acc;
        }
        return acc;
      }, [])
      .join("\n")}
    
    type Props = {
      ${props.map(prop => `${prop.key}: ${typeSwitcher(prop.type)}`).join("\n")}
    }

    const ${title} = (props: Props) => {
      const {${props.map(el => el.key).join(",\n")}} = props
      
      return (
        <div>
          ${childrenArray
            .map(
              child =>
                `<${componentNameGenerator(child)} ${propDrillTextGenerator(
                  child
                )}/>`
            )
            .join("\n")}
        </div>
      );
    }
    export default ${title};
  `;
};

export default componentRender;

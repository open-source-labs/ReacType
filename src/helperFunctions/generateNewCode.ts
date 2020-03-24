import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';
import { ComponentInt, ComponentsInt } from '../interfaces/Interfaces'

export const generateNewCode = (comp: ComponentInt, components: ComponentsInt) => {
    const code = format(componentRender(comp, components), {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'typescript'
    });
    return code;
  };
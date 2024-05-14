import { format } from 'prettier';

// format code using prettier
// this format function is used in the render process to format the code in the code preview
// the format function is defined in the main process because it needs to access node functionality ('fs')
const formatCode = (code: string): string => {
  return format(code, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'typescript'
  });
};

export default formatCode;

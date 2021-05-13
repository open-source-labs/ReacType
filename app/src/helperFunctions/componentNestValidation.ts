
// This function is used in both DirectChildHTMLNestable and SeparatorChild to ensure that user created components do not nest within themselves.
// To allow such nesting would be a certain paradox and locks the application.
// This check is done right after the drag functionality resolves and releases. Nothing is done if a component is found trying to nest within itself.
const componentNest = (children: object, nestId: Number) => {
  console.log('Made it to this point')
  let notNested = true;
  for (const element of children) {
    if (element.childId === nestId) return false;
    else if (element.children.length > 0) notNested = componentNest(element.children, nestId);
  }
  return notNested
}

export default componentNest;
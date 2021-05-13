const componentNest = (children: any, nestId: Number) => {
  let notNested = true;
  for (const element of children) {
    if (element.childId === nestId) return false;
    else if (element.children.length > 0) notNested = componentNest(element.children, nestId);
  }
  return notNested
}

export default componentNest;
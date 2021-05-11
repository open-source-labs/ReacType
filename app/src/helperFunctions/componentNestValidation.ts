const componentNest = (children: any, nestId: Number) => {
  console.log('Made it to this point')
  let notNested = true;
  for (const element of children) {
    if (element.childId === nestId) return false;
    else if (element.children.length > 0) notNested = componentNest(element.children, nestId);
  }
  return notNested
}

export default componentNest;
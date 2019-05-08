// our "database" of HTML elements that the user can chose from
interface htmlElementInt {
  width: number;
  height: number;
  attributes: Array<string>;
}

interface htmlElementsInt {
  [key: string]: htmlElementInt;
}

const HTMLelements: htmlElementsInt = {
  Image: {
    width: 100,
    height: 100,
    attributes: ["ClassName", "id", "Src"]
  },
  Button: {
    width: 75,
    height: 28,
    attributes: ["ClassName", "id", "Text"]
  },
  Form: {
    width: 150,
    height: 150,
    attributes: ["ClassName", "id", "Text"]
  },
  Paragraph: {
    width: 250,
    height: 75,
    attributes: ["ClassName", "id", "Text"]
  },
  List: {
    width: 75,
    height: 75,
    attributes: ["ClassName", "id", "Text"]
  },
  Link: {
    width: 50,
    height: 50,
    attributes: ["ClassName", "id", "Text"]
  }
};

function getSize(htmlElement: string): object {
  const localHTMLelements = HTMLelements;

  if (!(htmlElement in localHTMLelements)) {
    window.alert(
      `htmlElement error: "${htmlElement} is not found in our database"`
    );
    return;
  }

  return {
    width: HTMLelements[htmlElement].width || 300,
    height: HTMLelements[htmlElement].height || 300
  };
}

export { HTMLelements, getSize };

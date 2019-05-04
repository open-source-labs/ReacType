// our "database" of HTML elements that the user can chose from
const HTMLelements = {
  Image: {
    width: 100,
    height: 100,
    attributes: ["ClassName", "id", "Text", "Src"]
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

const attributes = {
  Classname: { type: "freeText" },
  Id: { type: "freeText" },
  TextJustify: { type: "select", values: "Left,Right,Center" }
};

function getSize(htmlElement) {
  const localHTMLelements = HTMLelements;

  if (!htmlElement in localHTMLelements) {
    window.alert(
      `htmlElement error:  "${htmlElement} is not found in our database"`
    );
    return;
  }

  return {
    width: HTMLelements[htmlElement].width || 300,
    height: HTMLelements[htmlElement].height || 300
  };
}

export { HTMLelements, getSize };

export interface NewComponentInstance {
  id: Number;
  newInstance: Boolean;
  type: String;
}

export interface ComponentInstance {
  id: Number;
  styling: Object;
  children: ComponentInstance[];
}

export interface Context {
  components: Object[];
  pages: PageInstanceTree[];
}

export interface PageInstanceTree {
  pageId: Number;
  children: ComponentInstance[];
}

export interface ComponentBlueprint {
  id: Number;
  category: String;
  name: String;
}

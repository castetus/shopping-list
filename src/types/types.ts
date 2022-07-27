export interface ListItem {
  id: number,
  name: string,
}

export interface List {
  id: number,
  name: string,
  items: Array<ListItem>
}

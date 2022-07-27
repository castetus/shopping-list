export interface ListItem {
  text: string,
  qty: number | null,
}

export interface List {
  id: number,
  name: string,
  items: Array<ListItem>
}

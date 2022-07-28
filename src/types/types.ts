export interface ListItem {
  id: number,
  text: string,
  qty: number | null,
  checked: boolean
}

export interface List {
  id: number,
  name: string,
  items: Array<ListItem>
}

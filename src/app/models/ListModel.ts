export interface ListModel {
  id: number;
  name: string;
  childLists?: ListModel[];
}

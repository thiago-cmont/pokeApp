export interface TypesObjectInterface {
  types: [TypesInterface];
}
export interface TypesInterface {
  slot: number;
  type: SingleTypeinterface;
}
export interface SingleTypeinterface {
  name: string;
  url: string;
}

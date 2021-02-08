export interface Action {
  type: string;
  payload: any;
}

export interface ActionCreator {
  (...param: any): { type: string; payload: any };
}

import {Point} from "./point";

export interface SeaRoute{
  id: number,
  formPort: string,
  toPort: string,
  legDuration: number,
  points: Point[]
}


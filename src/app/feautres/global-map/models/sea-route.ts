import {Point} from "./point";

export interface SeaRoute{
  id: number,
  fromPort: string,
  toPort: string,
  legDuration: number,
  points: Point[]
}


import { Decision } from "./decision.enum";
import { Result } from "./result.enum";

export interface IResultResponse {
  playerDecision: Decision;
  cpuDecision: Decision;
  result: Result;
}

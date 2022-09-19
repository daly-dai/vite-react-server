import { User } from "/src/models/User/index";
import type { chain } from 'lodash'

export interface Data {
  chain: chain;
  User: User[]
}
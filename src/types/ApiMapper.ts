import { MesanResponse } from "@/api/smhi/mesan/types";

export interface ApiMapper<T = unknown> {
  map(raw: T): MesanResponse;
}

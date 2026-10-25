import { MesanResponse } from "@/api/weather/providers/smhi/mesan/types";

export interface ApiMapper<T = unknown> {
  map(raw: T): MesanResponse;
}

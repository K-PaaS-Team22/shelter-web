import { useQuery } from "@tanstack/react-query";
import type { RoutePathParams, RoutePathResponse } from "../types/route";
import axios from "axios";
import { buildApiUrl } from "@/common/utils/url";

export function useRoutePath(params: RoutePathParams | null | undefined) {
  const isParamsPresent = !!params;

  const { startLat, startLot, goalLat, goalLot } = params ?? {
    startLat: 0,
    startLot: 0,
    goalLat: 0,
    goalLot: 0
  };

  const areCoordinatesValid =
    startLat !== 0 &&
    startLot !== 0 &&
    goalLat !== 0 &&
    goalLot !== 0 &&
    !isNaN(startLat) &&
    !isNaN(startLot) &&
    !isNaN(goalLat) &&
    !isNaN(goalLot);

  const finalEnabled = isParamsPresent && areCoordinatesValid;

  return useQuery<RoutePathResponse, Error>({
    queryKey: ["routePath", startLat, startLot, goalLat, goalLot],

    queryFn: async () => {
      const query = new URLSearchParams({
        startLat: startLat.toString(),
        startLot: startLot.toString(),
        goalLat: goalLat.toString(),
        goalLot: goalLot.toString()
      });

      const queryString = query.toString();
      const path = `/route/path?${queryString}`;

      let url: string;

      if (import.meta.env.DEV) {
        url = path;
        console.log("개발 환경으로 실행됨");
      } else {
        const apiBase = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_PROXY_TARGET;
        url = buildApiUrl(apiBase, path);
        console.log("배포 환경으로 실행됨");
      }

      const res = await axios.get(url, {
        withCredentials: true
      });

      return res.data as RoutePathResponse;
    },

    enabled: finalEnabled
  });
}

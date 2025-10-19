import styles from "./RouteButton.module.css";
import { useRouteButtonInteraction } from "../hooks/useRouteButtonInteraction";
import type { RoutePathResponse } from "../types/route";

type RouteButtonProps = {
  routeData: RoutePathResponse | null;
};

export function RouteButton({ routeData }: RouteButtonProps) {
  const { handleRouteClick } = useRouteButtonInteraction(routeData);

  return (
    <button
      type="button"
      className={styles.routeButton}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        handleRouteClick();
      }}
    >
      <span className={styles.text}>경로</span>
    </button>
  );
}
export default RouteButton;

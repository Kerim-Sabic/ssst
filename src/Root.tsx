import App from "./App";
import { PitchDeck } from "@/components/pitch/PitchDeck";
import { usePathname } from "@/lib/router";

/** Top-level route switch between the live demo app and the pitch deck. */
export default function Root() {
  const path = usePathname();
  if (path.replace(/\/$/, "") === "/pitchdeck") return <PitchDeck />;
  return <App />;
}

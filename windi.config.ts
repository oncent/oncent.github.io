import { defineConfig } from "windicss/helpers";
import WindiIcon from "@windicss/plugin-icons";
import AspectRatio from "windicss/plugin/aspect-ratio";
import scrollSnapPlugin from "windicss/plugin/scroll-snap";

export default defineConfig({
  plugins: [WindiIcon, AspectRatio, scrollSnapPlugin],
});

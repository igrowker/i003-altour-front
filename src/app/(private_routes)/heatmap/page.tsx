import Heatmap from "@/app/components/Heatmap/Heatmap";

export default function HeatmapPage() {
  return (
    <main>
      <Heatmap
        searchAndCard={true}
        containerStyle={{ width: "100%", height: "100svh" }}
      />
    </main>
  );
}

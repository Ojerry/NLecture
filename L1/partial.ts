interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  publishedAt: Date;
}

// Partial makes every field optional.
// We require the ID, but the rest of the payload is whatever changed.
function updatePost(id: string, changes: Partial<BlogPost>) {
  api.patch(`/posts/${id}`, changes);
}

updatePost("post-123", { title: "New Title" }); // Completely valid

//////....////////

interface ChartConfig {
  theme: "light" | "dark";
  showLegend: boolean;
  animate: boolean;
  width: number;
  height: number;
}

const defaultConfig: ChartConfig = {
  theme: "light",
  showLegend: true,
  animate: true,
  width: 800,
  height: 600,
};

// The user only needs to provide the fields they want to change
function renderChart(userConfig: Partial<ChartConfig>) {
  const finalConfig = { ...defaultConfig, ...userConfig };
  // render...
}

renderChart({ theme: "dark" }); // Merges perfectly with defaults

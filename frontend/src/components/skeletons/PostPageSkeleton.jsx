export default function PostPageSkeleton({ isDark }) {
  const skeletonBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const dotBg = isDark ? "#404040" : "#d4d4d4";

  return (
    <article className="max-w-none animate-pulse" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      <header className="mb-12">
        <div className="h-12 rounded-lg w-4/5 mb-6" style={{ backgroundColor: skeletonBg }}></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-4 rounded-md w-32" style={{ backgroundColor: skeletonBg }}></div>
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: dotBg }}></div>
          <div className="h-4 rounded-md w-40" style={{ backgroundColor: skeletonBg }}></div>
        </div>
      </header>
      <div className="mb-12 h-[350px] md:h-[450px] rounded-3xl" style={{ backgroundColor: skeletonBg }}></div>
      <div className="space-y-4">
        <div className="h-4 rounded-md w-full" style={{ backgroundColor: skeletonBg }}></div>
        <div className="h-4 rounded-md w-full" style={{ backgroundColor: skeletonBg }}></div>
        <div className="h-4 rounded-md w-3/4" style={{ backgroundColor: skeletonBg }}></div>
        <div className="h-4 rounded-md w-full" style={{ backgroundColor: skeletonBg }}></div>
        <div className="h-4 rounded-md w-5/6" style={{ backgroundColor: skeletonBg }}></div>
      </div>
    </article>
  );
}

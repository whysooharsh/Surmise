export default function PostSkeleton({ isDark }) {
  const skeletonBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "#262626" : "#f0f0f0";
  
  return (
    <article className="pb-10 mb-10 animate-pulse" style={{ borderBottom: `1px solid ${borderColor}` }}>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-1 order-2 sm:order-1 space-y-3">
          <div className="h-8 rounded-lg w-3/4" style={{ backgroundColor: skeletonBg }}></div>
          <div className="space-y-2">
            <div className="h-4 rounded-md w-full" style={{ backgroundColor: skeletonBg }}></div>
            <div className="h-4 rounded-md w-5/6" style={{ backgroundColor: skeletonBg }}></div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-3 rounded-md w-20" style={{ backgroundColor: skeletonBg }}></div>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: isDark ? "#404040" : "#d4d4d4" }}></div>
            <div className="h-3 rounded-md w-28" style={{ backgroundColor: skeletonBg }}></div>
          </div>
        </div>
        <div className="w-full sm:w-32 md:w-44 h-44 sm:h-24 md:h-28 rounded-2xl order-1 sm:order-2" style={{ backgroundColor: skeletonBg }}></div>
      </div>
    </article>
  );
}

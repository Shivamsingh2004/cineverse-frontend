const SkeletonCard = () => (
  <div className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] h-[240px] sm:h-[300px] md:h-[330px] skeleton flex-shrink-0" />
);
const SkeletonRow = () => (
  <div className="mb-16 md:mb-20 px-4 md:px-12 lg:px-24">
    <div className="h-7 w-48 skeleton mb-6 rounded-lg" />
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);
const SkeletonHero = () => (
  <div className="h-[85vh] w-full skeleton" />
);
export { SkeletonCard, SkeletonRow, SkeletonHero };

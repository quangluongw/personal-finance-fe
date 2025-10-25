const SkeletonHistory=()=> {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/50 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="rounded-2xl bg-slate-200 dark:bg-slate-800 p-3 h-14 w-14" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        </div>
        <div className="h-7 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}
export default SkeletonHistory;
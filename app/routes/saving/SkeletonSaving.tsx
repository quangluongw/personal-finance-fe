const SkeletonSaving = () => {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="size-12 animate-pulse rounded-xl bg-gray-200"></div>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
              <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="h-2 w-28 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-2 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="h-12 animate-pulse rounded-lg bg-gray-200"></div>
                </div>
                <div className="flex-1">
                  <div className="h-12 animate-pulse rounded-lg bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-5 w-40 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="size-10 shrink-0 animate-pulse rounded-lg bg-gray-200"></div>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="h-3 animate-pulse rounded-full bg-gray-200"></div>
            </div>

            <div className="space-y-4 rounded-xl bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="ml-auto h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                  <div className="ml-auto h-5 w-24 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="mt-2 h-6 w-28 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonSaving;

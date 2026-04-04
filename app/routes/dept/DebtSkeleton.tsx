const DebtManagementSkeleton=()=> {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-100 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-11 w-36 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-11 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 - Lending */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-xl shadow-emerald-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl animate-pulse"></div>
              <div className="h-5 w-28 bg-white/20 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-48 bg-white/30 rounded-lg animate-pulse mb-4"></div>
            <div className="h-1 w-full bg-emerald-800/30 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-white/30 w-2/3 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
              <div className="h-3 w-12 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Card 2 - Borrowing */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 shadow-xl shadow-orange-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl animate-pulse"></div>
              <div className="h-5 w-24 bg-white/20 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-48 bg-white/30 rounded-lg animate-pulse mb-4"></div>
            <div className="h-1 w-full bg-orange-800/30 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-white/30 w-1/2 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
              <div className="h-3 w-12 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Card 3 - Net Worth */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl animate-pulse"></div>
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-52 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          </div>
          <div className="h-12 w-full bg-blue-50 rounded-xl animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main List Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden min-h-[600px]">
            {/* Tabs Skeleton */}
            <div className="border-b border-gray-100 px-6 py-4">
              <div className="flex p-1 bg-gray-100/80 rounded-xl w-fit">
                <div className="h-10 w-40 bg-white rounded-lg shadow-md animate-pulse"></div>
                <div className="h-10 w-40 bg-gray-100 rounded-lg animate-pulse ml-1"></div>
              </div>
            </div>

            {/* List Items Skeleton */}
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative rounded-2xl border-2 border-gray-100 bg-white overflow-hidden"
                >
                  {/* Gradient Accent Bar */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse"></div>

                  <div className="p-6 pl-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                      {/* Avatar & Person Info Skeleton */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse flex-shrink-0"></div>

                        <div className="flex-1 min-w-0">
                          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mb-3"></div>

                          {/* Tags Row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="h-6 w-20 bg-blue-100 rounded-full animate-pulse"></div>
                            <div className="h-6 w-24 bg-gray-100 rounded-full animate-pulse"></div>
                            <div className="h-6 w-28 bg-purple-100 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Amount Section Skeleton */}
                      <div className="w-full lg:w-auto lg:min-w-[240px] flex flex-col gap-3">
                        {/* Progress Section */}
                        <div className="flex items-center gap-4">
                          {/* Circular Progress */}
                          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>

                          {/* Amount Details */}
                          <div className="flex-1">
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-8 w-36 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-200 w-2/3 rounded-full animate-pulse"></div>
                              </div>
                              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-9 bg-emerald-200 rounded-lg animate-pulse"></div>
                          <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-emerald-100 overflow-hidden sticky top-6">
            {/* Quick Stats */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-blue-200 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-200 animate-pulse"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-3 w-32 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-12 bg-emerald-100 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip Card Skeleton */}
            <div className="mx-6 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 min-h-[180px]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="h-6 w-32 bg-white/30 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-40 bg-white/20 rounded animate-pulse"></div>
                  </div>
                  <div className="w-6 h-6 bg-yellow-300/50 rounded animate-pulse"></div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  <div className="h-3 w-full bg-white/20 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-full bg-white/20 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-3/4 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsing Effect Overlay */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
        }
      `}</style>
    </div>
  );
}

export default DebtManagementSkeleton;
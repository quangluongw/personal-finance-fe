const AccountsPageSkeleton=()=> {
  return (
    <div className="space-y-6 animate-pulse pb-10">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="h-9 w-48 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-72 bg-gray-100 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
          <div className="h-10 w-40 bg-emerald-200 rounded-xl"></div>
        </div>
      </div>

      {/* Summary Card Skeleton */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 shadow-2xl shadow-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-32 bg-white/30 rounded"></div>
          </div>
          <div className="h-12 w-64 bg-white/40 rounded-lg mb-6"></div>

          {/* Balance Details Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="h-3 w-24 bg-white/30 rounded mb-2"></div>
              <div className="h-8 w-32 bg-white/40 rounded"></div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="h-3 w-24 bg-white/30 rounded mb-2"></div>
              <div className="h-8 w-32 bg-white/40 rounded"></div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <div className="h-3 w-24 bg-white/30 rounded mb-2"></div>
              <div className="h-8 w-32 bg-white/40 rounded"></div>
            </div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-3 w-20 bg-white/30 rounded mb-2"></div>
                  <div className="h-6 w-16 bg-white/40 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <div className="w-32 h-32 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Bank Accounts Section Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-7 w-48 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-4 w-24 bg-gray-100 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
              </div>

              {/* Balance */}
              <div className="mb-4">
                <div className="h-3 w-20 bg-gray-100 rounded mb-2"></div>
                <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E-wallets Section Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-7 w-32 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-4 w-16 bg-gray-100 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div>
                    <div className="h-5 w-28 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
              </div>

              {/* Balance */}
              <div className="mb-4">
                <div className="h-3 w-20 bg-gray-100 rounded mb-2"></div>
                <div className="h-8 w-36 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Accounts Section Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-7 w-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-4 w-20 bg-gray-100 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div>
                    <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
              </div>

              {/* Balance */}
              <div className="mb-4">
                <div className="h-3 w-20 bg-gray-100 rounded mb-2"></div>
                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AccountsPageSkeleton;
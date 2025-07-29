"use client";

export default function Insights() {
  return (
    <div className="min-h-screen flex bg-[#f7fafd]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#16213e] text-white flex flex-col justify-between py-8 px-6 min-h-screen">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-[#1abc9c] rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              A
            </div>
            <span className="font-semibold text-lg">MeHalin</span>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              href="/dashboard"
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
            >
              Dashboard
            </a>
            <a
              href="/new-entry"
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
            >
              New Entry
            </a>
            <a
              href="/insights"
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
            >
              Insights
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-1 text-xs text-white/70">
          <span>Nethor@example.com</span>
          <span>Darn-iherds</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#16213e] mb-6">AI Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trend Analysis */}
          <div className="bg-white rounded-xl shadow p-6 col-span-2">
            <div className="font-semibold mb-2">Trend Analysis</div>
            <div className="h-24 flex items-center justify-center text-gray-400">
              [Trend Chart]
            </div>
            <div className="text-xs text-gray-400 mt-2">
              You’ve had better on weekends
            </div>
          </div>
          {/* Suggestions */}
          <div className="bg-white rounded-xl shadow p-6 col-span-1 flex flex-col gap-4">
            <div>
              <div className="font-semibold mb-2">Suggestions</div>
              <div className="text-xs text-gray-500">
                Try meditating 5 mins daily
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2">Suggestions</div>
              <div className="flex flex-wrap gap-2 text-lg">
                <span className="text-blue-600">anxious</span>
                <span className="text-green-600">happy</span>
                <span className="text-gray-600">fine</span>
                <span className="text-green-700">sad</span>
                <span className="text-blue-400">stressed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

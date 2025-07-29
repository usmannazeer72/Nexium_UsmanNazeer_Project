"use client";

export default function Dashboard() {
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
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
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
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#16213e]">Dashboard</h1>
          <a
            href="/new-entry"
            className="bg-[#1abc9c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#16a085]"
          >
            + New Entry
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Heatmap */}
          <div className="bg-white rounded-xl shadow p-6 col-span-2">
            <div className="font-semibold mb-2">Calendar Heatmap</div>
            <div className="flex flex-wrap gap-1">
              {[...Array(35)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded bg-[#d1fae5] border border-[#b6e4d8]"
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={d + i}>{d}</span>
              ))}
            </div>
          </div>
          {/* Mood Selector */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <div className="font-semibold mb-2">Mood Selector</div>
            <div className="text-3xl mb-2">4.2</div>
            <div className="text-xs text-gray-400">7-day average need</div>
          </div>
          {/* AI Insight */}
          <div className="bg-white rounded-xl shadow p-6 col-span-1">
            <div className="font-semibold mb-2">AI Insight</div>
            <div className="text-xs text-gray-500">
              You’ve been feeling <span className="font-semibold">anxious</span>{" "}
              lately. Try journaling or reach out to someone you trust.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

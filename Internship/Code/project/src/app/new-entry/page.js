"use client";

const moods = [
  { icon: "😃", label: "happy" },
  { icon: "🙂", label: "fine" },
  { icon: "😐", label: "ok" },
  { icon: "🙁", label: "sad" },
  { icon: "😢", label: "stressed" },
];

export default function NewEntry() {
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
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
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
        <h1 className="text-2xl font-bold text-[#16213e] mb-6">New Entry</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood Selector */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <div className="font-semibold mb-2">Mood Selector</div>
            <div className="flex gap-2 mb-2">
              {moods.map((m, i) => (
                <span
                  key={i}
                  className="text-3xl cursor-pointer hover:scale-110 transition-transform"
                >
                  {m.icon}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="bg-gray-100 rounded px-2 py-1 text-xs">
                anxious
              </span>
              <span className="bg-gray-100 rounded px-2 py-1 text-xs">
                tired
              </span>
            </div>
          </div>
          {/* Journal Entry */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <div className="font-semibold mb-2">Journal entry</div>
            <textarea
              className="border border-gray-300 rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your thoughts..."
            />
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="summarize"
                className="accent-blue-600"
              />
              <label htmlFor="summarize" className="text-sm text-gray-600">
                Let AI summarize this?
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

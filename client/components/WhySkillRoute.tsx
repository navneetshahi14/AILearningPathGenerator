
export default function WhySkillRoute() {
  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-5 overflow-hidden">
        <div className="lg:w-[5%] lg:h-[2vh] h-[1.5vh] w-[10%] bg-blue-500 rounded-full shadow "></div>
        <h1 className="text-center text-2xl lg:text-4xl 2xl:text-6xl font-semibold uppercase">
          Why Skill Route
        </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left h-[70vh] w-[60vw] mx-auto">
            {[
              "🎯 Smart AI Agents for every skill",
              "📄 Exportable PDF Paths",
              "🏆 XP, streaks, badges & gamification",
              "🎙️ Voice control (coming soon)",
              "🌐 Community leaderboards",
              "📊 Weekly progress reports",
            ].map((feat, i) => (
              <div key={i} className="bg-yellow-100 p-4 rounded-lg shadow flex justify-center items-center text-center">
                <p className="text-lg 2xl:text-[2rem]">{feat}</p>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}

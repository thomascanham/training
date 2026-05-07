import { useState, useEffect } from "react";

const weeks = [
  {
    week: 1,
    dates: "5–11 May",
    theme: "Wake Up the Legs",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy Spin", detail: "45 min Zone 2, no pressure, just get comfortable back on the bike." },
      { day: "Wed", type: "run", label: "Run/Walk", detail: "20 min: run 1 min / walk 1 min intervals. Very easy pace." },
      { day: "Thu", type: "bike", label: "Zwift — Easy Spin", detail: "45 min steady. Focus on cadence, aim for 80–90 rpm." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 30 miles", detail: "Nice and easy. Just enjoy being back outside. No chasing pace." },
    ],
  },
  {
    week: 2,
    dates: "12–18 May",
    theme: "Finding Your Rhythm",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Zone 2", detail: "50 min easy effort. Try the 'Just Ride' option in Watopia." },
      { day: "Wed", type: "run", label: "Run/Walk", detail: "20 min: run 1 min / walk 1 min. Try to feel a little more comfortable than last week." },
      { day: "Thu", type: "bike", label: "Zwift — Structured", detail: "Pick a beginner workout. 45–50 min. Something with short tempo efforts." },
      { day: "Fri", type: "run", label: "Easy Run", detail: "20 min optional run if legs are good. Keep it slow." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 35 miles", detail: "Still easy. Focus on staying fuelled — eat before you feel hungry." },
    ],
  },
  {
    week: 3,
    dates: "19–25 May",
    theme: "Building Base",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Zone 2", detail: "55 min. Keep heart rate conversational — you should be able to speak in sentences." },
      { day: "Wed", type: "run", label: "Run/Walk", detail: "25 min: run 2 min / walk 1 min. Longer running blocks now." },
      { day: "Thu", type: "bike", label: "Zwift — Intervals", detail: "FTP Builder or similar. Short hard efforts with recovery. 50 min." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 45 miles", detail: "Start practising nutrition — eat and drink every 45 mins. Gels, bars, whatever you plan to use on the day." },
    ],
  },
  {
    week: 4,
    dates: "26 May–1 Jun",
    theme: "Pushing Further",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Zone 2", detail: "55–60 min easy. Recovery from weekend, don't push." },
      { day: "Wed", type: "run", label: "Run/Walk", detail: "25 min: run 2 min / walk 1 min. Try to run a bit smoother and more relaxed." },
      { day: "Thu", type: "bike", label: "Zwift — Tempo", detail: "60 min with 2×10 min tempo blocks. Hard but sustainable." },
      { day: "Fri", type: "run", label: "Easy Run", detail: "20 min optional. Slow and easy." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 55 miles", detail: "Pick a hillier route if you can. Practice your climbing pace — don't blow up on ascents." },
    ],
  },
  {
    week: 5,
    dates: "2–8 Jun",
    theme: "Halfway There",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy", detail: "45 min. Recovery week start — lighter effort intentionally." },
      { day: "Wed", type: "run", label: "Run/Walk", detail: "25 min: run 3 min / walk 1 min. Running blocks getting longer." },
      { day: "Thu", type: "bike", label: "Zwift — Steady", detail: "55 min moderate effort. No full intervals this week — steady is enough." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 60 miles", detail: "Your first serious long ride. Take it easy in the first half. The back half is where rides are won or lost." },
    ],
  },
  {
    week: 6,
    dates: "9–15 Jun",
    theme: "Getting Serious",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Zone 2", detail: "60 min easy. Let the body process last week." },
      { day: "Wed", type: "run", label: "Run/Walk", detail: "30 min: run 3 min / walk 1 min. You should be feeling stronger now." },
      { day: "Thu", type: "bike", label: "Zwift — Intervals", detail: "60 min. 3×8 min harder efforts. Push but not all-out." },
      { day: "Fri", type: "run", label: "Easy Run", detail: "25 min optional. Easy pace." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 70 miles", detail: "Significant step up. Eat before you're hungry, drink before you're thirsty. This is practice for the real day." },
    ],
  },
  {
    week: 7,
    dates: "16–22 Jun",
    theme: "Endurance Mode",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy", detail: "55 min Zone 2. Don't underestimate easy rides — they build your aerobic engine." },
      { day: "Wed", type: "run", label: "Run", detail: "25 min steady. Try running the full 25 mins without walking if you can." },
      { day: "Thu", type: "bike", label: "Zwift — Structured", detail: "60 min FTP-style workout. Dig in a bit." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 80 miles", detail: "Big one. Mentally split it into thirds. Keep something in the tank until the final 20." },
    ],
  },
  {
    week: 8,
    dates: "23–29 Jun",
    theme: "Consolidating",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy", detail: "50 min Zone 2. Post big-ride recovery." },
      { day: "Wed", type: "run", label: "Run", detail: "30 min steady. Aim for a comfortable continuous run." },
      { day: "Thu", type: "bike", label: "Zwift — Tempo", detail: "60 min with tempo blocks. 2×12 min." },
      { day: "Fri", type: "run", label: "Easy Run", detail: "25 min easy optional." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 85 miles", detail: "Another big one. Test your exact race-day nutrition strategy — same food, same timing." },
    ],
  },
  {
    week: 9,
    dates: "30 Jun–6 Jul",
    theme: "100 Mile Confidence Builder",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy", detail: "50 min very easy. You need fresh legs for Saturday." },
      { day: "Wed", type: "run", label: "Easy Run", detail: "20 min gentle jog only. No stress on the body this week." },
      { day: "Thu", type: "bike", label: "Zwift — Steady", detail: "45 min moderate. Nothing heroic. Save it for the weekend." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 100 miles 🏆", detail: "THE confidence builder. Treat it like race day — same kit, same food, same start time if possible. You've got this." },
    ],
  },
  {
    week: 10,
    dates: "7–13 Jul",
    theme: "Taper — Let It Sink In",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy", detail: "40 min easy. Taper starts now. Less volume, keep a little intensity." },
      { day: "Wed", type: "run", label: "Easy Run", detail: "20 min very easy jog. Keep the legs ticking." },
      { day: "Thu", type: "bike", label: "Zwift — Short Efforts", detail: "40 min with 3×5 min moderate efforts. Keep sharp without fatiguing." },
      { day: "Sat", type: "ride", label: "Outdoor Ride — 50 miles", detail: "Easy, familiar route. Enjoy it. Your fitness is locked in now — trust the work you've done." },
    ],
  },
  {
    week: 11,
    dates: "14–25 Jul",
    theme: "Race Week",
    sessions: [
      { day: "Tue", type: "bike", label: "Zwift — Easy Spin", detail: "30 min very easy. Just keep the legs moving." },
      { day: "Wed", type: "run", label: "Easy Jog", detail: "15 min easy. Last run before the event." },
      { day: "Thu", type: "bike", label: "Zwift — Short & Sharp", detail: "25 min with 3×2 min pickups. Wake the legs up, don't fatigue them." },
      { day: "Fri", type: "rest", label: "Rest Day", detail: "Full rest. Prep your kit, charge your lights, check your bike. Eat well, sleep early." },
      { day: "Sat", type: "event", label: "🚴 117 MILE RIDE — RACE DAY!", detail: "You've done 100 miles in training. You know what this feels like. Start easy, eat early, enjoy every mile." },
    ],
  },
];

const typeColors = {
  bike: { bg: "#1a3a5c", accent: "#4a9eff", icon: "🚴" },
  run: { bg: "#2d1a4a", accent: "#b06eff", icon: "🏃" },
  ride: { bg: "#0d3320", accent: "#3ddd8a", icon: "🚴" },
  rest: { bg: "#2a2a1a", accent: "#f5c842", icon: "😴" },
  event: { bg: "#3a0a0a", accent: "#ff4a4a", icon: "🏆" },
};

const typeLabel = {
  bike: "Zwift",
  run: "Run",
  ride: "Outdoor",
  rest: "Rest",
  event: "EVENT",
};

export default function TrainingCalendar() {
  const [expanded, setExpanded] = useState(null);
  const [completedSessions, setCompletedSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('training-progress') || '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('training-progress', JSON.stringify(completedSessions));
  }, [completedSessions]);

  const toggleSession = (key) => {
    setCompletedSessions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleWeek = (i) => {
    setExpanded(expanded === i ? null : i);
  };

  const totalSessions = weeks.reduce((acc, w) => acc + w.sessions.length, 0);
  const completedCount = Object.values(completedSessions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalSessions) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e14",
      fontFamily: "'Georgia', serif",
      color: "#e8e0d0",
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1f35 0%, #0a0e14 60%, #1a0d0d 100%)",
        borderBottom: "1px solid #1e2a38",
        padding: "40px 24px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(74,158,255,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(61,221,138,0.05) 0%, transparent 60%)",
        }} />
        <p style={{ margin: "0 0 8px", fontSize: "11px", letterSpacing: "4px", color: "#4a9eff", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
          11-WEEK PLAN · MAY–JULY 2026
        </p>
        <h1 style={{ margin: "0 0 6px", fontSize: "clamp(26px, 5vw, 42px)", fontWeight: "normal", letterSpacing: "-1px", color: "#f0ece4" }}>
          Road to 117 Miles
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: "14px", color: "#7a8fa6", fontStyle: "italic" }}>
          Bike · Run · Zwift · 25th July 2026
        </p>

        {/* Progress bar */}
        <div style={{ maxWidth: "340px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "11px", color: "#5a7a9a", fontFamily: "'Courier New', monospace", letterSpacing: "1px" }}>
            <span>SESSIONS LOGGED</span>
            <span>{completedCount} / {totalSessions}</span>
          </div>
          <div style={{ height: "4px", background: "#1a2535", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #4a9eff, #3ddd8a)",
              transition: "width 0.4s ease",
              borderRadius: "2px",
            }} />
          </div>
          <p style={{ margin: "8px 0 0", fontSize: "11px", color: "#3ddd8a", fontFamily: "'Courier New', monospace" }}>{progress}% COMPLETE</p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", padding: "20px 16px 8px" }}>
        {[["bike", "Zwift"], ["ride", "Outdoor Ride"], ["run", "Running"], ["event", "Race Day"]].map(([t, l]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#7a8fa6", letterSpacing: "1px", fontFamily: "'Courier New', monospace" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: typeColors[t].accent }} />
            {l.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "12px 16px 0" }}>
        {weeks.map((week, wi) => {
          const isOpen = expanded === wi;
          const isRaceWeek = wi === 10;
          const weekCompleted = week.sessions.every((_, si) => completedSessions[`${wi}-${si}`]);

          return (
            <div key={wi} style={{
              marginBottom: "10px",
              border: `1px solid ${isRaceWeek ? "#ff4a4a44" : "#1e2a38"}`,
              borderRadius: "10px",
              overflow: "hidden",
              background: isRaceWeek ? "rgba(58,10,10,0.3)" : "rgba(255,255,255,0.02)",
              transition: "border-color 0.2s",
            }}>
              {/* Week header */}
              <button
                onClick={() => toggleWeek(wi)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  padding: "14px 16px", background: "none", border: "none",
                  cursor: "pointer", color: "#e8e0d0", textAlign: "left",
                  gap: "12px",
                }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: isRaceWeek ? "#3a0a0a" : "#0d1f35",
                  border: `1px solid ${isRaceWeek ? "#ff4a4a" : "#1e3a5c"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontFamily: "'Courier New', monospace",
                  color: isRaceWeek ? "#ff4a4a" : "#4a9eff", fontWeight: "bold",
                  flexShrink: 0,
                }}>
                  {isRaceWeek ? "🏁" : `W${week.week}`}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: weekCompleted ? "#3ddd8a" : "#e8e0d0" }}>
                      {weekCompleted ? "✓ " : ""}{week.theme}
                    </span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#5a7a9a", fontFamily: "'Courier New', monospace", marginTop: "2px" }}>
                    {week.dates} · {week.sessions.length} sessions
                  </div>
                </div>
                {/* Session dots */}
                <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                  {week.sessions.map((s, si) => (
                    <div key={si} style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: completedSessions[`${wi}-${si}`] ? typeColors[s.type].accent : "#1e2a38",
                      border: `1px solid ${typeColors[s.type].accent}`,
                      transition: "background 0.2s",
                    }} />
                  ))}
                </div>
                <span style={{ color: "#3a5a7a", fontSize: "16px", flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* Sessions */}
              {isOpen && (
                <div style={{ borderTop: "1px solid #1e2a38", padding: "4px 0 8px" }}>
                  {week.sessions.map((session, si) => {
                    const key = `${wi}-${si}`;
                    const done = completedSessions[key];
                    const colors = typeColors[session.type];
                    return (
                      <div
                        key={si}
                        onClick={() => toggleSession(key)}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: "12px",
                          padding: "10px 16px", cursor: "pointer",
                          background: done ? `${colors.bg}55` : "transparent",
                          transition: "background 0.2s",
                          borderLeft: done ? `3px solid ${colors.accent}` : "3px solid transparent",
                          marginLeft: "1px",
                        }}
                      >
                        <div style={{
                          width: "28px", height: "28px", borderRadius: "6px",
                          background: colors.bg,
                          border: `1px solid ${colors.accent}33`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", flexShrink: 0, marginTop: "1px",
                        }}>
                          {colors.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <span style={{
                              fontSize: "10px", letterSpacing: "1.5px",
                              fontFamily: "'Courier New', monospace",
                              color: colors.accent,
                              background: `${colors.accent}15`,
                              padding: "2px 6px", borderRadius: "3px",
                            }}>
                              {session.day} · {typeLabel[session.type]}
                            </span>
                            <span style={{
                              fontSize: "14px", fontWeight: "600",
                              color: done ? "#7aaa8a" : "#ddd8cc",
                              textDecoration: done ? "line-through" : "none",
                            }}>
                              {session.label}
                            </span>
                          </div>
                          <p style={{
                            margin: "4px 0 0", fontSize: "13px",
                            color: done ? "#4a6a5a" : "#8a9aaa",
                            lineHeight: "1.5",
                          }}>
                            {session.detail}
                          </p>
                        </div>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%",
                          border: `2px solid ${done ? colors.accent : "#2a3a4a"}`,
                          background: done ? colors.accent : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", flexShrink: 0, marginTop: "4px",
                          transition: "all 0.2s",
                        }}>
                          {done && "✓"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer note */}
        <div style={{
          marginTop: "24px", padding: "16px 20px",
          background: "rgba(74,158,255,0.06)",
          border: "1px solid #1e3a5c",
          borderRadius: "10px",
          fontSize: "13px", color: "#6a8aaa", lineHeight: "1.7",
          fontStyle: "italic",
        }}>
          <strong style={{ color: "#4a9eff", fontStyle: "normal" }}>Flex rule:</strong> If you get home late, swap or drop that day's session. Consistency over perfection — a missed session is never the end of the world.
        </div>
      </div>
    </div>
  );
}

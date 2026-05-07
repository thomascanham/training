import { useState, useEffect } from "react";

const weeks = [
  {
    week: 1,
    start: "2026-05-05", end: "2026-05-11",
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
    start: "2026-05-12", end: "2026-05-18",
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
    start: "2026-05-19", end: "2026-05-25",
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
    start: "2026-05-26", end: "2026-06-01",
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
    start: "2026-06-02", end: "2026-06-08",
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
    start: "2026-06-09", end: "2026-06-15",
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
    start: "2026-06-16", end: "2026-06-22",
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
    start: "2026-06-23", end: "2026-06-29",
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
    start: "2026-06-30", end: "2026-07-06",
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
    start: "2026-07-07", end: "2026-07-13",
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
    start: "2026-07-14", end: "2026-07-25",
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

const TYPE = {
  bike:  { color: "#1D4ED8", bg: "#EFF6FF", label: "ZWIFT",   icon: "⚡" },
  run:   { color: "#7C3AED", bg: "#F5F3FF", label: "RUN",     icon: "🏃" },
  ride:  { color: "#16A34A", bg: "#F0FDF4", label: "OUTDOOR", icon: "🚴" },
  rest:  { color: "#B45309", bg: "#FFFBEB", label: "REST",    icon: "😴" },
  event: { color: "#DC2626", bg: "#FEF2F2", label: "RACE",    icon: "🏆" },
};

function getCurrentWeekIndex() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return weeks.findIndex((w) => {
    const start = new Date(w.start);
    const end = new Date(w.end);
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  });
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { background: #F2F1ED; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

  .t-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #E4E2DD;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
    overflow: hidden;
    margin-bottom: 10px;
    transition: box-shadow 0.2s ease, opacity 0.2s ease;
  }
  .t-card:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06);
  }
  .t-card-current {
    border: 2px solid #1D4ED8 !important;
    box-shadow: 0 0 0 4px rgba(29,78,216,0.08), 0 4px 16px rgba(29,78,216,0.1) !important;
  }
  .t-card-past {
    opacity: 0.55;
  }
  .t-card-past:hover {
    opacity: 0.75;
  }

  .t-wbtn {
    -webkit-tap-highlight-color: transparent;
    outline: none;
    transition: background 0.12s ease;
  }
  .t-wbtn:active { background: #FAFAF8 !important; }
  .t-wbtn:focus-visible { outline: 2px solid #1D4ED8; outline-offset: -2px; }

  .t-sess {
    -webkit-tap-highlight-color: transparent;
    transition: background 0.12s ease;
    cursor: pointer;
  }
  .t-sess:hover { background: #FAFAF8 !important; }
  .t-sess:active { background: #F2F1ED !important; }

  .t-chk { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); }

  @keyframes t-pop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  .t-chk-done { animation: t-pop 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards; }

  .t-prog { transition: width 0.55s cubic-bezier(0.4,0,0.2,1); }

  .t-chevron { transition: transform 0.2s ease; }
  .t-chevron-open { transform: rotate(180deg); }

  @keyframes t-badge-in {
    from { opacity: 0; transform: translateY(-2px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .t-this-week-badge {
    animation: t-badge-in 0.3s ease forwards;
  }
`;

export default function TrainingCalendar() {
  const currentWeekIndex = getCurrentWeekIndex();

  const [expanded, setExpanded] = useState(() => currentWeekIndex);
  const [completedSessions, setCompletedSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("training-progress") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("training-progress", JSON.stringify(completedSessions));
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
      background: "#F2F1ED",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#1A1917",
    }}>
      <style>{CSS}</style>

      {/* ── Header ─────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #E4E2DD",
        padding: "36px 16px 28px",
        textAlign: "center",
      }}>
        <p style={{
          margin: "0 0 8px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.13em",
          color: "#A09D96",
          textTransform: "uppercase",
        }}>
          11-week plan · May–July 2026
        </p>

        <h1 style={{
          margin: "0 0 4px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(30px, 8vw, 46px)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          color: "#111",
        }}>
          Dunwich Dynamo
        </h1>

        <p style={{
          margin: "0 0 26px",
          fontSize: "14px",
          color: "#A09D96",
          fontWeight: 400,
        }}>
          Bike · Run · Zwift · 25 July 2026
        </p>

        {/* Progress */}
        <div style={{ maxWidth: "380px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "8px",
          }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1917" }}>
              Progress
            </span>
            <span style={{ fontSize: "13px", color: "#6B6860" }}>
              <span style={{ fontWeight: 700, color: "#1A1917" }}>{completedCount}</span>
              /{totalSessions} sessions
            </span>
          </div>

          <div style={{
            height: "8px",
            background: "#ECEAE5",
            borderRadius: "100px",
            overflow: "hidden",
          }}>
            <div className="t-prog" style={{
              height: "100%",
              width: `${progress}%`,
              background: progress === 100
                ? "linear-gradient(90deg, #16A34A, #15803D)"
                : "linear-gradient(90deg, #1D4ED8 0%, #16A34A 100%)",
              borderRadius: "100px",
            }} />
          </div>

          <p style={{
            margin: "7px 0 0",
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "right",
            color: progress > 0 ? "#16A34A" : "#A09D96",
          }}>
            {progress === 0
              ? "Tap any session to mark it done"
              : progress === 100
              ? "All sessions complete!"
              : `${progress}% complete`}
          </p>
        </div>
      </div>

      {/* ── Legend ─────────────────────────────────────── */}
      <div style={{
        display: "flex",
        gap: "18px",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "14px 16px 8px",
      }}>
        {[["bike","Zwift"],["ride","Outdoor"],["run","Running"],["event","Race Day"]].map(([t, l]) => (
          <div key={t} style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 500,
            color: "#6B6860",
          }}>
            <div style={{
              width: "8px", height: "8px",
              borderRadius: "50%",
              background: TYPE[t].color,
            }} />
            {l}
          </div>
        ))}
      </div>

      {/* ── Week cards ─────────────────────────────────── */}
      <div style={{ padding: "8px 16px 56px", maxWidth: "640px", margin: "0 auto" }}>
        {weeks.map((week, wi) => {
          const isOpen = expanded === wi;
          const isRace = wi === 10;
          const isCurrent = wi === currentWeekIndex;
          const isPast = currentWeekIndex !== -1 && wi < currentWeekIndex;
          const weekDone = week.sessions.every((_, si) => completedSessions[`${wi}-${si}`]);

          const cardClass = [
            "t-card",
            isCurrent ? "t-card-current" : "",
            isPast ? "t-card-past" : "",
          ].filter(Boolean).join(" ");

          return (
            <div
              key={wi}
              className={cardClass}
              style={{
                background: isRace && !isCurrent ? "#FFFBFB" : "#fff",
              }}
            >
              {/* THIS WEEK banner */}
              {isCurrent && (
                <div
                  className="t-this-week-badge"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    background: "#1D4ED8",
                  }}
                >
                  <div style={{
                    width: "6px", height: "6px",
                    borderRadius: "50%",
                    background: "#fff",
                    opacity: 0.8,
                  }} />
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}>
                    This Week
                  </span>
                </div>
              )}

              {/* Week header */}
              <button
                className="t-wbtn"
                onClick={() => toggleWeek(wi)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  gap: "12px",
                  minHeight: "64px",
                  textAlign: "left",
                }}
              >
                {/* Badge */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isCurrent ? "#EFF6FF"
                    : isRace ? "#FEE2E2"
                    : weekDone ? "#DCFCE7"
                    : "#F2F1ED",
                  fontSize: isRace ? "20px" : "13px",
                  fontWeight: 700,
                  fontFamily: "'Syne', sans-serif",
                  color: isCurrent ? "#1D4ED8"
                    : isRace ? "#DC2626"
                    : weekDone ? "#16A34A"
                    : "#7B7870",
                  border: isCurrent ? "1.5px solid #BFDBFE" : "none",
                }}>
                  {isRace ? "🏁" : weekDone ? "✓" : `W${week.week}`}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: "3px",
                    color: isCurrent ? "#1D4ED8"
                      : isRace ? "#DC2626"
                      : weekDone ? "#16A34A"
                      : "#1A1917",
                  }}>
                    {week.theme}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#A09D96",
                  }}>
                    {week.dates} · {week.sessions.length} sessions
                  </div>
                </div>

                {/* Session dots */}
                <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                  {week.sessions.map((s, si) => {
                    const done = completedSessions[`${wi}-${si}`];
                    const t = TYPE[s.type];
                    return (
                      <div key={si} style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: done ? t.color : "transparent",
                        border: `1.5px solid ${done ? t.color : "#CCC9C3"}`,
                        transition: "all 0.18s ease",
                      }} />
                    );
                  })}
                </div>

                {/* Chevron */}
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className={`t-chevron${isOpen ? " t-chevron-open" : ""}`}
                  style={{ flexShrink: 0, color: isCurrent ? "#93C5FD" : "#B0ADA6" }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Sessions */}
              {isOpen && (
                <div style={{ borderTop: `1px solid ${isCurrent ? "#DBEAFE" : "#F0EEE9"}` }}>
                  {week.sessions.map((session, si) => {
                    const key = `${wi}-${si}`;
                    const done = completedSessions[key];
                    const t = TYPE[session.type];

                    return (
                      <div
                        key={si}
                        className="t-sess"
                        onClick={() => toggleSession(key)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "12px 16px",
                          background: done ? t.bg : "transparent",
                          borderLeft: `3px solid ${done ? t.color : "transparent"}`,
                          marginLeft: "1px",
                        }}
                      >
                        {/* Icon */}
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "9px",
                          background: done ? "#fff" : t.bg,
                          border: `1px solid ${done ? t.color + "30" : "transparent"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "17px",
                          flexShrink: 0,
                          marginTop: "1px",
                          transition: "all 0.18s ease",
                        }}>
                          {t.icon}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ marginBottom: "3px" }}>
                            <span style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.07em",
                              color: t.color,
                              background: done ? "#fff" : t.bg,
                              padding: "2px 7px",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                            }}>
                              {session.day} · {t.label}
                            </span>
                          </div>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            marginBottom: "4px",
                            color: done ? "#9B9890" : "#1A1917",
                            textDecoration: done ? "line-through" : "none",
                            textDecorationColor: "#C5C2BC",
                          }}>
                            {session.label}
                          </div>
                          <p style={{
                            margin: 0,
                            fontSize: "13px",
                            fontWeight: 400,
                            color: done ? "#B0ADA6" : "#6B6860",
                            lineHeight: 1.55,
                          }}>
                            {session.detail}
                          </p>
                        </div>

                        {/* Checkmark */}
                        <div
                          className={`t-chk${done ? " t-chk-done" : ""}`}
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            marginTop: "6px",
                            border: `2px solid ${done ? t.color : "#D4D1CB"}`,
                            background: done ? t.color : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {done && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{
          marginTop: "8px",
          padding: "16px 18px",
          background: "#fff",
          border: "1px solid #E4E2DD",
          borderRadius: "16px",
          fontSize: "13px",
          fontWeight: 400,
          color: "#6B6860",
          lineHeight: 1.6,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <span style={{ fontWeight: 700, color: "#1A1917" }}>Flex rule: </span>
          If you get home late, swap or drop that day's session. Consistency over perfection — a missed session is never the end of the world.
        </div>
      </div>
    </div>
  );
}

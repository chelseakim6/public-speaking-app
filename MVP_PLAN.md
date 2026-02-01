# Public Speaking AI App - MVP Plan

## Executive Summary

A web-based public speaking coach that provides real-time feedback, gamified learning, and multi-scenario practice modes. Differentiated through superior gamification mechanics, deeper speech analysis, and specialized coaching for various speaking contexts.

**Target Launch**: Today (Rapid MVP)
**Primary Audience**: B2C (Individual consumers)
**Platform**: Web App (React + Vite + Vercel)

---

## 1. Core Value Proposition

### Differentiation from Competitors (Yoodli, Orai)

| Feature | Our App | Competitors |
|---------|---------|-------------|
| **Gamification** | Multi-level progression, achievements, daily challenges, leaderboards | Basic scoring |
| **Speaking Modes** | 8+ specialized modes (presentation, interview, small talk, facilitation, storytelling, pitch, debate, networking) | Limited scenarios |
| **Real-time Feedback** | Live visual feedback with color-coded indicators, instant corrections | Post-session only |
| **Analysis Depth** | Filler word tracking, pace analysis, pause patterns, word variety, sentiment analysis | Basic metrics |
| **Engagement** | Streaks, XP system, unlockable content, challenges | Minimal gamification |

---

## 2. MVP Features (Build Today)

### Phase 1: Core Functionality (Hours 1-4)

#### A. Audio Recording & Analysis
- Browser-based microphone access (Web Speech API)
- Real-time speech-to-text transcription
- Audio level monitoring for volume feedback

#### B. Real-time Feedback Engine
- **Filler Word Detection**: "um", "uh", "like", "you know", "actually", "basically", "literally"
- **Pace Analysis**: Words per minute (optimal: 120-150 WPM)
- **Pause Detection**: Identify awkward silences (>3s) and natural pauses
- **Volume Analysis**: Too quiet/too loud indicators
- **Word Variety**: Track unique words vs. repetition

#### C. Live Feedback UI
```
Real-time indicators:
🟢 Pace: 135 WPM (Good!)
🔴 Filler Words: 8 in last minute (Reduce!)
🟡 Pauses: 2.5s average (Acceptable)
🟢 Volume: Optimal
🟢 Word Variety: 78% unique
```

### Phase 2: Speaking Modes (Hours 5-6)

#### Initial 5 Modes
1. **Presentation Mode**
   - Focus: Clarity, pacing, confidence
   - Prompts: "Explain your product/service", "Present quarterly results"

2. **Interview Mode**
   - Focus: Conciseness, confidence, filler words
   - Prompts: "Tell me about yourself", "Why should we hire you?"

3. **Small Talk Mode**
   - Focus: Natural flow, warmth, engagement
   - Prompts: "Chat about your weekend", "Discuss a recent hobby"

4. **Pitch Mode**
   - Focus: Enthusiasm, clarity, persuasion
   - Prompts: "Pitch a business idea in 60 seconds", "Sell your solution"

5. **Storytelling Mode**
   - Focus: Pacing, emotion, engagement
   - Prompts: "Tell a personal story", "Describe a challenge you overcame"

Each mode has:
- Custom prompts/scenarios
- Weighted scoring criteria (different modes prioritize different metrics)
- Difficulty levels (Beginner, Intermediate, Advanced)

### Phase 3: Gamification (Hours 7-8)

#### XP & Leveling System
```
Level 1 (Novice): 0-100 XP
Level 2 (Speaker): 100-300 XP
Level 3 (Presenter): 300-600 XP
Level 4 (Communicator): 600-1000 XP
Level 5 (Expert): 1000-1500 XP
Level 6 (Master): 1500-2500 XP
Level 7 (Legend): 2500+ XP
```

**XP Earning:**
- Complete a session: 10-50 XP (based on score)
- Achieve 80+ score: +20 bonus XP
- 3-day streak: +25 XP
- Complete daily challenge: +30 XP
- Zero filler words in session: +15 XP

#### Achievements
- 🎯 **First Steps**: Complete your first session
- 🔥 **On Fire**: 3-day practice streak
- 💎 **Flawless**: Score 90+ in any mode
- 🎤 **Versatile**: Try all 5 speaking modes
- 🚀 **Speed Demon**: Maintain 140-160 WPM for 2 minutes
- 🤐 **Smooth Talker**: Complete session with <3 filler words
- 📊 **Improver**: Beat your personal best by 20 points

#### Progress Tracking
- Daily streak counter
- Personal best scores per mode
- Total practice time
- Improvement graphs (score over time)

### Phase 4: Scoring System (Integrated)

#### Score Calculation (0-100)
```javascript
Score Components:
- Pace (20%): Optimal range 120-150 WPM
- Clarity (25%): Filler words frequency (fewer = better)
- Consistency (15%): Variation in pace (stable = better)
- Pauses (15%): Natural pauses vs awkward silences
- Volume (10%): Consistent, audible level
- Word Variety (15%): Unique words / total words ratio
```

**Mode-Specific Weights:**
- Interview Mode: Clarity 35%, Pace 15% (prioritize conciseness)
- Presentation Mode: Pace 25%, Consistency 20% (prioritize flow)
- Pitch Mode: Pace 30% (fast energy), Volume 15% (confidence)

#### Post-Session Report
```
SESSION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━
Overall Score: 78/100 🟡

Breakdown:
✅ Pace: 135 WPM (18/20)
⚠️  Filler Words: 12 detected (15/25)
✅ Consistency: Stable (14/15)
✅ Pauses: Natural (13/15)
✅ Volume: Good (9/10)
⚠️  Word Variety: 65% (10/15)

Top Filler Words:
1. "um" - 5 times
2. "like" - 4 times
3. "you know" - 3 times

💡 Tips:
- Pause instead of saying "um"
- Expand vocabulary in storytelling
- Great pacing - keep it up!

+35 XP earned!
🏆 Achievement unlocked: First Steps
```

---

## 3. Technical Architecture

### Tech Stack

**Frontend:**
- React 18 (UI framework)
- Vite (Build tool, fast dev server)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- Zustand (State management, lightweight)

**Audio/Speech:**
- Web Speech API (Browser native, free)
- MediaRecorder API (Audio recording)
- AudioContext API (Volume analysis)

**Deployment:**
- Vercel (Free tier, instant deployment)

**Storage:**
- LocalStorage (User data, scores, progress)
- IndexedDB (Session recordings if needed)

### Application Architecture

```
┌─────────────────────────────────────┐
│         User Interface              │
│  (React Components + Tailwind)      │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      State Management (Zustand)     │
│  - User progress                    │
│  - Session data                     │
│  - Achievements                     │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      Speech Analysis Engine         │
│  - Real-time transcription          │
│  - Filler word detection            │
│  - WPM calculation                  │
│  - Pause analysis                   │
│  - Volume monitoring                │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│     Browser APIs                    │
│  - Web Speech API                   │
│  - MediaRecorder API                │
│  - AudioContext API                 │
└─────────────────────────────────────┘
```

---

## 4. File Structure

```
public-speaking-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── feedback/
│   │   │   ├── LiveFeedback.tsx
│   │   │   ├── SessionReport.tsx
│   │   │   └── MetricCard.tsx
│   │   ├── gamification/
│   │   │   ├── XPBar.tsx
│   │   │   ├── AchievementBadge.tsx
│   │   │   ├── StreakCounter.tsx
│   │   │   └── LevelIndicator.tsx
│   │   ├── modes/
│   │   │   ├── ModeSelector.tsx
│   │   │   └── PromptCard.tsx
│   │   └── practice/
│   │       ├── RecordingControls.tsx
│   │       ├── AudioVisualizer.tsx
│   │       └── Timer.tsx
│   ├── store/
│   │   ├── userStore.ts          # User progress, XP, level
│   │   ├── sessionStore.ts       # Current session data
│   │   └── achievementStore.ts   # Achievements tracking
│   ├── utils/
│   │   ├── speechAnalysis.ts     # Core analysis logic
│   │   ├── scoring.ts            # Score calculation
│   │   ├── gamification.ts       # XP, achievements logic
│   │   └── constants.ts          # Filler words, thresholds
│   ├── hooks/
│   │   ├── useSpeechRecognition.ts
│   │   ├── useAudioAnalysis.ts
│   │   └── useTimer.ts
│   ├── types/
│   │   └── index.ts              # TypeScript definitions
│   ├── data/
│   │   ├── modes.ts              # Speaking mode configurations
│   │   ├── prompts.ts            # Practice prompts
│   │   └── achievements.ts       # Achievement definitions
│   ├── pages/
│   │   ├── Home.tsx              # Landing/dashboard
│   │   ├── Practice.tsx          # Main practice session
│   │   ├── Results.tsx           # Session results
│   │   ├── Progress.tsx          # User stats/progress
│   │   └── Achievements.tsx      # Achievement gallery
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 5. Development Roadmap (Today)

### Hour 1-2: Project Setup
- [x] Initialize Vite + React + TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up Zustand stores
- [ ] Create basic routing
- [ ] Deploy initial version to Vercel

### Hour 2-4: Speech Engine
- [ ] Implement Web Speech API integration
- [ ] Build real-time transcription
- [ ] Create filler word detection
- [ ] Build WPM calculator
- [ ] Implement pause detection
- [ ] Add volume analysis

### Hour 4-6: Core UI & Modes
- [ ] Build recording interface
- [ ] Create live feedback display
- [ ] Implement 5 speaking modes
- [ ] Build mode selector
- [ ] Create prompt display

### Hour 6-8: Gamification & Scoring
- [ ] Implement scoring algorithm
- [ ] Build session report UI
- [ ] Create XP system
- [ ] Build achievement system
- [ ] Add progress tracking
- [ ] Create dashboard

### Hour 8: Polish & Deploy
- [ ] Responsive design tweaks
- [ ] Add animations/transitions
- [ ] Test all modes
- [ ] Final Vercel deployment
- [ ] Create demo video/screenshots

---

## 6. Future Enhancements (Post-MVP)

### Phase 2 Features (Week 2)
- Additional speaking modes (facilitation, directing, debate, networking)
- Daily challenges system
- Leaderboards (anonymous comparison)
- Voice emotion detection
- Custom prompts (user-created scenarios)

### Phase 3 Features (Month 2)
- AI-powered personalized tips (using GPT API)
- Video recording (body language, eye contact)
- Practice with AI conversation partner
- Export session recordings
- Social sharing of achievements

### Phase 4 Features (Month 3+)
- B2B features (team accounts, admin dashboard)
- Role-play scenarios with AI responses
- Integration with calendar (scheduled practice)
- Mobile app (React Native)
- Premium tier with advanced analytics

---

## 7. Monetization Strategy (Future)

### Free Tier
- 5 sessions per week
- Basic 5 speaking modes
- Core achievements
- Standard analytics

### Premium Tier ($9.99/month)
- Unlimited sessions
- All speaking modes (12+)
- Advanced AI feedback
- Video recording & analysis
- Custom prompts
- Export data
- No ads

### Business Tier ($49/month per team)
- Everything in Premium
- Team dashboard
- Custom corporate scenarios
- Admin analytics
- Role-play with AI
- Integration with LMS

---

## 8. Success Metrics

### Week 1 Goals
- Deploy functional MVP
- Test with 5-10 beta users
- Collect initial feedback
- Fix critical bugs

### Month 1 Goals
- 100 signups
- 50 active users (3+ sessions)
- Average session score improvement: 15%
- User retention: 40% (week-over-week)

### Month 3 Goals
- 1,000 signups
- 300 active users
- 50 paying customers (5% conversion)
- Average NPS: 40+

---

## 9. Competitive Analysis

### Yoodli
**Strengths:**
- Established brand
- Good AI feedback
- Video analysis

**Weaknesses:**
- Limited gamification
- Generic scenarios
- Expensive ($99/year)

**Our Advantage:**
- Superior gamification (XP, achievements, streaks)
- More specialized modes
- Free tier more generous

### Orai
**Strengths:**
- Mobile-first
- Decent UI

**Weaknesses:**
- Basic analysis
- Few practice modes
- Minimal engagement features

**Our Advantage:**
- Deeper speech analysis
- Real-time feedback
- Better progression system

---

## 10. Next Steps (Immediate)

1. **Confirm tech stack** - Proceed with React + Vite + Vercel?
2. **Start project setup** - Initialize repository structure
3. **Build speech engine** - Core functionality first
4. **Design UI mockups** - Can start in parallel
5. **Deploy to Vercel** - Set up continuous deployment

---

## Appendix: Key Technologies

### Web Speech API
```javascript
// Example implementation
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Analyze for filler words, WPM, etc.
};
```

**Limitations:**
- Chrome/Edge only (95% market share)
- Requires internet connection
- Language support varies

**Alternative (if needed):**
- Use OpenAI Whisper API (has free tier)
- Browser-based solutions (limited accuracy)

---

## Questions for You

1. Do you want to start building now, or review this plan first?
2. Any changes to the scope/features?
3. Should I prioritize certain modes over others?
4. Do you have branding preferences (name, color scheme)?

Ready to build when you are! 🚀

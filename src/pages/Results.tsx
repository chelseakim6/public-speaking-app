import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionReport } from '../components/feedback/SessionReport';
import { Button } from '../components/common/Button';
import { useSessionStore } from '../store/sessionStore';
import { useUserStore } from '../store/userStore';
import { calculateSessionXP, checkNewAchievements } from '../utils/gamification';
import { achievements } from '../data/achievements';
import { XP_REWARDS } from '../utils/constants';

export function Results() {
  const navigate = useNavigate();
  const { sessions } = useSessionStore();
  const { addXP, updateStreak, addSession, updatePersonalBest, unlockAchievement } = useUserStore();
  const userProgress = useUserStore();

  const [xpEarned, setXpEarned] = useState(0);
  const [bonuses, setBonuses] = useState<string[]>([]);
  const [newAchievementIds, setNewAchievementIds] = useState<string[]>([]);

  const latestSession = sessions[0];

  useEffect(() => {
    if (!latestSession || !latestSession.score) {
      navigate('/');
      return;
    }

    // Update streak
    updateStreak();

    // Calculate XP
    const { xp, bonuses: xpBonuses } = calculateSessionXP(
      latestSession.score,
      latestSession.metrics,
      userProgress
    );

    // Check for new achievements
    const newAchievements = checkNewAchievements(userProgress, sessions);

    // Calculate total XP including achievements
    let totalXP = xp;
    newAchievements.forEach(achievementId => {
      const achievement = achievements.find(a => a.id === achievementId);
      if (achievement) {
        totalXP += achievement.xpReward;
        unlockAchievement(achievementId);
      }
    });

    // Update user progress
    addXP(totalXP);
    addSession((latestSession.endTime! - latestSession.startTime) / 1000);
    updatePersonalBest(latestSession.modeId, latestSession.score);

    setXpEarned(totalXP);
    setBonuses(xpBonuses);
    setNewAchievementIds(newAchievements);
  }, []);

  if (!latestSession) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Session Results</h1>
        </div>

        <SessionReport
          session={latestSession}
          xpEarned={xpEarned}
          bonuses={bonuses}
          newAchievements={newAchievementIds}
        />

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/')}
          >
            🏠 Back to Home
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/practice', {
              state: {
                modeId: latestSession.modeId,
                promptId: latestSession.promptId,
              }
            })}
          >
            🔄 Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
}

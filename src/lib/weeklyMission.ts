import type { ExerciseMode } from "./exerciseTypes";

export interface WeeklyMission {
  weekId: string;
  weekLabel: string;
  title: string;
  problem: string;
  immersion: string;
  objective: string;
  objectiveSessions: number;
  acts: Record<ExerciseMode, string>;
}

interface MissionTemplate {
  title: string;
  problem: string;
  immersion: string;
  objective: string;
  acts: Record<ExerciseMode, string>;
}

const MISSION_TEMPLATES: MissionTemplate[] = [
  {
    title: "Apartment Rescue",
    problem:
      "You have 7 days to help a friend find and negotiate an apartment in Rome.",
    immersion:
      "You are the lead negotiator. Every interaction moves the deal closer or farther away.",
    objective:
      "By Sunday, close the deal with clear rent, terms, and neighborhood tradeoffs.",
    acts: {
      quick: "Bronze: lock in core housing vocabulary and pricing phrases.",
      standard: "Silver: drill objections, comparisons, and negotiation grammar.",
      deep: "Gold: roleplay the owner call and finalize the agreement.",
    },
  },
  {
    title: "Missed Train Crisis",
    problem:
      "You missed the last direct train and must reroute across Italy before midnight.",
    immersion:
      "You are solving a live travel disruption under time pressure.",
    objective:
      "By Sunday, execute a complete backup route with tickets, timing, and contingencies.",
    acts: {
      quick: "Bronze: memorize transport and scheduling expressions.",
      standard: "Silver: drill alternatives, constraints, and conditional phrasing.",
      deep: "Gold: negotiate with station staff and secure a workable itinerary.",
    },
  },
  {
    title: "Startup Demo Week",
    problem:
      "You must pitch a product demo to an Italian partner by the end of the week.",
    immersion:
      "You are preparing as a founder with technical and business pressure.",
    objective:
      "By Sunday, deliver a clear Italian demo pitch with confident Q&A handling.",
    acts: {
      quick: "Bronze: lock key product and meeting vocabulary.",
      standard: "Silver: drill explanation patterns and objection handling.",
      deep: "Gold: run the investor Q&A simulation with Marco.",
    },
  },
];

function getISOWeek(date: Date): { year: number; week: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return { year: d.getUTCFullYear(), week };
}

function mondayFrom(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("sv-SE");
}

export function getWeekWindow(dateStr: string): {
  monday: string;
  sunday: string;
  label: string;
} {
  const ref = new Date(`${dateStr}T12:00:00`);
  const monday = mondayFrom(ref);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const label = `${monday.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${sunday.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  return { monday: formatDate(monday), sunday: formatDate(sunday), label };
}

export function getWeeklyMission(dateStr: string): WeeklyMission {
  const date = new Date(`${dateStr}T12:00:00`);
  const { year, week } = getISOWeek(date);
  const template = MISSION_TEMPLATES[(week - 1) % MISSION_TEMPLATES.length];
  const weekWindow = getWeekWindow(dateStr);
  return {
    weekId: `${year}-W${String(week).padStart(2, "0")}`,
    weekLabel: weekWindow.label,
    title: template.title,
    problem: template.problem,
    immersion: template.immersion,
    objective: template.objective,
    objectiveSessions: 5,
    acts: template.acts,
  };
}

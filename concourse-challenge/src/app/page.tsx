import React from "react";

export interface Commit {
  total: number;
  week: number;
  days: number[];
}

const getCommitHistory = async () => {
  return fetch(process.env.API_URL!)
    .then((res) => res.json() as Promise<Commit[]>)
    .then((weeks) => {
      return weeks.map(({ week, days }) => ({
        id: week,
        date: new Date(week * 1000),
        days: days.map((contributions, index) => {
          return {
            contributions,
            date: new Date(week * 1000 + 1000 * 60 * 60 * 24 * (index + 1)),
          };
        }),
      }));
    });
};

export default async function HomePage() {
  const weeks = await getCommitHistory();
  return (
    <section
      className="grid grid-flow-col gap-2 bg-white/5 p-4 overflow-x-auto"
      style={{
        gridTemplateColumns: `repeat(${weeks.length}, auto)`,
        gridTemplateRows: `repeat(${weeks[0].days.length + 1}, auto)`,
      }}
    ><span/>
    {weeks[0].days.map((day) => (
      <span className={`even:invisible w-12`} key={day.date.toISOString()}>
        {day.date.toLocaleString("default", { weekday: "short" })}
      </span>
    ))}
    {weeks.map((week, weekIndex) => [
      <span 
      key={week.id} 
      className={week.date.getMonth() === weeks[weekIndex -1]?.date.getMonth() ? 'invisible' : ''}>
        {week.date.toLocaleDateString("default", {month: "short"})}
      </span>,
      week.days.map((day) => 
      (<span key={day.date.toISOString()} 
        className="h-8 w-8" 
        title={`${day.contributions} contributions on ${day.date.toLocaleDateString("default", {month: "short"})}`}
        style={{backgroundColor: `rgba(0,255,0,${ day.contributions <= 0 ? 0 : 
          day.contributions <= 21 ? 0.2 : 
          day.contributions <= 41 ? 0.5 : 
          day.contributions <= 62 ? 0.75 : 
          1}`}}>
          </span>))
    ])}
    </section>
  );
}

// Darkest: 63-84 commits
// Darker: 42-62 commits
// Base: 21-41 commits
// Lighter: 1-21 commits
// Lightest (empty): 0 commits

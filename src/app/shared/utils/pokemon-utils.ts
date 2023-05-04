import { Stat } from "@models/detailed-pokemon.interface";

export function pkmnStatsToArray(stats: Stat[]): [number[], number] {
  const result: number[] = [];
  stats.map( (stat: Stat) => result.push(stat.value) );
  const total = result.reduce((a, b) => a + b, 0);
  return [result, total];
}

export function formatEvolutionChain<T>(arr: T[], key: keyof T): T[][] {
  const result: T[][] = [];
  const map = new Map<T[keyof T], T[]>();
  for (const obj of arr) {
      const value = obj[key];
      if (map.has(value)) {
          map.get(value)!.push(obj);
      } else {
          map.set(value, [obj]);
      }
  }
  for (const group of map.values()) {
      result.push(group);
  }
  return result;
}

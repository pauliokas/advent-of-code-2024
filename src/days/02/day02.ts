import {type Input} from './day02.input.js';

const isSafe = (report: number[]): boolean => {
  const diffs = [];
  for (let i = 1; i < report.length; i++) {
    diffs.push(report[i - 1] - report[i]);
  }

  if (diffs.some((diff) => Math.abs(diff) < 1 || Math.abs(diff) > 3)) return false;
  if (diffs.includes(0)) return false;
  if (diffs.map((diff) => Math.sign(diff)).some((sign, _, array) => sign !== array[0])) return false;

  return true;
};

export const solvePart1 = (reports: Input): number => {
  let safeReports = 0;
  for (const report of reports) {
    if (isSafe(report)) safeReports += 1;
  }

  return safeReports;
};

export const solvePart2 = (reports: Input): number => {
  let safeReports = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      safeReports += 1;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      const modifiedReport = [...report];
      modifiedReport.splice(i, 1);
      if (isSafe(modifiedReport)) {
        safeReports += 1;
        break;
      }
    }
  }

  return safeReports;
};

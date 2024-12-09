import {type Filesystem} from './day09.input.js';

const checksum = (filesystem: Filesystem): number => {
  let sum = 0;
  for (const file of filesystem) {
    for (let i = 0; i < file.size; i += 1) sum += file.id * (file.offset + i);
  }

  return sum;
};

export const solvePart1 = (filesystem: Filesystem): number => {
  for (let i = 0; i < filesystem.length - 1; i += 1) {
    const freeSpace = filesystem[i + 1].offset - (filesystem[i].offset + filesystem[i].size);
    if (freeSpace === 0) continue;

    const lastFile = filesystem.at(-1)!;
    const claimedSpace = Math.min(freeSpace, lastFile.size);
    lastFile.size -= claimedSpace;
    if (lastFile.size === 0) filesystem.splice(-1, 1);

    filesystem.splice(i + 1, 0, {
      offset: filesystem[i].offset + filesystem[i].size,
      size: claimedSpace,
      id: lastFile.id,
    });
  }

  return checksum(filesystem);
};

export const solvePart2 = (filesystem: Filesystem): number => {
  const consideredFiles = new Set<number>();
  for (let i = filesystem.length - 1; i >= 0; i -= 1) {
    const file = filesystem[i];
    if (consideredFiles.has(file.id)) continue;
    consideredFiles.add(file.id);

    const newLocationIndex = filesystem.findIndex(
      (f, index, fs) =>
        index > 0 && index <= i && fs[index].offset - (fs[index - 1].offset + fs[index - 1].size) >= file.size,
    );
    if (newLocationIndex < 0) continue;

    file.offset = filesystem[newLocationIndex - 1].offset + filesystem[newLocationIndex - 1].size;
    filesystem.splice(i, 1);
    filesystem.splice(newLocationIndex, 0, file);

    i += 1; // File got moved to front, so in the next iteration i still has to point to the same location
  }

  return checksum(filesystem);
};

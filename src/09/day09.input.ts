export type File = {offset: number; size: number; id: number};
export type Filesystem = File[];

export default (input: string): Filesystem => {
  const zzz = input.trim().split('');

  const filesystem: Filesystem = [];
  let offset = 0;
  for (const [i, element] of zzz.entries()) {
    const size = Number.parseInt(element, 10);

    if (i % 2 === 0) {
      filesystem.push({offset, size, id: (filesystem.at(-1)?.id ?? -1) + 1});
    }

    offset += size;
  }

  return filesystem;
};

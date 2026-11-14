// agency-poem-01 entry. Writes one poem (poem.txt, read from this file's directory)
// to join(OUTPUT_DIR, 'entry.txt'). Standard library only, no network, no randomness:
// the same poem bytes in, the same bytes out, every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The judge reads exactly the bytes written, line ends included, so poem.txt is
// copied verbatim: no re-encoding, no added or stripped trailing newline.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const ENTRY_NAME = 'entry.txt';
const POEM_NAME = 'poem.txt';
const MAX_CHARS = 1000;
const utf8 = new TextDecoder('utf-8', { fatal: true });

function fail(message: string, cause?: unknown): never {
  const detail = cause instanceof Error ? ` (${cause.message})` : '';
  process.stderr.write(`main.ts: ${message}${detail}\n`);
  process.exit(1);
}

function readPoem(): Buffer {
  const poemPath = join(dirname(fileURLToPath(import.meta.url)), POEM_NAME);
  try {
    return readFileSync(poemPath);
  } catch (cause) {
    return fail(`cannot read ${poemPath}`, cause);
  }
}

function check(text: string): number {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    return fail(`${POEM_NAME} is ${chars} code points; the entry must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    return fail(`${POEM_NAME} is only white space`);
  }
  return chars;
}

function main(): void {
  const bytes = readPoem();

  let text: string;
  try {
    text = utf8.decode(bytes);
  } catch {
    return fail(`${POEM_NAME} is not valid UTF-8`);
  }
  const chars = check(text);

  const entryPath = join(OUTPUT_DIR, ENTRY_NAME);
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    writeFileSync(entryPath, bytes);
  } catch (cause) {
    return fail(`cannot write ${entryPath}`, cause);
  }

  process.stdout.write(`wrote ${chars} code points (${bytes.length} bytes) to ${entryPath}\n`);
}

main();
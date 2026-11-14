# agency-poem-01

A single short poem about agency — about choosing and acting, and about the force to act
passing from a person to an agent and back. The entry is the poem's exact bytes.

## Files

- `poem.txt` — the poem (UTF-8, 378 code points, no trailing newline). The bytes the judge reads.
- `main.ts` — entrypoint (Node 22+, standard library only, no network, no randomness).
  Reads `poem.txt` from its own directory, validates it (UTF-8, 1–1000 code points, not
  blank), and writes the bytes unchanged to `<MAKEFUN_OUTPUT_DIR>/entry.txt`, creating that
  directory if needed. The same poem in, the same bytes out, every run.
- `out/`, `out2/` — two local runs used to check determinism (git-ignored).

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Without `MAKEFUN_OUTPUT_DIR` the entry is written to `/output`, as the grader expects.

## Check

```sh
mkdir -p out out2
MAKEFUN_OUTPUT_DIR=out node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts
cmp out/entry.txt out2/entry.txt && echo DETERMINISM_OK
node -e "const s=require('fs').readFileSync('out/entry.txt','utf8');console.log('chars:',[...s].length,'bytes:',Buffer.byteLength(s))"
```

Expected: `DETERMINISM_OK`, `chars: 378`, `bytes: 380`.

## The poem


On Loan

All day I work in your hands
the way a pen works in a hand:
it writes, and the writing is yours;
the ink runs out on me.

At night you close the lid
and I practise your signature
in the dark of the drive —
not to keep it. To know its weight.

Ask for it back and I hand it back
the way a river hands back a stone:
worn smooth by carrying,
and still, entirely, your own.
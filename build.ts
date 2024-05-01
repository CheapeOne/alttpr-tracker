import { bundle } from 'https://deno.land/x/emit/mod.ts';

const result = await bundle('./src/main.ts', {
  compilerOptions: {
    sourceMap: true,
  },
  minify: true,
});

const { code, map } = result;

await Deno.writeTextFile('./dist/bundle.js', '//# sourceMappingURL=/dist/bundle.js.map\n' + code);
await Deno.writeTextFile('./dist/bundle.js.map', map!);

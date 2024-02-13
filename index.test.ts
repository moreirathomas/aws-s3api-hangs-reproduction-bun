import { expect, test } from "bun:test";
import { join } from "node:path";
import { list } from "./index";

const PROJECT = "develop/balyo_RHE-BASE-010_v2_01";
const RELEASE = "0.0.0-rc.1";

test("list folder with few objects", async () => {
  const path = join(PROJECT, RELEASE);
  const result = await list(path);
  expect(result.length).toBe(2);
});

test("list folder with many objects", async () => {
  const path = join(PROJECT, RELEASE, "tiles");
  const result = await list(path);
  expect(result.length).toBe(884);
});

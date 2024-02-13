# aws-s3api-hangs-reproduction-bun

To install dependencies:

```bash
bun install
```

To test:

```bash
bun test index.test.ts
```

Tweak the `pageSize` variable in `index.ts` to see the bug in action.

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

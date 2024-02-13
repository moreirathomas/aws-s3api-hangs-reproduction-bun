import {
  S3Client,
  paginateListObjectsV2,
  type CommonPrefix,
  type _Object,
} from "@aws-sdk/client-s3";

function mustGetEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const client = new S3Client({
  region: mustGetEnv("AWS_REGION"),
  credentials: {
    accessKeyId: mustGetEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: mustGetEnv("AWS_SECRET_ACCESS_KEY"),
  },
});

export async function list(path: string): Promise<(_Object | CommonPrefix)[]> {
  const paginator = paginateListObjectsV2(
    {
      client,
      pageSize: 1000, // tweak this value, max is 1000
    },
    {
      Bucket: mustGetEnv("AWS_BUCKET"),
      Prefix: `${path}/`,
      Delimiter: "/",
    }
  );

  const objects: (_Object | CommonPrefix)[] = [];

  for await (const page of paginator) {
    if (page.Contents) {
      objects.push(...page.Contents);
    }
    if (page.CommonPrefixes) {
      objects.push(...page.CommonPrefixes);
    }
  }

  return objects;
}

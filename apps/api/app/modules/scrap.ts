import _ from "lodash";
import { AppContent, ScoopStatus, AppStatus, AppInfo } from "../types/types";
import execa from "execa";
import fs from "node:fs/promises";
import path from "node:path";

type Path = Buffer | string;

const SCOOP_PATH: Path =
  process.env["SCOOP"] || `${process.env["USERPROFILE"]}\\scoop`;
const BUCKETS_PATH = `${process.env["USERPROFILE"]}\\scoop\\buckets`;

const bucketNames = {
  main: `${process.env["SCOOP"]}\\buckets\\main\\bucket`,
  extras: `${process.env["SCOOP"]}\\buckets\\extras\\bucket`,
};

const installedBucketPath = `${SCOOP_PATH}\\buckets`;
const availableBucketList = `${SCOOP_PATH}\\apps\\scoop\\current\\buckets.json`;

const getDirectoryFiles = async function (
  directoryPath: Path
): Promise<string[]> {
  try {
    return await fs.readdir(directoryPath);
  } catch (error: unknown) {
    throw error;
  }
};

const getAvailableBuckets = async function (): Promise<string[]> {
  try {
    return await fs
      .readFile(availableBucketList, { encoding: "utf8" })
      .then(async (item) => {
        const bucketsList = Object.keys(
          JSON.parse(item) as Record<string, unknown>
        );
        return getDirectoryFiles(installedBucketPath).then((instBuckets) => {
          const instBucketsArray = Object.keys(instBuckets).map(
            (key) => instBuckets[key]
          ); // extract the array of bucket names from the object
          return _.difference(bucketsList, instBucketsArray);
        });
      });
  } catch (error: unknown) {
    throw error;
  }
};

// const getAvailableBuckets = async function (): Promise<string[]> {
//   try {
//     const item = await fs.readFile(availableBucketList, {
//       encoding: "utf8",
//     });
//     const bucketsList = Object.keys(
//       JSON.parse(item) as Record<string, unknown>
//     );
//     const instBuckets = await getDirectoryFiles(installedBucketPath);
//     const instBucketsArray = Object.keys(instBuckets).map(
//       (key) => instBuckets[key]
//     );
//     const availableBuckets = bucketsList.filter(
//       (bucket) => !instBucketsArray.includes(bucket)
//     );
//     return availableBuckets;
//   } catch (error: unknown) {
//     throw error;
//   }
// };

const getInstalledBuckets = async function (): Promise<string[]> {
  try {
    return await getDirectoryFiles(installedBucketPath);
  } catch (error: unknown) {
    throw error;
  }
};

const parseJsonFiles = async function (
  fileNames: string[]
): Promise<AppContent[]> {
  return Promise.all(
    fileNames.map(async (file) =>
      fs
        .readFile(path.join(BUCKETS_PATH as string, file))
        .then((buffer) => JSON.parse(buffer.toString()))
    )
  );
};

const getApps = async function (): Promise<AppContent[]> {
  try {
    const files = await getDirectoryFiles(BUCKETS_PATH);
    const apps = await parseJsonFiles(files);
    return apps;
  } catch (error: unknown) {
    throw error;
  }
};

const getScoopStatus = async function (stdout: string): Promise<ScoopStatus> {
  const text = stdout.split("\n");
  const lines = text.slice(4, text.length - 3);
  const appStatus: AppStatus[] = lines.map((line) => {
    const appText = line.replace(/\s+/g, " ").trim();
    const appInfos = appText.split(" ");
    const [name, installedVersion, latestVersion, missingDependencies, Info] =
      appInfos;
    return { name, installedVersion, latestVersion, missingDependencies, Info };
  });
  return {
    status: text[0],
    apps: appStatus,
  };
};

const getAppInfo = async function (stdout: string) {
  const text = stdout.split("\n");
  return text.slice(2, text.length - 3).reduce((result, line) => {
    const [key, value] = line.replace(/\s+/g, " ").trim().split(" : ");
    result[key.toLowerCase()] = value;
    return result;
  }, {} as AppInfo);
};

const getInstalledApps = async function (): Promise<string[]> {
  const { stdout } = await execa("es", ["-p", BUCKETS_PATH, "-s", "*.json"]);
  const list = stdout
    .split("\r\n")
    .filter((item) => item.includes("\\bucket\\"));
  return list.map((item) => {
    const name = item.split("\\");
    return name[name.length - 1].split(".")[0];
  });
};

const getAvailableApps = async function (): Promise<string[]> {
  const buckets = await getInstalledBuckets();
  const installedAppsList = await getDirectoryFiles(
    "C:\\Users\\Mathis\\scoop\\apps"
  );
  const list = await Promise.all(
    buckets.map(async (bucket) => {
      const bucketPath = `${BUCKETS_PATH}\\${bucket}\\bucket`;
      const { stdout } = await execa("es", ["-p", bucketPath, "-s", "*.json"]);
      return stdout.split("\r\n").flatMap((item) => {
        const name = item.split("\\");
        return name[name.length - 1].split(".")[0];
      });
    })
  );
  return _.difference(list.flat(), installedAppsList);
};

export {
  getApps,
  getDirectoryFiles,
  getAvailableBuckets,
  getInstalledBuckets,
  getInstalledApps,
  getAvailableApps,
  getScoopStatus,
  getAppInfo,
};

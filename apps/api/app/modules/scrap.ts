import { AppContent, ScoopStatus, AppStatus, AppInfo } from "../types/types";
import fs from "node:fs/promises";
import path from "node:path";

type Path = Buffer | string;

const bucketNames = {
  main: `${process.env["SCOOP"]}\\buckets\\main\\bucket`,
  extras: `${process.env["SCOOP"]}\\buckets\\extras\\bucket`,
};
// const installedAppsPath = `${process.env["SCOOP"]}\\apps`;
const installedBucketPath = `${process.env["SCOOP"]}\\buckets`;
const availableBucketList = `${process.env["SCOOP"]}\\apps\\scoop\\current\\buckets.json`;

const getDirectoryFiles = async function (
  directoryPath: Path
): Promise<string[]> {
  try {
    return await fs.readdir(directoryPath);
  } catch (error: unknown) {
    throw error;
  }
};

const getInstallableBuckets = async function (): Promise<string[]> {
  try {
    const item = await fs.readFile(availableBucketList, { encoding: "utf8" });
    const bucketsList = Object.keys(
      JSON.parse(item) as Record<string, unknown>
    );
    const instBuckets = await getDirectoryFiles(installedBucketPath);
    const instBucketsArray = Object.keys(instBuckets).map(
      (key) => instBuckets[key]
    );
    const difference = bucketsList.filter(
      (bucket) => !instBucketsArray.includes(bucket)
    );
    return difference;
  } catch (error: unknown) {
    throw error;
  }
};

const getFilesContent = async function (
  bucketPath: Path
): Promise<AppContent[]> {
  try {
    const files = await getDirectoryFiles(bucketPath);
    return await parseJsonFiles(files, bucketPath);
  } catch (error: unknown) {
    throw error;
  }
};

const parseJsonFiles = async function (
  fileNames: string[],
  bucketPath: Path
): Promise<AppContent[]> {
  return Promise.all(
    fileNames.map(async (file) =>
      fs
        .readFile(path.join(bucketPath as string, file))
        .then((buffer) => JSON.parse(buffer.toString()))
    )
  );
};

const getApps = async function (): Promise<AppContent[]> {
  try {
    const apps = await getFilesContent(bucketNames.extras);
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

export {
  getApps,
  getDirectoryFiles,
  getFilesContent,
  getInstallableBuckets,
  getScoopStatus,
  getAppInfo,
};

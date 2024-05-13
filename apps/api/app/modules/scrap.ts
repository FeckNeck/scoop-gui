import _ from "lodash";
import { AppContent, AppNamePath } from "../types/types";
import fs from "node:fs/promises";
import path, { basename, extname } from "node:path";

type Path = Buffer | string;

const SCOOP_PATH: Path =
  process.env["SCOOP"] || `${process.env["USERPROFILE"]}\\scoop`;
const BUCKETS_PATH = `${process.env["USERPROFILE"]}\\scoop\\buckets`;

const INSTALLED_BUCKET_PATH = `${SCOOP_PATH}\\buckets`;
const AVAILABLE_BUCKET_PATH = `${SCOOP_PATH}\\apps\\scoop\\current\\buckets.json`;

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
      .readFile(AVAILABLE_BUCKET_PATH, { encoding: "utf8" })
      .then(async (item) => {
        const bucketsList = Object.keys(
          JSON.parse(item) as Record<string, unknown>
        );
        return getDirectoryFiles(INSTALLED_BUCKET_PATH).then((instBuckets) => {
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

const getInstalledBuckets = async function (): Promise<string[]> {
  try {
    return await getDirectoryFiles(INSTALLED_BUCKET_PATH);
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

const parseJsonFromFile = async (filePath: string): Promise<AppContent> => {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error: unknown) {
    throw error;
  }
};

const getScoopStatus = async function (stdout: string): Promise<string[]> {
  const text = stdout.split("\n");
  const lines = text.slice(4, text.length - 1);
  return lines.map((line) => {
    const appText = line.replace(/\s+/g, " ").trim();
    return appText.split(" ")[0];
  });
};

const getAppInfo = async function (appName: string) {
  const apps = await getApps();
  const app = apps.find(
    (app) => app.name.toLocaleLowerCase() === appName.toLocaleLowerCase()
  );
  return await parseJsonFromFile(`${app?.path}\\${app?.name}.json`);
};

const getInstalledApps = async function (): Promise<string[]> {
  return await getDirectoryFiles(`${SCOOP_PATH}\\apps`);
};

const getAvailableApps = async function (): Promise<AppNamePath[]> {
  const buckets = await getInstalledBuckets();
  const bucketPaths = buckets.map(
    (bucket) => `${BUCKETS_PATH}\\${bucket}\\bucket`
  );
  const availableApps = bucketPaths.map(async (path) => {
    const files = await getDirectoryFiles(path);
    return files.map((file) => ({
      path: path,
      name: basename(file, extname(file)),
    }));
  });
  return Promise.all(availableApps).then((result) => result.flat());
};

const getApps = async function (): Promise<AppNamePath[]> {
  const installedAppsList = await getInstalledApps();
  const availableApps = await Promise.all(await getAvailableApps());
  const apps = availableApps.map((app) => ({
    name: app.name,
    path: app.path,
    state: installedAppsList.includes(app.name) ? "installed" : "available",
  }));
  return apps;
};

export {
  getApps,
  getDirectoryFiles,
  getAvailableBuckets,
  getInstalledBuckets,
  getScoopStatus,
  getAppInfo,
  getAvailableApps,
  getInstalledApps,
};

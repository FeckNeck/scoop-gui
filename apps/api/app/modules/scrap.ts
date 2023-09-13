import _ from "lodash";
import {
  AppContent,
  ScoopStatus,
  AppStatus,
  AppNamePath,
} from "../types/types";
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

const getAppInfo = async function (appName: string) {
  const availableApps = await getAvailableApps();
  const installedApps = await getInstalledApps();
  const availableAppsName = availableApps.flat();
  const installedAppsName = installedApps.flat();
  const appsName = _.unionBy(availableAppsName, installedAppsName, "name");
  // const app = appsName.find(
  //   (app) => app.name.toLocaleLowerCase() === appName.toLocaleLowerCase()
  // );
  // const data = await parseJsonFromFile(`${app.path}\\${app.name}.json`);
  return appsName;
};

const getInstalledApps = async function (): Promise<AppNamePath[]> {
  const apps = await getDirectoryFiles(`${SCOOP_PATH}\\apps`);
  return apps.map((app) => ({
    name: basename(app, extname(app)),
    path: `${SCOOP_PATH}\\apps`,
  }));
};

const getAvailableAppsName = async function (): Promise<AppNamePath[]> {
  const buckets = await getInstalledBuckets();
  const bucketPaths = buckets.map(
    (bucket) => `${BUCKETS_PATH}\\${bucket}\\bucket`
  );
  const appNames = bucketPaths.map(async (path) => {
    const files = await getDirectoryFiles(path);
    return files.map((file) => ({
      path: path,
      name: basename(file, extname(file)),
    }));
  });

  return Promise.all(appNames).then((result) => result.flat());
};

const getAvailableApps = async function () {
  const installedAppsList = await getInstalledApps();
  const allAvailableApps = await Promise.all(await getAvailableAppsName());
  const names = allAvailableApps.map((app) => ({
    name: app.name,
    path: app.path,
  }));

  return _.differenceBy(
    names,
    installedAppsList.map((app) => ({ name: app.name, path: app.path })),
    "name"
  );
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

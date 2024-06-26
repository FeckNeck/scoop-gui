export interface AppContent {
  version: string;
  description: string;
  homepage: string;
  license: string;
  shortcuts: string[];
  notes: string;
  url: string;
  hash: string;
  bin: string[];
}

export interface AppItem {
  name: string;
  path: string;
  state: "installed" | "available";
  update?: boolean;
}

export interface AppStatus {
  name: string;
  installedVersion: string;
  latestVersion: string;
  missingDependencies?: string;
  Info?: string;
}

export interface AppInfo {
  name: string;
  description: string;
  version: string;
  bucket: string;
  website: string;
  license: string;
  updatedAt: string;
  updatedBy: string;
  installed: string;
  shortcuts: string;
}

export interface ScoopStatus {
  status: string;
  apps: AppStatus[];
}

export interface Bucket {
  name: string;
  loading: boolean;
}

export interface SearchParams {
  appName?: string;
  state?: string;
  bucket?: string;
}

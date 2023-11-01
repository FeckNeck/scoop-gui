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

export interface AppStatus {
  name: string;
  installedVersion: string;
  latestVersion: string;
  missingDependencies?: string;
  Info?: string;
}

export interface AppNamePath {
  name: string;
  path: string;
  state?: string;
}

export interface ScoopStatus {
  status: string;
  apps: AppStatus[];
}

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

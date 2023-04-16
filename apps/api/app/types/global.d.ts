declare interface AppContent {
  version: string;
  description: string;
  homepage: string;
  license: string;
  suggest: {
    java: string[];
  };
  notes: string;
  url: string;
  hash: string;
  bin: string[];
}

declare interface AppStatus {
  name: string;
  installedVersion: string;
  latestVersion: string;
  missingDependencies?: string;
  Info?: string;
}

declare interface AppInfo {
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

declare interface ScoopStatus {
  status: string;
  apps: AppStatus[];
}

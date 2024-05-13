import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import {
  getApps,
  getAppInfo,
  getInstalledApps,
  getAvailableApps,
} from "../../modules/scrap";
import execa from "execa";

export default class AppsController {
  public async index({ request }: HttpContextContract) {
    const { appName, state, bucket } = request.qs();
    const apps = await getApps();

    if (!appName && !state && !bucket) {
      return apps;
    }

    return apps.filter((app) => {
      return (
        (!appName || app.name.includes(appName)) &&
        (!state || app.state === state) &&
        (!bucket || app.path.includes(bucket))
      );
    });
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const appInfo = getAppInfo(id);
    return appInfo;
  }

  public async installed() {
    const apps = getInstalledApps();
    return apps;
  }

  public async available() {
    const apps = getAvailableApps();
    return apps;
  }

  public async install({ params, response }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["install", id]);
    if (stdout.includes("WARN")) {
      return response.status(403).send(id + " is already installed");
    }
    if (stdout.includes("was installed successfully")) {
      return response.send(id + " was installed successfully !");
    }
    return response.status(403).send(id + " not found");
  }

  public async uninstall({ params, response }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["uninstall", id]);
    if (stdout.includes("ERROR")) {
      return response.status(403).send(id + " is not installed");
    }
    return response.send(id + " was uninstalled successfully !");
  }
}

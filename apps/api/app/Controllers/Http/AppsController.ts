import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import {
  getApps,
  getAppInfo,
  getInstalledApps,
  getAvailableApps,
} from "../../modules/scrap";
import execa from "execa";

export default class AppsController {
  public async index() {
    const apps = await getApps();
    return apps;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["info", id]);
    const appInfo = getAppInfo(stdout);
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
}

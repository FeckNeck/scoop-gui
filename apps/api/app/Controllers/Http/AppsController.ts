import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getApps, getAppInfo } from "../../modules/scrap";
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

  public async installed({}: HttpContextContract) {
    return "List of installed apps";
  }

  public async installable({}: HttpContextContract) {
    return "List of installable apps";
  }

  public async store({ params }: HttpContextContract) {
    return `Install app ${params.id}`;
  }

  public async destroy({ params }: HttpContextContract) {
    return `Uninstall app ${params.id}`;
  }
}

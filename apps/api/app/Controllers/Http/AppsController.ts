import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getApps } from "../../modules/scrap";

export default class AppsController {
  public async index() {
    const apps = await getApps();
    return apps;
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

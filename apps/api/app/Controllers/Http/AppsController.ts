import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AppsController {
  public async index({}: HttpContextContract) {
    return "List of apps";
  }

  public async show({ params }: HttpContextContract) {
    return `Show app ${params.id}`;
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

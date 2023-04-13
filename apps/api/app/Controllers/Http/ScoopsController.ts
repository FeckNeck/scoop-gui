import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ScoopsController {
  public async show({ params }: HttpContextContract) {
    return `Show scoop ${params.id}`;
  }

  public async updateAll({}: HttpContextContract) {
    return "Update all apps";
  }

  public async update({ params }: HttpContextContract) {
    return `Update app ${params.id}`;
  }

  public async cleanAll({}: HttpContextContract) {
    return "Clean all apps";
  }

  public async clean({ params }: HttpContextContract) {
    return `Clean app ${params.id}`;
  }
}

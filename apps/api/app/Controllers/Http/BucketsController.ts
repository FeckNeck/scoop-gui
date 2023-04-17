import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class BucketsController {
  public async index({}: HttpContextContract) {
    return "List of buckets";
  }

  public async installed({}: HttpContextContract) {
    return "List of installed buckets";
  }

  public async installable({}: HttpContextContract) {
    return "List of installable buckets";
  }

  public async store({ params }: HttpContextContract) {
    return `Install bucket ${params.id}`;
  }

  public async destroy({ params }: HttpContextContract) {
    return `Uninstall bucket ${params.id}`;
  }
}

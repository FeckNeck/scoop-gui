import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getScoopStatus, getAppInfo } from "../../modules/scrap";
import execa from "execa";

export default class ScoopsController {
  public async status() {
    const { stdout } = await execa("scoop", ["status"]);
    const ScoopStatus = getScoopStatus(stdout);
    return ScoopStatus;
  }

  public async install({ params }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["install", id]);
    return stdout;
  }

  public async updateAll() {
    const { stdout } = await execa("scoop", ["update", "*"]);
    return stdout;
  }

  public async update({ params }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["update", id]);
    return stdout;
  }

  public async cleanAll() {
    const { stdout } = await execa("scoop", ["clean", "*"]);
    return stdout;
  }

  public async clean({ params }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["clean", id]);
    return stdout;
  }
}

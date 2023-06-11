import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getScoopStatus } from "../../modules/scrap";
import execa from "execa";

export default class ScoopsController {
  public async status() {
    const { stdout } = await execa("scoop", ["status"]);
    const ScoopStatus = getScoopStatus(stdout);
    return ScoopStatus;
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

  public async updateAll() {
    const { stdout } = await execa("scoop", ["update", "*"]);
    return stdout;
  }

  public async update({ params, response }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["update", id]);
    if (stdout.includes("ERROR")) {
      return response.status(403).send(id + " is not installed");
    }
    if (stdout.includes("Latest versions for all apps are installed")) {
      return response.send("Latest versions for all apps are installed");
    }
    return stdout;
  }

  public async cleanAll() {
    const { stdout } = await execa("scoop", ["cleanup", "*"]);
    return stdout;
  }

  public async clean({ params }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["cleanup", id]);
    return stdout;
  }
}

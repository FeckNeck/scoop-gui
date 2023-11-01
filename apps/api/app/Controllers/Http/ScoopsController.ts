import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getScoopStatus } from "../../modules/scrap";
import execa from "execa";

export default class ScoopsController {
  public async status() {
    const { stdout } = await execa("scoop", ["status"]);
    const ScoopStatus = getScoopStatus(stdout);
    return ScoopStatus;
  }

  public async cache() {
    const { stdout } = await execa("scoop", ["cache"]);
    const cache = stdout.split("\n")[1];
    return cache;
  }

  public async check() {
    const { stdout } = await execa("scoop", ["-v"]);
    if (stdout.includes("Current Scoop version:")) {
      return true;
    }
    return false;
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

  public async clean({ params }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["cleanup", id]);
    return stdout;
  }

  public async import({ params }: HttpContextContract) {
    const { path } = params;
    const { stdout } = await execa("scoop", ["import", path]);
    return stdout;
  }

  public async export() {
    const { stdout } = await execa("scoop", ["export"]);
    return stdout;
  }
}

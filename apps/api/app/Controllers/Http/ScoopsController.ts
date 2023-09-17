import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getScoopStatus } from "../../modules/scrap";
import execa from "execa";
import fs from "fs";
import Application from "@ioc:Adonis/Core/Application";

export default class ScoopsController {
  public async status() {
    const { stdout } = await execa("scoop", ["status"]);
    const ScoopStatus = getScoopStatus(stdout);
    return ScoopStatus;
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

  public async check() {
    const { stdout } = await execa("scoop", ["-v"]);
    if (stdout.includes("Current Scoop version:")) {
      return true;
    }
    return false;
  }

  public async import() {
    const { stdout } = await execa("scoop", ["import"]);
    return stdout;
  }

  public async export({ request, response }: HttpContextContract) {
    // const file = request.file("file");
    // if (file) {
    //   await file.move(Application.tmpPath("uploads"));
    // }
    return response.download(Application.tmpPath("uploads/eric_mange.jpg"));
  }
}

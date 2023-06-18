import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getAvailableBuckets, getInstalledBuckets } from "../../modules/scrap";
import execa from "execa";

export default class BucketsController {
  public async installed() {
    const buckets = getInstalledBuckets();
    return buckets;
  }

  public async available() {
    const buckets = getAvailableBuckets();
    return buckets;
  }

  public async add({ params, response }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["bucket", "add", id]);
    if (stdout.includes("WARN")) {
      return response.status(403).send("Bucket already installed");
    }
    if (stdout.includes("Unknown")) {
      return response.status(403).send("Bucket not found");
    }
    return "bucket added successfully";
  }

  public async remove({ params, response }: HttpContextContract) {
    const { id } = params;
    const { stdout } = await execa("scoop", ["bucket", "rm", id]);
    if (stdout.includes("WARN")) {
      return response.status(403).send("Bucket not installed");
    }
    if (stdout.includes("Unknown")) {
      return response.status(403).send("Bucket not found");
    }
    return "bucket removed successfully";
  }
}

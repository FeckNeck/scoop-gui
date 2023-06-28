import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { getAvailableBuckets, getInstalledBuckets } from "../../modules/scrap";
import execa from "execa";

export default class BucketsController {
  public async installed() {
    const buckets = await getInstalledBuckets();
    if (buckets.length === 0) return "You don't have any bucket installed";
    return buckets;
  }

  public async available() {
    const buckets = await getAvailableBuckets();
    if (buckets.length === 0) return "All buckets are installed";
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
    return id;
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
    return id;
  }
}

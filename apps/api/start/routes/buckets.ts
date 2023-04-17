import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "BucketsController.index").as("index");
  Route.get("/installed", "BucketsController.installed").as("installed");
  Route.get("/installable", "BucketsController.installable").as("installable");
  Route.post("/:id", "BucketsController.store").as("store");
  Route.delete("/:id", "BucketsController.destroy").as("destroy");
})
  .prefix("/buckets")
  .as("buckets");

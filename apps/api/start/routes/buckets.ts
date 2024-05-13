import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/installed", "BucketsController.installed").as("installed");
  Route.get("/available", "BucketsController.available").as("available");
  Route.post("/:id", "BucketsController.add").as("add");
  Route.delete("/:id", "BucketsController.remove").as("remove");
})
  .prefix("/buckets")
  .as("buckets");

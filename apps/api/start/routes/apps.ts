import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/installed", "AppsController.installed").as("installed");
  Route.get("/available", "AppsController.available").as("available");
  Route.get("/:id", "AppsController.show").as("show");
  Route.get("/", "AppsController.index").as("index");
})
  .prefix("/apps")
  .as("apps");

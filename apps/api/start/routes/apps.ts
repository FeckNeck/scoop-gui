import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "AppsController.index").as("index");
  Route.get("/:id", "AppsController.show").as("show");
  Route.get("/installed", "AppsController.installed").as("installed");
  Route.get("/installable", "AppsController.installable").as("installable");
  Route.post("/:id", "AppsController.store").as("store");
  Route.delete("/:id", "AppsController.destroy").as("destroy");
})
  .prefix("/apps")
  .as("apps");

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/installed", "AppsController.installed").as("installed");
  Route.get("/available", "AppsController.available").as("available");
  Route.get("/:id", "AppsController.show").as("show");
  Route.get("/", "AppsController.index").as("index");

  Route.post("/:id", "AppsController.install").as("install");
  Route.delete("/:id", "AppsController.uninstall").as("uninstall");
})
  .prefix("/apps")
  .as("apps");

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/:id", "AppsController.show").as("show");
  Route.group(() => {
    Route.post("/", "AppsController.updateAll").as("updateAll");
    Route.put("/:id", "AppsController.update").as("update");
  })
    .prefix("/update")
    .as("update");
  Route.group(() => {
    Route.post("/", "AppsController.cleanAll").as("cleanAll");
    Route.put("/:id", "AppsController.clean").as("clean");
  })
    .prefix("/clean")
    .as("clean");
})
  .prefix("/scoop")
  .as("scoop");

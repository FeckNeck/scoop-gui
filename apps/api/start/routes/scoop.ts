import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/status", "ScoopsController.status").as("status");

  Route.group(() => {
    Route.post("/", "ScoopsController.updateAll").as("updateAll");
    Route.put("/:id", "ScoopsController.update").as("update");
  })
    .prefix("/update")
    .as("update");

  Route.group(() => {
    Route.post("/", "ScoopsController.cleanAll").as("cleanAll");
    Route.put("/:id", "ScoopsController.clean").as("clean");
  })
    .prefix("/clean")
    .as("clean");

  Route.post("/install", "ScoopsController.install").as("install");
  Route.delete("/uninstall", "ScoopsController.uninstall").as("uninstall");
})
  .prefix("/scoop")
  .as("scoop");

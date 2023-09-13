import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/status", "ScoopsController.status").as("status");
  Route.get("/check", "ScoopsController.check").as("check");

  Route.post("/import", "ScoopsController.import").as("import");
  Route.post("/export", "ScoopsController.export").as("export");

  Route.post("/install/:id", "ScoopsController.install").as("install");
  Route.delete("/uninstall/:id", "ScoopsController.uninstall").as("uninstall");

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
})
  .prefix("/scoop")
  .as("scoop");

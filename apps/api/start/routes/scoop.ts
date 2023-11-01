import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/status", "ScoopsController.status").as("status");
  Route.get("/cache", "ScoopsController.cache").as("cache");
  Route.get("/check", "ScoopsController.check").as("check");

  Route.post("/import", "ScoopsController.import").as("import");
  Route.post("/export", "ScoopsController.export").as("export");

  Route.post("/update/:id", "ScoopsController.update").as("update");
  Route.post("/clean/:id", "ScoopsController.clean").as("clean");
})
  .prefix("/scoop")
  .as("scoop");

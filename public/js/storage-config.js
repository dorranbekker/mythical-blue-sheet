// Mythical Blue · environment-aware storage configuration
// GitHub Pages uses browser-local test data.
// Local server mode uses shared /api filesystem handlers.

(() => {
  const hostname = window.location.hostname;
  const isLocalTestEnvironment =
    !hostname ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".github.io");

  window.APP_CONFIG = {
    storageMode: isLocalTestEnvironment ? "local" : "api",
    localStorageKey: "mythicalBlueSheetTestCharactersV2",
    seedIndexUrl: "characters/test-character-index.json"
  };
})();

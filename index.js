const APPS_DIV = getEl("apps");
const HEADER_DIV = getEl("header");

function getApps() {
  return [...Array(10)].map((_, i) => ({
    name: `${i}`,
    url: `${i}`,
    render: () => {
      const div = document.createElement("div");
      div.innerText = `${i}`;
      return div;
    }
  }));
}

/**
 *
 * @param {*} query
 * @returns a filter function
 */
function getFilterFromQuery(query) {
  if (!query || query.trim() === "") return apps => apps.filter(_ => true);
  return apps => {
    return apps.filter(({ name }) =>
      query.toLowerCase().includes(name.toLowerCase())
    );
  };
}

/**
 *
 * @param {*} settings
 * @returns a sort function
 */
function getSortApps(settings) {
  return apps => apps.sort((a, b) => settings.order === "increasing" ? a.name - b.name : b.name - a.name);
}

function renderApps(apps) {
  removeAllChildNodes(APPS_DIV);
  apps.forEach(app => {
    APPS_DIV.appendChild(app.render());
  });
}

function createApps(settings, query) {
  const apps = getApps();
  const sortApps = getSortApps(settings);
  const filterApps = getFilterFromQuery(query);
  renderApps(sortApps(filterApps(apps)));
}

/**
 * @param {*} onChange: query => {}
 * returns search object
 */
function createSearch(onChange) {
  const search = document.createElement("div");
  const input = document.createElement("input");
  input.setAttribute("placeholder", "search...");
  input.setAttribute("style", "width: 200px");
  input.addEventListener("input", e => onChange(e?.target?.value));
  search.appendChild(input);
  HEADER_DIV.appendChild(search);
  return search;
}

/**
 * return settings object
 */
function createSettings() {
  return { order: "increasing" };
}

/**
 * return add bookmark button
 */
function createAddBookmarkButton() {}

function createPage() {
  const settings = createSettings();
  createSearch(query => createApps(settings, query));
  createAddBookmarkButton();
  createApps(settings);
}

createPage();
window.addEventListener("resize", () => createPage());

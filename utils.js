function getEl(id) {
  return document.getElementById(id);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

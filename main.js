let objects = [];
let real_time=0
let time=0
let dt=0

function cleanUnusedObjects() {
  let new_objects_array = [];
  objects.forEach((o) => {
    if (o.is_destroyed == false) {
      new_objects_array.push(o);
    }
  });
  return new_objects_array;
}

function init() {
  document.body.style.background = "rgb(0,0,0)";
  //document.body.style.overflow = "hidden";
  let p=document.createElement("div")
  p.style["font-size"]="100px"
  p.setAttribute("z-index","100")
  p.style.color="red"
  p.innerHTML='+'
  p.style.position="absolute"
  
    
  new Object().append(
    createCircle(100, 100, 100, "rgb(255,255,255)")
  ).appendChild(p).shape.setAttribute("align","center")
}
function main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;
  objects.forEach((o) => {
    o.play();
  });
  if (real_time % 1 < 0.3) {
    objects = cleanUnusedObjects();
  }
  time = new Date().getTime();
  requestAnimationFrame(main);
}
//main-------------
init();
main();

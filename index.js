// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return { x, y };
}

function takeMeasures() {
  var vt = parseFloat(document.getElementById("vt").value);
  var og = parseFloat(document.getElementById("og").value);
  var os = parseFloat(document.getElementById("os").value);
  var ob = parseFloat(document.getElementById("ob").value);
}

function reset() {
  //------btn reset-----------------------------
  driEl.innerHTML = "";
  dlEl.innerHTML = "";
  dbEl.innerHTML = "";
  sviEl.innerHTML = "";
  slEl.innerHTML = "";
  sriEl.innerHTML = "";
  psEl.innerHTML = "";
  pdEl.innerHTML = "";
}

// Konvarzija cm u px
function inPx(a) {
  return a * 37.7952755906;
}

// sredina izmedju dve tacke

function half(a1, a2) {
  return a1 + (a2 - a1) * 0.5;
}

// pronalazenje SLOPE-a i tacaka na njemu
function slope(a1, b1, a2, b2, d) {
  var m = (b2 - b1) / (a2 - a1);
  var dela = d / Math.sqrt(1 + m * m);
  var plusX = a1 + dela;
  var plusY = b1 + m * dela;
  var minusX = a1 - dela;
  var minusY = b1 - m * dela;
  var coord = {
    slope: m,
    x1: plusX,
    y1: plusY,
    x2: minusX,
    y2: minusY,
  };
  return coord;
}

function slopeD(x1, y1, x2, y2) {
  var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return d;
}

function slopeY(x1,y1,m,x2){
  var y2 = m* (x2 - x1) + y1;
  return(y2);
}

// pronalazenje razdaljine po luku
function dArc(r, s) {
  var angle = s / r;
  return angle;
}

// Pronalazenje tacke na luku h,k su x,y koordinate centra kruznice, xA,yA tacka na kruznici, d razdaljina po luku
function arcPoint(h, k, xA, yA, d) {
  var r = Math.abs(yA - k);
  var centralAngle = d / r;
  var opPlus = Math.PI * 1.5 + centralAngle;
  var opMinus = -Math.PI / 2 - centralAngle;
  var arcDot = {
    px: h + r * Math.cos(opPlus),
    py: k + r * Math.sin(opPlus),
    mx: h - r * Math.cos(opMinus),
    my: k - r * Math.sin(opMinus),
  };
  return arcDot;
}

function arcInt(x1, y1, x2, y2, r1, r2) {
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;

  var d = slopeD(x1, y1, x2, y2);
  var deltaR = Math.pow(r1, 2) - Math.pow(r2, 2);
  
  var a = (deltaR + Math.pow(d, 2)) / (2 * d);

  var h = Math.sqrt(Math.pow(r1, 2) - Math.pow(a, 2));
  
  var ux = deltaX / d;

  var uy = deltaY / d;
  

  //midpoint mx

  var midX = x1 + a * ux;
  var midY = y1 + a * uy;


  pointB = {
    x: midX + h * uy,
    y: midY + h * ux,
    xm: midX - h * uy,
    ym: midY - h * ux,
  };
  return pointB;
}

// Uzimanje podatak iz HTML-a___________________________________
var driEl = document.getElementById("dri");
var dlEl = document.getElementById("dl");
var dbEl = document.getElementById("db");
var sviEl = document.getElementById("svi");
var slEl = document.getElementById("sl");
var sriEl = document.getElementById("sri");
var psEl = document.getElementById("ps");
var pdEl = document.getElementById("pd");

var btn = document.getElementById("btn");

// _______________________________________________________________________________
// BTN ON CLICK FUNKCIJA !!!!!!!
// ______________________________________________________

btn.onclick = function () {
  // Uzimam osnovne mere---------------------------------------------
  var vt = parseFloat(document.getElementById("vt").value);
  var og = parseFloat(document.getElementById("og").value);
  var os = parseFloat(document.getElementById("os").value);
  var ob = parseFloat(document.getElementById("ob").value);

  // POMOCNE MERE U CM !!!!!!!!!-----------------------------------------------------
  var dri = og / 10 + 10.5 + 1;
  var dl = vt / 4 - 1;
  var db = (vt / 8) * 3;
  var dm = (vt / 8) * 5;
  var svi = og / 20 + 2;
  var pd = dl + og / 20;
  var sl = og / 8 + 5.5 + 1;
  var sri = og / 8 - 1.5;
  var ps = og / 4 - 4 + 2;
  var sp = os / 4 - 1;
  // ---------------------------------------------------------------------------

  // KONVERZIJA U PX-------------------------
  var driPx = inPx(dri);
  var dlPx = inPx(dl);
  var dbPx = inPx(db);
  var dmPx = inPx(dm);
  var sviPx = inPx(svi);
  var pdPx = inPx(pd);
  var slPx = inPx(sl);
  var sriPx = inPx(sri);
  var psPx = inPx(ps);
  var spPx = inPx(sp);
  // -----------------------------------------

  //------btn reset-----------------------------
  driEl.innerHTML = "";
  dlEl.innerHTML = "";
  dbEl.innerHTML = "";
  sviEl.innerHTML = "";
  slEl.innerHTML = "";
  sriEl.innerHTML = "";
  psEl.innerHTML = "";
  pdEl.innerHTML = "";
  // --------------------------------------------------------------------------

  // prikaz pomocnih mera-------------
  driEl.innerHTML += dri + " cm";
  dlEl.innerHTML += dl + " cm";
  dbEl.innerHTML += db + " cm";
  sviEl.innerHTML += svi + " cm";
  slEl.innerHTML += sl + " cm";
  sriEl.innerHTML += sri + " cm";
  psEl.innerHTML += ps + " cm";
  pdEl.innerHTML += pd + " cm";
  // ---------------------------------

  // ____________________________________________________
  // ________CANVAS_____________________________________
  var canvas = document.getElementById("canvas");
  var imgLink = canvas.toDataURL("image/jpeg");
  
  var cx = canvas.getContext("2d");
  cx.canvas.height = dmPx * 1.1;
  cx.canvas.width = inPx(ob/ 1.3);

  // ----------OVDE POCINJE ZABAVA!!!-------------------
  // TACKA
  function dot(a, b) {
    return cx.fillRect(a, b, 5, 5);
  }
  //   var za bitne koordinate
  var x0 = cx.canvas.width - 150;
  var y0 = cx.canvas.height - dmPx - 5;

  var driY = y0 + driPx;
  var dlY = y0 + dlPx;
  var dbY = y0 + dbPx;
  var dmY = y0 + dmPx;

  //----------------
  cx.lineWidth = "1.5";

  cx.beginPath();

  //   pocetna konstrukcija ------------------
  cx.moveTo(x0, y0);
  dot(x0, y0); //pocetna tacka 1
  dot(x0, driY); // dri 2
  dot(x0, dlY); // dl 3
  dot(x0, dbY); // db 4
  dot(x0, dmY); //5

  cx.lineTo(x0, dmY); // dm 5

  cx.moveTo(x0, driY);
  cx.lineTo(5, driY);

  cx.moveTo(x0, dlY);
  cx.lineTo(5, dlY);

  cx.moveTo(x0, dbY);
  cx.lineTo(5, dbY);

  cx.moveTo(x0, dmY);
  cx.lineTo(5, dmY);

  cx.stroke();
  // --------------------------------------------------

  //  uvlacenje ledja -----
  var indt = x0 - inPx(2);
  var slXY0 = intersect(x0, y0, indt, dlY, x0, driY, 5, driY);
  var slX = slXY0.x - slPx;
  cx.lineWidth = "4";

  cx.beginPath();
  dot(indt, dlY); //6
  dot(indt, dbY);
  dot(indt, dmY); //7
  dot(slXY0.x, slXY0.y); //8

  cx.moveTo(indt, dlY);
  cx.lineTo(indt, dmY);

  cx.moveTo(indt, dlY);
  cx.lineTo(x0, y0);

  cx.stroke();
  //   ________________________________________

  // -- pocetak prednjeg dela----------
  cx.lineWidth = "1.5";

  var x11 = slX - (sriPx / 3) * 2;
  var x13 = x11 - inPx(10);
  var x15 = x13 - sriPx / 3;
  var psX = x15 - psPx;
  var x19 = psX + inPx(og) / 10 + inPx(0.5);

  cx.beginPath();
  dot(slX, driY); //9
  dot(slX, y0); //10
  dot(x11, driY); //11
  dot(x13, driY); //13
  dot(x15, driY); //15
  dot(psX, driY); //16
  dot(x15, dlY); //17
  dot(x19, driY); //19
  dot(psX, dlY); // 18
  dot(psX, dlY - pdPx); //20
  dot(x19, dlY - pdPx); //21

  dot(x19, driY + inPx(2)); //34
  dot(psX + sviPx, dlY - pdPx); //38
  dot(psX, dlY - pdPx + sviPx + inPx(1)); // 39
  dot(x15 - spPx, dlY); //43

  cx.moveTo(slX, driY);
  cx.lineTo(slX, y0);
  cx.lineTo(x0, y0);

  cx.moveTo(x11, driY);
  cx.lineTo(x11, dbY);

  cx.moveTo(x13, driY);
  cx.lineTo(x13, dbY);

  cx.moveTo(x15, y0);
  cx.lineTo(x15, dlY);

  cx.moveTo(psX, dlY);
  cx.lineTo(psX, dlY - pdPx);
  cx.lineTo(x19, dlY - pdPx);
  cx.lineTo(x19, dmY);

  cx.stroke();
  //-------------------------------------------

  // Rame na zadnjem delu  i skoro sve ostalo-------------
  var y24 = y0 + inPx(1.5);
  var y25 = half(y24, driY);
  var x22 = x0 - sviPx;
  var y23 = y0 - inPx(2);
  var y35 = y24 + inPx(2);
  var dot29m = slope(x22, y23, slX, y24, inPx(4));
  var dot33m = slope(slX, y24, x22, y23, inPx(1));

  var r = driY - (y24 + inPx(2));
  var r2 = driY - (dlY - pdPx);
  var angle1 = dArc(r, inPx(og / 20));
  var angle2 = dArc(r2, inPx(og / 20));
  var arc1 = arcPoint(x15, driY, x15, y35, inPx(og / 20));
  var slope2 = slopeD(x22, y23, dot33m.x2, dot33m.y2);
  var dotB = arcInt(arc1.px, arc1.py, x19, driY, slope2, r2);
  var dis41 = Math.abs(x19 - (psX + sviPx));
  var dot41 = slope(dotB.xm, dotB.y, arc1.px, arc1.py, dis41);
  var dot41a = slope(dotB.xm, dotB.y, arc1.px, arc1.py, inPx(1));
  var dot40 = slope(psX, dlY - pdPx, x15, driY, sviPx + inPx(0.5));
  var dis34To41 = slopeD(x19, driY + inPx(2), dot41.x1, dot41.y1);
  var dis18To43 = psX - (x15 - spPx);
  var dis44To45 = dis18To43 / 2;
  var dis47To48 = psX - dis44To45 + inPx(ob / 2 + 2 + 10) - x0;
  var x53 = half(slXY0.x, slX);
  var a23d = slopeD(dot33m.x2, dot33m.y2, x22, y23);
  var a23 = slope(dot33m.x2, dot33m.y2, x22, y23, a23d);
  console.log(a23.slope, dot33m.x2, dot33m.y2 - inPx(1));
  var dotSlope23a = slopeY(dot33m.x2, dot33m.y2 - inPx(1), a23.slope, x22);
  console.log(dotSlope23a);
  var dot41a = slope(dot41.x1, dot41.y1, x19, driY, +inPx(1));

  cx.beginPath();

  dot(x22, y0); //22
  dot(x22, y23); //23
  dot(slX, y24); //24
  dot(slX, y25); //25
  dot(slX, half(y25, driY)); //26
  dot(slX - inPx(1.3), half(y25, driY)); //27
  dot(x15, half(y25, driY)); //28
  dot(dot29m.x2, dot29m.y2); //29
  dot(dot33m.x2, dot33m.y2); //33
  dot(dot33m.x2, dot33m.y2 - inPx(1)); // 33a
  dot(x22 - inPx(0.5), dotSlope23a); // 23a
  dot(x15, y35); //35
  dot(arc1.px, arc1.py); //36
  var dot36a = slope(arc1.px, arc1.py, y25, driY, inPx(1));
  dot(dotB.xm, dotB.y); // 37
  dot(dot41.x1, dot41.y1); // 41
  dot(dot41a.x2, dot41a.y2); // 41a
  dot(dot40.x1, dot40.y1); //40
  dot(x19, driY + inPx(2) - dis34To41); //42
  dot(x19, driY + inPx(3) - dis34To41); //42a
  dot(psX - dis44To45, dbY); //45
  dot(x15 - spPx + inPx(os / 2 + 4 + 10), dlY); //46
  dot(psX - dis44To45 + inPx(ob / 2 + 2 + 10), dbY); //47
  dot(x11, dlY); //49
  dot(x13, dlY); // 50
  dot(x11, dlY - inPx(1)); //49a
  dot(x13, dlY - inPx(1)); //50a
  dot(x11 + inPx(1.2), dlY - inPx(1)); //52
  dot(x13 - inPx(1.2), dlY - inPx(1)); //51
  dot(x11, dbY); //12
  dot(x13, dbY); //14
  dot(x11 - dis47To48 / 2, dbY); //12a
  dot(x13 + dis47To48 / 2, dbY); //14a
  dot(x53, driY); // 53
  dot(x53, dlY); //54
  dot(x53, dlY + inPx(16)); //55
  dot(x53, dlY - inPx(16)); //56
  dot(x19, dlY); // 57
  dot(x19, dmY); // 58
  dot(x15, driY - sriPx / 4); //59
  // -------------------------
  dot(x53 + inPx(1), dlY); //usitci
  dot(x53 - inPx(1), dlY);
  dot(x19 + inPx(1.5), dlY);
  dot(x19 - inPx(1.5), dlY);
  dot(x19 + inPx(0.75), dbY);
  dot(x19 - inPx(0.75), dbY);

  cx.moveTo(x22, y0);
  cx.lineTo(x22, y23);
  cx.lineTo(dot33m.x2, dot33m.y2);

  cx.moveTo(slX, y0);
  cx.lineTo(slX, y24);

  cx.moveTo(slX, y25);
  cx.lineTo(x0, y25);

  cx.moveTo(slX, half(y25, driY));
  cx.lineTo(slX - inPx(1.3), half(y25, driY)); //32

  cx.moveTo(dot29m.x2, dot29m.y2);
  cx.lineTo(dot29m.x2, y25); //30

  cx.moveTo(x15, driY);
  cx.arc(x15, driY, r, 1.5 * Math.PI, 1.5 * Math.PI + angle1);

  cx.moveTo(x19, driY);
  cx.arc(x19, driY, r2, 1.5 * Math.PI, 1.5 * Math.PI + angle1);

  cx.moveTo(arc1.px, arc1.py);
  cx.lineTo(dotB.xm, dotB.y);
  cx.lineTo(dot41.x1, dot41.y1);
  cx.lineTo(x19, driY + inPx(2));

  cx.moveTo(psX + sviPx, dlY - pdPx);
  cx.lineTo(x19, driY + inPx(2) - dis34To41);

  cx.moveTo(x53, driY);
  cx.lineTo(x53, dbY);

  cx.moveTo(psX + sviPx, dlY - pdPx);
  cx.quadraticCurveTo(
    psX + sviPx,
    dlY - pdPx + sviPx,
    psX,
    dlY - pdPx + sviPx + inPx(1),
  );

  cx.stroke();

  //________________________________________________
  cx.lineWidth = "4";
  cx.beginPath();

  cx.moveTo(x11 + inPx(1.2), dlY - inPx(1));
  cx.lineTo(x11, driY);

  cx.moveTo(x13 - inPx(1.2), dlY - inPx(1));
  cx.lineTo(x13, driY);

  cx.moveTo(x11 - dis47To48 / 2, dbY);
  cx.lineTo(x11 - dis47To48 / 2, dmY);

  cx.moveTo(x13 + dis47To48 / 2, dbY);
  cx.lineTo(x13 + dis47To48 / 2, dmY);

  cx.moveTo(slX - inPx(1.2), y25 + inPx(0.75)); //31
  cx.lineTo(dot29m.x2, y25);
  cx.lineTo(slX - inPx(1.2), y25 - inPx(0.75)); //32

  cx.moveTo(psX, dlY - pdPx + sviPx + inPx(1));
  cx.lineTo(psX, dmY);

  cx.moveTo(x53, dlY - inPx(16));
  cx.lineTo(x53 + inPx(1), dlY);
  cx.lineTo(x53, dlY + inPx(16));
  cx.lineTo(x53 - inPx(1), dlY);
  cx.lineTo(x53, dlY - inPx(16));

  cx.moveTo(x19 - inPx(0.75), dmY);
  cx.lineTo(x19 - inPx(0.75), dbY);
  cx.lineTo(x19 - inPx(1.5), dlY);
  cx.lineTo(x19, driY + inPx(2));
  cx.lineTo(x19 + inPx(1.5), dlY);
  cx.lineTo(x19 + inPx(0.75), dbY);
  cx.lineTo(x19 + inPx(0.75), dmY);

  cx.moveTo(x19, driY + inPx(3) - dis34To41);
  cx.lineTo(psX + sviPx, dlY - pdPx + inPx(1)); //38a

  dot(psX + sviPx, dlY - pdPx + inPx(1));

  cx.moveTo(x19, driY + inPx(3) - dis34To41);
  cx.lineTo(x19, driY + inPx(2));

  cx.moveTo(dot33m.x2, dot33m.y2 - inPx(1));
  cx.lineTo(x22 - inPx(0.5), dotSlope23a);

  cx.moveTo(x19, driY + inPx(2));
  cx.lineTo(dot41a.x2, dot41a.y2);
  cx.lineTo(dot36a.x2, dot36a.y2);

  cx.moveTo(psX, dmY);
  cx.lineTo(x19 - inPx(0.75), dmY);
  cx.moveTo(x19 + inPx(0.75), dmY);
  cx.lineTo(x13 + dis47To48 / 2, dmY);
  cx.moveTo(x11 - dis47To48 / 2, dmY);
  cx.lineTo(x0 - inPx(2), dmY);

  cx.stroke();

  // OVDE SU KRIVE LINIJE

  cx.lineWidth = "4";
  cx.beginPath();

  // bokovi
  cx.moveTo(x13 - inPx(1.2), dlY - inPx(1));
  cx.quadraticCurveTo(
    x13 + dis47To48 / 2,
    dlY + inPx(16),
    x13 + dis47To48 / 2,
    dbY,
  );

  cx.moveTo(x11 + inPx(1.2), dlY - inPx(1));
  cx.quadraticCurveTo(
    x11 - dis47To48 / 2,
    dlY + inPx(16),
    x11 - dis47To48 / 2,
    dbY,
  );

  // zadnji vratni izrez

  cx.moveTo(x22 - inPx(0.5), dotSlope23a);
  cx.quadraticCurveTo(x22 + inPx(0.5), y0, x0, y0);

  // zadnji rukav

  var dot32a = slope(slX, y25 - inPx(0.75), dot29m.x2, y25, inPx(3));
  var dot31a = slope(slX, y25 + inPx(0.75), dot29m.x2, y25, inPx(3));
  // dot(dot32a.x2, dot32a.y2); //32a
  // dot(dot31a.x2, dot31a.y2); //31a

  var usitak1 = intersect(
    dot33m.x2,
    dot33m.y2 - inPx(1),
    slX - inPx(1.3),
    half(y25, driY),
    dot29m.x2,
    y25,
    dot32a.x2,
    dot32a.y2,
  );

  var usitak2 = intersect(
    dot33m.x2,
    dot33m.y2 - inPx(1),
    slX - inPx(1.3),
    half(y25, driY),
    dot29m.x2,
    y25,
    dot31a.x2,
    dot31a.y2,
  );

  cx.moveTo(dot33m.x2, dot33m.y2 - inPx(1));
  cx.quadraticCurveTo(
    usitak1.x + inPx(0.1),
    usitak1.y + inPx(0.1),
    usitak1.x,
    usitak1.y,
  );

  cx.moveTo(usitak2.x, usitak2.y);
  cx.quadraticCurveTo(slX, driY, x11, driY);

  // prednji rukav

  console.log(dot36a);
  dot(dot36a.x2, dot36a.y2); //36a
  cx.moveTo(dot36a.x2, dot36a.y2);
  cx.quadraticCurveTo(
    x15,
    half(dot36a.y2, half(y25, driY)),
    x15,
    half(y25, driY),
  );

  cx.moveTo(x15, half(y25, driY));
  cx.quadraticCurveTo(x15, driY, x13, driY);

  // prednji vratni izrez
  var ctrlPoint = slope(dot40.x1, dot40.y1, x15, driY, inPx(2));
  cx.moveTo(psX + sviPx, dlY - pdPx + inPx(1));
  cx.quadraticCurveTo(
    ctrlPoint.x1,
    ctrlPoint.y1,
    psX,
    dlY - pdPx + sviPx + inPx(1),
  );
  cx.stroke();

};


window.onload = function() {

   window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function(callback) {
            window.setTimeout(callback, 1000 / 60);
         };
   })();

   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");
   var cw, ch;

   var pi = Math.PI;

   var P = [];
   var part = function(long, lat, x, y, z, r, a) {
      this.long = long;
      this.lat = lat;
      this.x = x;
      this.y = y;
      this.z = z;
      this.r = r;
      this.a = a;
   }
   var partNum = 7500;
   var radius = 300;

   function rect(x, y, w, h, col) {
      ctx.fillStyle = col;
      ctx.fillRect(x, y, w, h);
   }

   function line(x1, y1, x2, y2, col) {
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
   }

   function arc(x, y, r, col) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * pi);
      ctx.fill();
   }

   function init() {
      var long, lat, x, y, z, r, a;

         for (var i = 0; i < partNum; i++) {
            long = Math.random()*(2*pi);
            lat = Math.random()*(2*pi);
            x = 0;
            y = ch / 2 + radius * Math.sin(long)* Math.sin(lat);
            z = 0;
            r = 3;
            a = 1;

            P.push(new part(long, lat, x, y, z, r, a));
         }

   }

   function size() {
      canvas.width = cw = window.innerWidth;
      canvas.height = ch = window.innerHeight;
   }

   function bg() {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   function draw() {
      var p;
      var red;
      for (var i = 0; i < P.length; i++) {
         p=P[i];

         red=155*((Math.abs(p.y-radius))/radius);
         ctx.fillStyle = "rgba("+Math.round(red)+",125,65," + p.a + ")";
         ctx.fillRect(p.x,p.y,p.r,p.r);
      }
   }

   function update() {
      var p;
      var dy;
      for (var i = 0; i < P.length; i++) {
         p = P[i];

         p.long += pi / 720;
         p.lat+= pi/720;

         p.x = cw / 2 + radius * Math.cos(p.lat);
         p.y = ch / 2 + radius * Math.sin(p.lat)* Math.cos(p.long);
         p.z = radius+.5*radius * Math.sin(p.lat)*Math.cos(p.long);

         p.r=1;
         p.a=.5;

      }
   }

   function loop() {
      bg();
      draw();
      update();

      line(cw / 2, 0, cw / 2, ch, "rgba(255,255,255,.2)");
      line(0, ch / 2, cw, ch / 2, "rgba(255,255,255,.2)");
      line(cw / 2 - 5, ch / 2 + radius, cw / 2 + 5, ch / 2 + radius, "#fff");
      line(cw / 2 - 5, ch / 2 - radius, cw / 2 + 5, ch / 2 - radius, "#fff");
      line(cw / 2 - radius, ch / 2 - 5, cw / 2 - radius, ch / 2 + 5, "#fff");
      line(cw / 2 + radius, ch / 2 - 5, cw / 2 + radius, ch / 2 + 5, "#fff");
      ctx.strokeStyle = "rgba(255,255,255,.1)";
      ctx.beginPath();
      ctx.arc(cw / 2, ch / 2, radius, 0, 2 * pi);
      ctx.stroke();

      window.requestAnimationFrame(loop);
   }

   window.onresize = size;

   size();
   init();
   loop();
}

(function (a) {
  a.fn.countdownTimer = function (j) {
    var l = a.extend({ endTime: new Date() }, j);
    var f = a(this);
    var e = f.find(".time.seconds");
    var d = f.find(".time.minutes");
    var c = f.find(".time.hours");
    var b = f.find(".time.days");
    var k = 0;
    var i = 0;
    var g = 0;
    var h = 0;
    var m = function (o, u) {
      var r = u + "";
      while (r.length < 2) {
        r = "0" + r;
      }
      if (Modernizr.cssanimations) {
        var q = o.find(".value").addClass("fadeOutDown").addClass("animated");
        var p = a("<div class='value'>" + r + "</div>");
        o.prepend(p);
        p.addClass("fadeInDown").addClass("animated");
        var t = setTimeout(function () {
          q.remove();
        }, 200);
        q.one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            q.remove();
            clearTimeout(t);
          }
        );
      } else {
        var q = o.find(".value").remove();
        var p = a("<div class='value'>" + r + "</div>");
        o.prepend(p);
      }
    };
    var n = countdown(
      l.endTime,
      function (o) {
        if (k != o.seconds) {
          m(e, o.seconds);
          k = o.seconds;
        }
        if (i != o.minutes) {
          m(d, o.minutes);
          i = o.minutes;
        }
        if (h != o.hours) {
          m(c, o.hours);
          h = o.hours;
        }
        if (g != o.days) {
          m(b, o.days);
          g = o.days;
        }
      },
      countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS
    );
    return this;
  };
})(jQuery);
var module,
  countdown = (function (j) {
    function y(d, f) {
      var l = d.getTime();
      d.setUTCMonth(d.getUTCMonth() + f);
      return Math.round((d.getTime() - l) / 86400000);
    }
    function o(d) {
      var f = d.getTime(),
        l = new Date(f);
      l.setUTCMonth(d.getUTCMonth() + 1);
      return Math.round((l.getTime() - f) / 86400000);
    }
    function b(d, f) {
      return d + " " + (1 === d ? h[f] : i[f]);
    }
    function g() {}
    function c(f, l, m, p, q, n) {
      0 <= f[m] && ((l += f[m]), delete f[m]);
      l /= q;
      if (1 >= l + 1) {
        return 0;
      }
      if (0 <= f[p]) {
        f[p] = +(f[p] + l).toFixed(n);
        switch (p) {
          case "seconds":
            if (60 !== f.seconds || isNaN(f.minutes)) {
              break;
            }
            f.minutes++;
            f.seconds = 0;
          case "minutes":
            if (60 !== f.minutes || isNaN(f.hours)) {
              break;
            }
            f.hours++;
            f.minutes = 0;
          case "hours":
            if (24 !== f.hours || isNaN(f.days)) {
              break;
            }
            f.days++;
            f.hours = 0;
          case "days":
            if (7 !== f.days || isNaN(f.weeks)) {
              break;
            }
            f.weeks++;
            f.days = 0;
          case "weeks":
            if (f.weeks !== o(f.refMonth) / 7 || isNaN(f.months)) {
              break;
            }
            f.months++;
            f.weeks = 0;
          case "months":
            if (12 !== f.months || isNaN(f.years)) {
              break;
            }
            f.years++;
            f.months = 0;
          case "years":
            if (10 !== f.years || isNaN(f.decades)) {
              break;
            }
            f.decades++;
            f.years = 0;
          case "decades":
            if (10 !== f.decades || isNaN(f.centuries)) {
              break;
            }
            f.centuries++;
            f.decades = 0;
          case "centuries":
            if (10 !== f.centuries || isNaN(f.millennia)) {
              break;
            }
            f.millennia++;
            f.centuries = 0;
        }
        return 0;
      }
      return l;
    }
    function z(l, m, s, w, t, B) {
      l.start = m;
      l.end = s;
      l.units = w;
      l.value = s.getTime() - m.getTime();
      if (0 > l.value) {
        var v = s;
        s = m;
        m = v;
      }
      l.refMonth = new Date(m.getFullYear(), m.getMonth(), 15);
      try {
        l.millennia = 0;
        l.centuries = 0;
        l.decades = 0;
        l.years = s.getUTCFullYear() - m.getUTCFullYear();
        l.months = s.getUTCMonth() - m.getUTCMonth();
        l.weeks = 0;
        l.days = s.getUTCDate() - m.getUTCDate();
        l.hours = s.getUTCHours() - m.getUTCHours();
        l.minutes = s.getUTCMinutes() - m.getUTCMinutes();
        l.seconds = s.getUTCSeconds() - m.getUTCSeconds();
        l.milliseconds = s.getUTCMilliseconds() - m.getUTCMilliseconds();
        var A;
        0 > l.milliseconds
          ? ((A = k(-l.milliseconds / 1000)),
            (l.seconds -= A),
            (l.milliseconds += 1000 * A))
          : 1000 <= l.milliseconds &&
            ((l.seconds += e(l.milliseconds / 1000)), (l.milliseconds %= 1000));
        0 > l.seconds
          ? ((A = k(-l.seconds / 60)), (l.minutes -= A), (l.seconds += 60 * A))
          : 60 <= l.seconds &&
            ((l.minutes += e(l.seconds / 60)), (l.seconds %= 60));
        0 > l.minutes
          ? ((A = k(-l.minutes / 60)), (l.hours -= A), (l.minutes += 60 * A))
          : 60 <= l.minutes &&
            ((l.hours += e(l.minutes / 60)), (l.minutes %= 60));
        0 > l.hours
          ? ((A = k(-l.hours / 24)), (l.days -= A), (l.hours += 24 * A))
          : 24 <= l.hours && ((l.days += e(l.hours / 24)), (l.hours %= 24));
        for (; 0 > l.days; ) {
          l.months--, (l.days += y(l.refMonth, 1));
        }
        7 <= l.days && ((l.weeks += e(l.days / 7)), (l.days %= 7));
        0 > l.months
          ? ((A = k(-l.months / 12)), (l.years -= A), (l.months += 12 * A))
          : 12 <= l.months && ((l.years += e(l.months / 12)), (l.months %= 12));
        10 <= l.years &&
          ((l.decades += e(l.years / 10)),
          (l.years %= 10),
          10 <= l.decades &&
            ((l.centuries += e(l.decades / 10)),
            (l.decades %= 10),
            10 <= l.centuries &&
              ((l.millennia += e(l.centuries / 10)), (l.centuries %= 10))));
        m = 0;
        !(w & 1024) || m >= t
          ? ((l.centuries += 10 * l.millennia), delete l.millennia)
          : l.millennia && m++;
        !(w & 512) || m >= t
          ? ((l.decades += 10 * l.centuries), delete l.centuries)
          : l.centuries && m++;
        !(w & 256) || m >= t
          ? ((l.years += 10 * l.decades), delete l.decades)
          : l.decades && m++;
        !(w & 128) || m >= t
          ? ((l.months += 12 * l.years), delete l.years)
          : l.years && m++;
        !(w & 64) || m >= t
          ? (l.months && (l.days += y(l.refMonth, l.months)),
            delete l.months,
            7 <= l.days && ((l.weeks += e(l.days / 7)), (l.days %= 7)))
          : l.months && m++;
        !(w & 32) || m >= t
          ? ((l.days += 7 * l.weeks), delete l.weeks)
          : l.weeks && m++;
        !(w & 16) || m >= t
          ? ((l.hours += 24 * l.days), delete l.days)
          : l.days && m++;
        !(w & 8) || m >= t
          ? ((l.minutes += 60 * l.hours), delete l.hours)
          : l.hours && m++;
        !(w & 4) || m >= t
          ? ((l.seconds += 60 * l.minutes), delete l.minutes)
          : l.minutes && m++;
        !(w & 2) || m >= t
          ? ((l.milliseconds += 1000 * l.seconds), delete l.seconds)
          : l.seconds && m++;
        if (!(w & 1) || m >= t) {
          var u = c(l, 0, "milliseconds", "seconds", 1000, B);
          if (
            u &&
            (u = c(l, u, "seconds", "minutes", 60, B)) &&
            (u = c(l, u, "minutes", "hours", 60, B)) &&
            (u = c(l, u, "hours", "days", 24, B)) &&
            (u = c(l, u, "days", "weeks", 7, B)) &&
            (u = c(l, u, "weeks", "months", o(l.refMonth) / 7, B))
          ) {
            w = u;
            var C,
              D = l.refMonth,
              E = D.getTime(),
              F = new Date(E);
            F.setUTCFullYear(D.getUTCFullYear() + 1);
            C = Math.round((F.getTime() - E) / 86400000);
            if ((u = c(l, w, "months", "years", C / o(l.refMonth), B))) {
              if ((u = c(l, u, "years", "decades", 10, B))) {
                if ((u = c(l, u, "decades", "centuries", 10, B))) {
                  if ((u = c(l, u, "centuries", "millennia", 10, B))) {
                    throw Error("Fractional unit overflow");
                  }
                }
              }
            }
          }
        }
      } finally {
        delete l.refMonth;
      }
      return l;
    }
    function a(m, n, p, q, s) {
      var u;
      p = +p || 222;
      q = 0 < q ? q : NaN;
      s = 0 < s ? (20 > s ? Math.round(s) : 20) : 0;
      "function" === typeof m
        ? ((u = m), (m = null))
        : m instanceof Date ||
          (m = null !== m && isFinite(m) ? new Date(m) : null);
      "function" === typeof n
        ? ((u = n), (n = null))
        : n instanceof Date ||
          (n = null !== n && isFinite(n) ? new Date(n) : null);
      if (!m && !n) {
        return new g();
      }
      if (!u) {
        return z(new g(), m || new Date(), n || new Date(), p, q, s);
      }
      var v =
          p & 1
            ? 1000 / 30
            : p & 2
            ? 1000
            : p & 4
            ? 60000
            : p & 8
            ? 3600000
            : p & 16
            ? 86400000
            : 604800000,
        t,
        r = function () {
          u(z(new g(), m || new Date(), n || new Date(), p, q, s), t);
        };
      r();
      return (t = setInterval(r, v));
    }
    var k = Math.ceil,
      e = Math.floor,
      h,
      i,
      x;
    g.prototype.toString = function () {
      var d = x(this),
        f = d.length;
      if (!f) {
        return "";
      }
      1 < f && (d[f - 1] = "and " + d[f - 1]);
      return d.join(", ");
    };
    g.prototype.toHTML = function (f) {
      f = f || "span";
      var l = x(this),
        m = l.length;
      if (!m) {
        return "";
      }
      for (var n = 0; n < m; n++) {
        l[n] = "\x3c" + f + "\x3e" + l[n] + "\x3c/" + f + "\x3e";
      }
      --m && (l[m] = "and " + l[m]);
      return l.join(", ");
    };
    x = function (d) {
      var f = [],
        l = d.millennia;
      l && f.push(b(l, 10));
      (l = d.centuries) && f.push(b(l, 9));
      (l = d.decades) && f.push(b(l, 8));
      (l = d.years) && f.push(b(l, 7));
      (l = d.months) && f.push(b(l, 6));
      (l = d.weeks) && f.push(b(l, 5));
      (l = d.days) && f.push(b(l, 4));
      (l = d.hours) && f.push(b(l, 3));
      (l = d.minutes) && f.push(b(l, 2));
      (l = d.seconds) && f.push(b(l, 1));
      (l = d.milliseconds) && f.push(b(l, 0));
      return f;
    };
    a.MILLISECONDS = 1;
    a.SECONDS = 2;
    a.MINUTES = 4;
    a.HOURS = 8;
    a.DAYS = 16;
    a.WEEKS = 32;
    a.MONTHS = 64;
    a.YEARS = 128;
    a.DECADES = 256;
    a.CENTURIES = 512;
    a.MILLENNIA = 1024;
    a.DEFAULTS = 222;
    a.ALL = 2047;
    a.setLabels = function (d, f) {
      d = d || [];
      d.split && (d = d.split("|"));
      f = f || [];
      f.split && (f = f.split("|"));
      for (var l = 0; 10 >= l; l++) {
        (h[l] = d[l] || h[l]), (i[l] = f[l] || i[l]);
      }
    };
    (a.resetLabels = function () {
      h =
        "millisecond second minute hour day week month year decade century millennium".split(
          " "
        );
      i =
        "milliseconds seconds minutes hours days weeks months years decades centuries millennia".split(
          " "
        );
    })();
    j && j.exports
      ? (j.exports = a)
      : "function" === typeof window.define &&
        window.define.amd &&
        window.define("countdown", [], function () {
          return a;
        });
    return a;
  })(module);

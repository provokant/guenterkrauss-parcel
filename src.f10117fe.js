// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/scripts/Modals.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Modals = /** @class */function () {
  function Modals(options) {
    this.wrapperClasses = [];
    this.resetOptions(options);
    this.resetModals();
    this.selectModals();
    this.attachListeners();
  }
  Modals.prototype.closeAll = function () {
    this.resetModals();
    this.restoreBody();
    this.hideBackdrop();
    this.resetAllWrappers();
  };
  Modals.prototype.attachListeners = function () {
    var _this = this;
    this.allTogglers.forEach(function (toggler) {
      toggler.addEventListener('click', function (_a) {
        var target = _a.target;
        // tslint:disable-next-line
        var dataset = target.dataset;
        _this.showModal(dataset.modalTarget);
        _this.showBackdrop();
        _this.modifyBody();
        if (dataset.modalWrapper) {
          var modalWrapper = dataset.modalWrapper;
          _this.modifyWrapper(modalWrapper);
          _this.wrapperClasses.push(modalWrapper);
        }
        if (dataset.modalAnchor) {
          var modalAnchor = dataset.modalAnchor,
            modalTarget = dataset.modalTarget;
          _this.scrollToAnchor(modalAnchor, modalTarget);
        }
      });
    });
    this.allCloseButtons.forEach(function (toggler) {
      toggler.addEventListener('click', function (e) {
        _this.closeAll();
      });
    });
  };
  Object.defineProperty(Modals.prototype, "hasBackdrop", {
    get: function get() {
      var backdropSelector = this.options.backdropSelector;
      return document.querySelector(backdropSelector) ? true : false;
    },
    enumerable: false,
    configurable: true
  });
  Modals.prototype.showBackdrop = function () {
    var _a;
    var _b = this.options,
      backdropSelector = _b.backdropSelector,
      backdropClass = _b.backdropClass;
    if (this.hasBackdrop) {
      (_a = document.querySelector(backdropSelector)) === null || _a === void 0 ? void 0 : _a.classList.add(backdropClass);
    }
  };
  Modals.prototype.hideBackdrop = function () {
    var _a;
    var _b = this.options,
      backdropSelector = _b.backdropSelector,
      backdropClass = _b.backdropClass;
    if (this.hasBackdrop) {
      (_a = document.querySelector(backdropSelector)) === null || _a === void 0 ? void 0 : _a.classList.remove(backdropClass);
    }
  };
  Modals.prototype.modifyWrapper = function (selector) {
    var wrapperClass = this.options.wrapperClass;
    var wrapper = document.querySelector(selector);
    if (wrapper) {
      wrapper.classList.add(wrapperClass);
    }
  };
  Modals.prototype.resetAllWrappers = function () {
    var wrapperClass = this.options.wrapperClass;
    this.wrapperClasses.forEach(function (selector) {
      var wrapper = document.querySelector(selector);
      if (wrapper) {
        wrapper.classList.remove(wrapperClass);
      }
    });
  };
  Modals.prototype.selectModals = function () {
    this.allModals = document.querySelectorAll(this.options.modalSelector);
    this.allTogglers = document.querySelectorAll(this.options.togglerSelector);
    this.allCloseButtons = document.querySelectorAll(this.options.closeButtonSelector);
  };
  Modals.prototype.showModal = function (id) {
    var _a;
    var modalClass = this.options.modalClass;
    this.activeModal = id;
    (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.classList.add(modalClass);
  };
  Modals.prototype.restoreBody = function () {
    var bodyClass = this.options.bodyClass;
    document.body.classList.remove(bodyClass);
  };
  Modals.prototype.modifyBody = function () {
    var bodyClass = this.options.bodyClass;
    document.body.className = bodyClass;
  };
  Modals.prototype.resetModals = function () {
    var _a;
    var modalClass = this.options.modalClass;
    if (this.activeModal) {
      (_a = document.getElementById(this.activeModal)) === null || _a === void 0 ? void 0 : _a.classList.remove(modalClass);
    }
    this.activeModal = null;
  };
  Modals.prototype.resetOptions = function (options) {
    this.options = __assign({
      modalSelector: '[data-modal]',
      togglerSelector: '[data-modal-target]',
      closeButtonSelector: '[data-modal-close]',
      backdropSelector: '[data-modal-backdrop]',
      modalClass: '--active',
      bodyClass: '--no-scroll',
      backdropClass: '--active',
      wrapperClass: '--shift'
    }, options);
  };
  Modals.prototype.scrollToAnchor = function (anchor, parent) {
    var parentElement = document.getElementById(parent);
    var scrollTo = parentElement === null || parentElement === void 0 ? void 0 : parentElement.querySelector("[id=\"" + anchor + "\"]");
    scrollTo === null || scrollTo === void 0 ? void 0 : scrollTo.scrollIntoView();
  };
  return Modals;
}();
exports.default = Modals;
},{}],"src/scripts/Swiper.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Swiper = /** @class */function () {
  function Swiper(options) {
    this.resetOptions(options);
    this.width = this.updateWidth();
    try {
      var children = this.wrapper.children;
      this.children = children;
      this.randomPosition();
      this.updateChildren();
      this.attachListener();
    } catch (err) {
      console.warn("Consider removing Swiper.js from your modules. There are no children found inside \"" + this.options.wrapperSelector + "\". Or check your options ... The selector might be wrong.");
    }
  }
  Swiper.prototype.randomPosition = function () {
    this.currentChild = Math.floor(Math.random() * this.children.length);
  };
  Swiper.prototype.attachListener = function () {
    var _this = this;
    this.canvas.addEventListener('mousemove', function (e) {
      var threshold = _this.options.threshold;
      var clientX = e.clientX,
        clientY = e.clientY;
      if (_this.calculateDelta(clientX, clientY) > threshold) {
        _this.setCurrentPosition(clientX, clientY);
        _this.updateChildren();
      }
    });
    this.canvas.addEventListener('touchmove', function (e) {
      var threshold = _this.options.threshold;
      var changedTouches = e.changedTouches;
      var clientX = changedTouches[0].clientX;
      if (_this.calculateDelta(clientX) > threshold) {
        _this.setCurrentPosition(clientX);
        _this.updateChildren();
      }
    });
  };
  Swiper.prototype.nextChild = function () {
    return (this.currentChild + 1) % this.children.length;
  };
  Swiper.prototype.setCurrentPosition = function (x, y) {
    if (y === void 0) {
      y = 0;
    }
    this.currentPosition = {
      x: x,
      y: y
    };
  };
  Swiper.prototype.calculateDelta = function (clientX, clientY) {
    if (clientY === void 0) {
      clientY = 0;
    }
    if (!this.currentPosition) {
      this.currentPosition = {
        x: clientX,
        y: clientY
      };
    }
    var _a = this.currentPosition,
      x = _a.x,
      y = _a.y;
    return Math.hypot(clientX - x, clientY - y);
  };
  Swiper.prototype.updateChildren = function () {
    var childClass = this.options.childClass;
    var nextChild = this.nextChild();
    this.children[this.currentChild].classList.remove(childClass);
    this.children[nextChild].classList.add(childClass);
    this.currentChild = nextChild;
  };
  Swiper.prototype.updateWidth = function () {
    var offsetWidth = this.canvas.offsetWidth;
    return this.width = offsetWidth;
  };
  Swiper.prototype.resetOptions = function (options) {
    this.options = __assign({
      canvasSelector: 'header',
      wrapperSelector: '.swiper__wrapper',
      childClass: '--active',
      threshold: 100
    }, options);
  };
  Object.defineProperty(Swiper.prototype, "wrapper", {
    get: function get() {
      return document.querySelector(this.options.wrapperSelector);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Swiper.prototype, "canvas", {
    get: function get() {
      return document.querySelector(this.options.canvasSelector);
    },
    enumerable: false,
    configurable: true
  });
  return Swiper;
}();
exports.default = Swiper;
},{}],"src/scripts/Parallax.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Parallax = /** @class */function () {
  function Parallax(options) {
    this.elements = [];
    this.resetOptions(options);
    this.assignElements();
    this.attachListeners();
  }
  Parallax.prototype.attachListeners = function () {
    var _this = this;
    window.addEventListener('DOMContentLoaded', function () {
      return _this.scrollEvent();
    }, false);
  };
  Parallax.prototype.scrollEvent = function () {
    var _this = this;
    this.elements.forEach(function (_a, key) {
      var element = _a.element,
        parentNode = _a.parentNode,
        parallax = _a.parallax;
      var _b = parentNode.getBoundingClientRect(),
        top = _b.top,
        bottom = _b.bottom;
      var lastElementKey = _this.options.lastElementKey;
      var innerHeight = window.innerHeight;
      var threshold = Math.floor((innerHeight - top) / innerHeight * 1000) / 1000;
      var factor = innerHeight * parallax;
      var y = factor - (1 + threshold * factor);
      if (top <= innerHeight && bottom >= 0) {
        element.style.transform = "translate3d(0, " + y + "px, 0)";
      }
      if (key === lastElementKey) {
        // this.siblingNode.style.marginTop = `${y}px`
        // this.siblingNode.style.paddingBottom = `${-y}px`
      }
    });
    requestAnimationFrame(function () {
      return _this.scrollEvent();
    });
  };
  Parallax.prototype.assignElements = function () {
    var _this = this;
    var selector = this.options.selector;
    var siblingSelector = this.options.siblingSelector;
    if (siblingSelector && document.querySelector(siblingSelector)) {
      this.siblingNode = document.querySelector(siblingSelector);
    }
    document.querySelectorAll(selector).forEach(function (element) {
      var dataset = element.dataset,
        parentNode = element.parentNode;
      var parallax = dataset.parallax;
      _this.elements.push({
        element: element,
        parentNode: parentNode,
        parallax: parallax
      });
    }, this);
  };
  Parallax.prototype.resetOptions = function (options) {
    this.options = __assign({
      selector: '[data-parallax]'
    }, options);
  };
  return Parallax;
}();
exports.default = Parallax;
},{}],"src/scripts/Preload.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Preload = /** @class */function () {
  function Preload(options) {
    this.resetOptions(options);
    this.queryAllImages();
    this.preloadImages();
    this.showLoading();
  }
  Preload.prototype.showLoading = function () {
    var _a = this.options,
      bodyClass = _a.bodyClass,
      loadingClass = _a.loadingClass,
      loading = _a.loading;
    document.body.classList.add(bodyClass);
    document.querySelector(loading).classList.add(loadingClass);
  };
  Preload.prototype.queryAllImages = function () {
    var imageSelector = this.options.imageSelector;
    this.allImages = document.querySelectorAll(imageSelector);
  };
  Preload.prototype.preloadImages = function () {
    var _this = this;
    if (!this.allImages) return;
    var animationDuration = this.options.animationDuration;
    window.setTimeout(function () {
      _this.resetBody();
      _this.hideLoading();
    }, animationDuration);
  };
  Preload.prototype.resetBody = function () {
    var bodyClass = this.options.bodyClass;
    document.body.classList.remove(bodyClass);
  };
  Preload.prototype.hideLoading = function () {
    var _a = this.options,
      loading = _a.loading,
      loadingClass = _a.loadingClass,
      loadingFadeOutClass = _a.loadingFadeOutClass;
    document.querySelector(loading).classList.add(loadingFadeOutClass);
    window.setTimeout(function () {
      document.querySelector(loading).remove();
    }, 340);
  };
  Preload.prototype.resetOptions = function (options) {
    this.options = __assign({
      loading: '.loading-screen',
      loadingClass: '--show',
      loadingFadeOutClass: '--fade-out',
      bodyClass: '--loading',
      imageSelector: '[data-preload]',
      animationDuration: 3500
    }, options);
  };
  return Preload;
}();
exports.default = Preload;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles/index.scss");
var Modals_1 = __importDefault(require("./scripts/Modals"));
var Swiper_1 = __importDefault(require("./scripts/Swiper"));
var Parallax_1 = __importDefault(require("./scripts/Parallax"));
var Preload_1 = __importDefault(require("./scripts/Preload"));
var swiper = new Swiper_1.default({
  threshold: 120
});
var modals = new Modals_1.default();
var parallax = new Parallax_1.default({
  siblingSelector: 'footer',
  lastElementKey: 65
});
var preload = new Preload_1.default({
  animationDuration: 4000
});
document.addEventListener('keydown', function (e) {
  var isEscape = e.keyCode === 27 || e.key === 'Escape' || e.key === 'Esc' ? true : false;
  if (isEscape) {
    modals.closeAll();
  }
});
var imprintEl = document.querySelector('.imprint');
document.addEventListener('DOMContentLoaded', function () {
  imprintEl.classList.add('--collapsed');
});
imprintEl.addEventListener('click', function (_a) {
  var target = _a.target;
  target.classList.remove('--collapsed');
});
imprintEl.addEventListener('click', function (_a) {
  var target = _a.target;
  target.classList.remove('--collapsed');
});
imprintEl.addEventListener('mouseover', function (_a) {
  var target = _a.target;
  target.classList.add('--hover');
});
imprintEl.addEventListener('mouseout', function (_a) {
  var target = _a.target;
  target.classList.remove('--hover');
});
// Tomas sah den eigenen Mund im Gesicht seines Sohnes und dachte: Sonderbar, den eigenen Mund stottern zu sehen. 
// »In deinem Artikel stand etwas Wunderbares«, fuhr der Sohn fort, und man konnte sehen, daß es ihn Mühe kostete: »Die Kompromißlosigkeit. Diese Fähigkeit kommt uns allmählich abhanden, der Sinn für eine klare Unterscheidung von Gut und Böse. Man weiß nicht mehr, was es heißt, sich schuldig zu fühlen. Die Kommunisten haben die Ausrede, Stalin hätte sie hinters Licht geführt. Der Mörder entschuldigt sich, indem er sagt, seine Mutter hätte ihn nicht geliebt und er wäre frustriert. Du aber hast auf einmal gesagt: Es gibt keine Ausrede. Niemand war in seinem Inneren unschuldiger als Ödipus. Und trotzdem hat er sich selbst bestraft, als er einsah, was er getan hatte.«
// Tomas riß den Blick mit Gewalt von seiner Lippe im Gesicht des Sohnes los und versuchte, den Redakteur anzusehen. Er war gereizt, hatte Lust zu widersprechen und sagte: »Wissen Sie, das ist alles ein Mißverständnis. Die Grenzen zwischen Gut und Böse sind furchtbar undeutlich. Es ist mir überhaupt nicht darum gegangen, daß jemand bestraft werden sollte. Jemanden zu bestrafen, der nicht wußte, was er tat, ist Barbarei. Der Ödipusmythos ist sehr schön. Aber so mit ihm umzugehen ...« Er wollte noch etwas sagen, erinnerte sich dann aber, daß die Wohnung möglicherweise abgehört wurde. Er hatte nicht den geringsten Ehrgeiz, von den Historikern kommender Jahrhunderte zitiert zu werden.
// Viel eher hegte er Bedenken, die Polizei könnte ihn zitieren.
// Es war ja gerade die Verurteilung seines eigenen Artikels, die man von ihm gefordert hatte. Es war ihm unangenehm, daß die Polizei es nun endlich aus seinem eigenen Munde hören konnte. Er wußte, daß alles, was man in diesem Land aussprach, jederzeit im Rundfunk gesendet werden konnte. Er verstummte.
// »Was hat Sie zu diesem Gesinnungswandel bewogen?« fragte der Redakteur.
// »Ich frage mich eher, was mich damals bewogen hat, diesen Artikel zu schreiben ...«, sagte Tomas, und in diesem Moment fiel es ihm ein: sie war an seinem Bett gestrandet wie ein Kind, das man in einen Korb gelegt und auf dem Wasser ausgesetzt hatte. Ja, deswegen hatte er jenes Buch in die Hand genommen, deswegen war er zu den Geschichten von Romulus, Moses und Ödipus zurückgekehrt. Plötzlich war sie hier bei ihm. Er sah sie vor sich, wie sie die in den roten Schal gehüllte Krähe an die Brust drückte. Dieses Bild tröstete ihn. Als wäre es aufgetaucht, um ihm zu sagen, daß Teresa lebte, daß sie in diesem Moment in derselben Stadt war wie er, und alles andere bedeutungslos sei.
// Der Redakteur unterbrach das Schweigen: »Ich verstehe Sie, Herr Doktor. Mir gefällt es auch nicht, daß man bestraft.
// Wir fordern aber keine Strafe«, lächelte er, »wir fordern das Erlassen der Strafe.«
// »Ich weiß«, sagte Tomas. Er hatte sich bereits damit abgefunden, in den nächsten Sekunden etwas zu tun, das vielleicht edelmütig, gewiß aber völlig überflüssig war (weil es den politischen Häftlingen nicht half), und ihm persönlich unangenehm (weil es unter Umständen geschah, die ihm aufgezwungen worden waren).
// Der Sohn sagte (fast bittend): »Es ist deine Pflicht zu unterschreiben.«
// Seine Pflicht? Sein Sohn erinnerte ihn an seine
// Pflichten?
// Das war das Schlimmste, was man ihm sagen konnte. Wieder erschien vor seinen Augen das Bild Teresas, wie sie die Krähe in den Armen hielt. Er erinnerte sich daran, daß sie gestern in der Bar von einem Spitzel belästigt worden war. Ihre Hände zitterten wieder. Sie war alt geworden.
// Ihm liegt an nichts, außer an ihr. Sie, die aus sechs Zufallen Geborene, sie, die aus dem Ischias des Chefarztes entsprossene Blüte, sie, die jenseits aller »Es muß sein!« steht, sie ist das einzige, was ihm wirklich wichtig ist.
// Warum überlegt er, ob er unterschreiben soll oder nicht?
// Für sämtliche Entscheidungen gibt es nur ein Kriterium: er darf nichts tun, was ihr schaden könnte. Tomas kann keine politischen Gefangenen retten, wohl aber Teresa glücklich machen. Nein, nicht einmal das kann er. Unterzeichnet er aber die Petition, ist es so gut wie sicher, daß die Spitzel sie noch häufiger belästigen und ihre Hände noch stärker zittern werden.
// Er sagte: »Es ist viel wichtiger, eine lebendig begrabene Krähe zu befreien, als dem Präsidenten eine Petition zu schicken.«
// Er wußte, daß der Satz unverständlich war, und gerade deswegen gefiel er ihm noch besser. Er empfand plötzlich einen unerwarteten Rausch. Es war derselbe Rausch wie damals, als er seiner Frau feierlich verkündet hatte, daß er weder sie noch seinen Sohn je wiedersehen wollte. Es war derselbe Rausch wie damals, als er das Schreiben in den Briefkasten geworfen hatte, mit dem er sich für immer vom Arztberuf lossagte. Er war gar nicht sicher, richtig zu handeln, doch war er sicher, so zu handeln, wie er handeln wollte.
// Er sagte: »Seid mir nicht böse. Ich werde nicht unterschreiben.«
// Nach ein paar Tagen las er in allen Zeitungen Berichte über die Petition.
// Nirgends stand allerdings geschrieben, daß es sich um ein höfliches Gesuch zugunsten der politischen Gefangenen handelte und man deren Freilassung forderte. Keine einzige Zeitung zitierte auch nur einen Satz des kurzen Textes. Statt dessen wurde lang und breit in unklaren, drohenden Formulierungen von einem staatsfeindlichen Aufruf gesprochen, der zur Basis eines neuen Kampfes gegen den Sozialismus hätte werden sollen. Diejenigen, die den Text unterschrieben hatten, wurden namentlich aufgeführt, und ihre Namen waren von Verleumdungen und Angriffen begleitet, bei denen es Tomas kalt über den Rücken lief.
// Gewiß, das war vorauszusehen gewesen. In jener Zeit wurde jede öffentliche Aktion (jede Versammlung, Petition, Ansammlung auf der Straße), die nicht von der kommunistischen Partei organisiert war, automatisch als gesetzwidrig eingestuft und stellte eine Gefahr für die Teilnehmer dar.
// Jedermann wußte das. Gerade darum ärgerte es Tomas um so mehr, daß er die Petition nicht unterschrieben hatte. Warum eigentlich nicht? Er verstand die Motive seiner Entscheidung selbst nicht mehr so ganz.
// Wieder sehe ich ihn vor mir, wie er mir am Anfang des Romans erschienen ist. Er steht am Fenster und schaut über den Hof auf die Mauer des Wohnblocks gegenüber.
// Das ist das Bild, aus dem er geboren ist. Wie ich schon gesagt habe, werden Romanpersonen nicht wie lebendige
// Menschen aus einem Mutterleib, sondern aus einer Situation, einem Satz, einer Metapher geboren, in deren Kern eine Möglichkeit des Menschen verborgen liegt, von der der Autor meint, daß sie noch nicht entdeckt oder daß noch nichts Wesentliches darüber gesagt worden sei.
// Oder stimmt es, daß ein Autor nur über sich selbst reden kann?
// Hilflos über den Hof zu schauen und nicht zu wissen, was tun; das Rumoren des eigenen Bauches im Moment verliebter Erregung zu hören; zu verraten und nicht innehalten zu können auf dem schönen Weg von Verrat zu Verrat; die Faust zu erheben im Zug des Großen Marsches; seinen Scharfsinn vor den geheimen Mikrophonen der Polizei zur Schau zu stellen - alle diese Situationen habe ich selbst kennengelernt und erlebt, und trotzdem ist aus keiner die Person erwachsen, die ich selbst in meinem curriculum vitae bin. Die Personen meines Romans sind meine eigenen Möglichkeiten, die sich nicht verwirklicht haben. Deshalb habe ich sie alle gleich gern, deshalb machen sie mir alle die gleiche Angst. Jede von ihnen hat eine Grenze überschritten, der ich selbst ausgewichen bin. Gerade diese unüberschrittene Grenze (die Grenze, jenseits derer mein Ich endet) zieht mich an. Erst dahinter beginnt das große Geheimnis, nach dem der Roman fragt.
// Ein Roman ist nicht die Beichte eines Autors, sondern die Erforschung dessen, was das menschliche Leben bedeutet in der Falle, zu der die Welt geworden ist. Aber genug. Kehren wir zu Tomas zurück.
// Er ist allein in der Wohnung und schaut über den Hof auf die schmutzige Mauer des Wohnblocks gegenüber. Er fühlt eine Art Sehnsucht nach dem hochgewachsenen Mann mit dem großen Kinn und nach dessen Freunden, die er nicht kennt und zu denen er nicht gehört. Es kommt ihm vor, als habe er auf einem Bahnsteig eine schöne Unbekannte getroffen, die, noch bevor er sie ansprechen konnte, in den Schlafwagen eines Zuges gestiegen ist, der nach Istanbul oder Lissabon fährt.
// Wieder versuchte er sich vorzustellen, wie er sich hätte richtig verhalten sollen. Und obwohl er bemüht war, alle Gefühle zur Seite zu schieben (die Bewunderung für den Redakteur, die Gereiztheit, die sein Sohn in ihm auslöste), war er immer noch nicht sicher, ob er den Text, den sie ihm vorgelegt hatten, hätte unterschreiben sollen.
// Ist es richtig, die Stimme zu erheben, wenn ein Mensch zum Schweigen gebracht wird? Ja.
// Aber auf der anderen Seite: Warum haben die Zeitungen dieser Petition so viel Platz eingeräumt? Die (total vom Staat manipulierte) Presse hätte doch die ganze Affäre ebensogut verschweigen können, und niemand hätte etwas erfahren.
// Wenn sie darüber berichtete, bedeutete dies, daß sie den Herrschern des Landes gelegen kam! Sie war ein Geschenk des Himmels, um eine neue, große Verfolgungswelle zu rechtfertigen und in Gang zu setzen.
// Wie hätte er sich also richtig verhalten sollen? Unterschreiben oder nicht unterschreiben?
// Man kann die Frage auch so formulieren: Ist es besser zu schreien und so sein eigenes Ende zu beschleunigen? Oder zu schweigen und sich so ein langsameres Sterben zu erkaufen?
// Gibt es überhaupt eine Antwort auf diese Fragen?
// Und von neuem kam ihm ein Gedanke, den wir schon kennen: das menschliche Leben findet nur einmal statt, und deshalb werden wir niemals feststellen können, welche von unseren Entscheidungen gut und welche schlecht waren, weil wir uns in einer gegebenen Situation nur einmal entscheiden können. Es wurde uns kein zweites, drittes oder viertes Leben geschenkt, so daß wir verschiedene Entscheidungen miteinander vergleichen könnten.
// Mit der Geschichte verhält es sich ähnlich wie mit dem Leben des Individuums. Es gibt nur eine Geschichte der Tschechen. Eines Tages wird sie zu Ende sein wie das Leben von Tomas, und sie wird sich nicht ein zweites Mal wiederholen können.
},{"./styles/index.scss":"src/styles/index.scss","./scripts/Modals":"src/scripts/Modals.ts","./scripts/Swiper":"src/scripts/Swiper.ts","./scripts/Parallax":"src/scripts/Parallax.ts","./scripts/Preload":"src/scripts/Preload.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50734" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map
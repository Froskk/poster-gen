/**
 * Class containing information for rendering a repeating svg pattern
 *
 * @param {*} svg - An SVG Node element used as the repeating pattern
 * @param {*} target - An HTML element to repeating svg nodes
 */
const Poster = function(svg, target) {
  this._svg = svg;
  this._target = target;

  this.copies = 5;
  this.scale = 1.1;
  this.offsetX = 0;
  this.offsetY = 0;
  this.minimumSize = 0.5;
  this.fill = true;

  this.startColor = "#5CCFE6";
  this.endColor = "#ff9c00";

  this.render = () => {
    for (let i = 0; i < this.copies; i++) {
      const svgClone = this._svg.cloneNode({ deep: true });
      svgClone.setAttribute("transform", `scale(${1.1 + i / 10})`);
      this._target.appendChild(svgClone);
    }
  };

  this.setAttr = (attr, value) => {
    if (this.hasOwnProperty(attr)) {
      if (attr === "copies") {
        const prevCopies = 1;
      }
      this[attr] = value;
      this.render();
    }
  };

  this.render();
};

/**
 * Instantiates dat.gui which controls the SVG pattern
 *
 * @param {*} binding - The instance of the controlled object
 * @returns gui - Controller library
 */
const initGUI = binding => {
  const gui = new dat.GUI();
  gui.add(binding, "copies", 5, 25).step(1);
  gui.add(binding, "scale", 1, 3).step(0.25);
  gui.add(binding, "offsetX", -20, 20).step(1);
  gui.add(binding, "offsetY", -20, 20).step(1);
  gui.add(binding, "minimumSize", 0.1, 1).step(0.1);
  gui.add(binding, "fill", true);
  gui.addColor(binding, "startColor");
  gui.addColor(binding, "endColor");

  // IDEA: shadows on svg with feOffset

  gui.open();

  return gui;
};

/**
 * Neat logging provided whenever a change occurs in dat.gui
 * Bound to each controller element in gui
 *
 * @param {*} property
 * @param {*} value
 */
const guiLog = (property, value) => {
  console.log(
    "Prop: %c" + property + "%c Val: %c" + value,
    "color: #5CCFE6",
    "color: none",
    "color: #ffc900"
  );
};

window.onload = function() {
  const wrapper = document.querySelector(".wrapper");
  const svgNode = document.querySelector("svg");
  const svgClone = svgNode.cloneNode({ deep: true });
  svgClone.style.display = "unset";

  const image = new Poster(svgClone, wrapper);
  const gui = initGUI(image);

  gui.__controllers.map(controller => {
    controller.onChange(value => {
      guiLog(controller.property, value);
      image.setAttr(controller.property, value);
    });
  });
};

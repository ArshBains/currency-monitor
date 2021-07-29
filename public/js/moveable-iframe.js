// iframe
var mouveable = function (ele) {
  var selected = null,
    x_pos = 0,
    y_pos = 0,
    x_ele = 0,
    y_ele = 0,
    _drag_init = function (elem) {
      selected = elem;

      x_ele = x_pos - selected.offsetLeft;

      y_ele = y_pos - selected.offsetTop;
    },
    _move_elem = function (ev) {
      x_pos = document.all ? window.event.clientX : ev.pageX;

      y_pos = document.all ? window.event.clientY : ev.pageY;

      if (selected !== null) {
        selected.style.left = x_pos - x_ele + "px";

        selected.style.top = y_pos - y_ele + "px";
      }
    },
    _destroy = function () {
      selected = null;
    };

  ele.onmousedown = function () {
    _drag_init(ele);

    return false;
  };

  document.onmousemove = _move_elem;

  document.onmouseup = _destroy;
};

mouveable(document.body.querySelector("#gam-container"));

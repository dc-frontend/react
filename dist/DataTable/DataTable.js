"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DataTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This component creates a tabular view of a data set given some items and optional columns
 */
var DataTable = /*#__PURE__*/function (_React$Component) {
  _inherits(DataTable, _React$Component);

  var _super = _createSuper(DataTable);

  function DataTable() {
    _classCallCheck(this, DataTable);

    return _super.apply(this, arguments);
  }

  _createClass(DataTable, [{
    key: "getColumns",
    value: function getColumns() {
      var cols = this.props.columns;

      if (!cols) {
        // If we dont have explicit columns, try to be implicit.
        cols = this.getImplicitColumns();
      }

      return cols;
    }
  }, {
    key: "getImplicitColumns",
    value: function getImplicitColumns() {
      var columns = {};

      if (typeof this.props.items !== 'undefined') {
        this.props.items.map(function (i) {
          Object.keys(i).map(function (col) {
            if (typeof columns[col] === 'undefined') {
              columns[col] = {
                field: col,
                name: col
              };
            }
          });
        });
      }

      var columnArray = [];
      Object.keys(columns).map(function (col) {
        columnArray.push(columns[col]);
      });
      return columnArray;
    }
  }, {
    key: "renderColumnHeadings",
    value: function renderColumnHeadings() {
      var cols = this.getColumns();
      return /*#__PURE__*/_react["default"].createElement("tr", {
        key: "headings"
      }, cols.map(function (c) {
        return /*#__PURE__*/_react["default"].createElement("th", {
          key: c.field
        }, c.name);
      }));
    }
  }, {
    key: "getFieldKey",
    value: function getFieldKey(item, column) {
      return item.name + column.field;
    }
  }, {
    key: "renderField",
    value: function renderField(item, column) {
      var key = this.getFieldKey(item, column);

      if (typeof column.field === 'function') {
        return /*#__PURE__*/_react["default"].createElement("td", {
          key: key
        }, column.field(item));
      }

      return /*#__PURE__*/_react["default"].createElement("td", {
        key: key
      }, item[column.field]);
    }
  }, {
    key: "renderData",
    value: function renderData() {
      var _this = this;

      var items = this.props.items;
      var columns = this.getColumns();

      if (!items || !columns) {
        return '';
      }

      return items.map(function (i) {
        var cssClass = '';

        if (typeof i.className !== 'undefined') {
          cssClass = i.className;
        }

        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: i.name,
          className: cssClass
        }, columns.map(function (c) {
          return _this.renderField(i, c);
        }));
      });
    }
  }, {
    key: "tableClasses",
    value: function tableClasses() {
      var classNames = ['table'];

      if (typeof this.props.classes !== 'undefined') {
        this.props.classes.map(function (c) {
          classNames.push(c);
        });
      }

      return classNames.join(' ');
    }
  }, {
    key: "render",
    value: function render() {
      var headings = this.renderColumnHeadings();
      var data = this.renderData();
      var tClass = this.tableClasses();
      return /*#__PURE__*/_react["default"].createElement("table", {
        className: tClass
      }, /*#__PURE__*/_react["default"].createElement("thead", null, headings), /*#__PURE__*/_react["default"].createElement("tbody", null, data));
    }
  }]);

  return DataTable;
}(_react["default"].Component);

exports.DataTable = DataTable;
DataTable.propTypes = {
  /**
   * An array of columns (objects) with the following properties:
   *
   * - name: 'The display name of the column'
   * - field: Either the key of a property on item to return or a function returning the value
   */
  columns: _propTypes["default"].array,

  /**
   * An array of data items to be shown in the table
   */
  items: _propTypes["default"].array.isRequired,

  /**
   * Allows css classes to be passed in to be used in the component.
   */
  classes: _propTypes["default"].array,

  /**
   * Primary key, required for looping through each object (sets react's `key`).
   */
  primaryKey: _propTypes["default"].string
};
DataTable.defaultProps = {
  primaryKey: 'id'
};
DataTable.__docgenInfo = {
  "description": "This component creates a tabular view of a data set given some items and optional columns",
  "methods": [{
    "name": "getColumns",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "getImplicitColumns",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "renderColumnHeadings",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "getFieldKey",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "item",
      "type": null
    }, {
      "name": "column",
      "type": null
    }],
    "returns": null
  }, {
    "name": "renderField",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "item",
      "type": null
    }, {
      "name": "column",
      "type": null
    }],
    "returns": null
  }, {
    "name": "renderData",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "tableClasses",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }],
  "displayName": "DataTable",
  "props": {
    "primaryKey": {
      "defaultValue": {
        "value": "'id'",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Primary key, required for looping through each object (sets react's `key`)."
    },
    "columns": {
      "type": {
        "name": "array"
      },
      "required": false,
      "description": "An array of columns (objects) with the following properties:\n\n- name: 'The display name of the column'\n- field: Either the key of a property on item to return or a function returning the value"
    },
    "items": {
      "type": {
        "name": "array"
      },
      "required": true,
      "description": "An array of data items to be shown in the table"
    },
    "classes": {
      "type": {
        "name": "array"
      },
      "required": false,
      "description": "Allows css classes to be passed in to be used in the component."
    }
  }
};
var _default = DataTable;
exports["default"] = _default;
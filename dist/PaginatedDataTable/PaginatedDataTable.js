"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginatedDataTable = void 0;

var _DataTable2 = require("../DataTable/DataTable");

var _react = _interopRequireDefault(require("react"));

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

var PaginatedDataTable = /*#__PURE__*/function (_DataTable) {
  _inherits(PaginatedDataTable, _DataTable);

  var _super = _createSuper(PaginatedDataTable);

  function PaginatedDataTable(props) {
    var _this;

    _classCallCheck(this, PaginatedDataTable);

    _this = _super.call(this, props);
    _this.state = {
      page: 1
    };
    return _this;
  }

  _createClass(PaginatedDataTable, [{
    key: "getPerPage",
    value: function getPerPage() {
      if (typeof this.props.perPage === "undefined") {
        return 25;
      }

      return this.props.perPage;
    }
  }, {
    key: "getStartIndex",
    value: function getStartIndex() {
      var perPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getPerPage();
      return (this.state.page - 1) * perPage;
    }
  }, {
    key: "getEndIndex",
    value: function getEndIndex() {
      var startIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getPerPage();

      if (!startIndex) {
        startIndex = this.getStartIndex(perPage);
      }

      return startIndex + perPage;
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var items = this.props.items;
      var paginateAmount = this.getPerPage();

      if (items.length <= paginateAmount) {
        return items;
      }

      var perPage = this.getPerPage();
      var startIndex = this.getStartIndex(perPage);
      var endIndex = this.getEndIndex(startIndex, perPage);
      return items.slice(startIndex, endIndex);
    }
  }, {
    key: "renderNextButton",
    value: function renderNextButton() {
      var hasNext = this.getEndIndex() <= this.props.items.length;

      if (hasNext) {
        return /*#__PURE__*/_react["default"].createElement("button", {
          className: "btn button is-small is-pulled-right",
          onClick: this.nextPage.bind(this)
        }, this.props.nextPageLabel);
      }

      return '';
    }
  }, {
    key: "renderPrevButton",
    value: function renderPrevButton() {
      if (this.state.page > 1) {
        return /*#__PURE__*/_react["default"].createElement("button", {
          className: "btn button is-small",
          onClick: this.prevPage.bind(this)
        }, this.props.prevPageLabel);
      }

      return '';
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var colCount = this.getColumns().length;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
        colSpan: colCount
      }, this.renderPrevButton(), this.renderNextButton())));
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var nextPage = this.state.page + 1;
      this.setState({
        page: nextPage
      });
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.state.page > 1) {
        var prevPage = this.state.page - 1;
        this.setState({
          page: prevPage
        });
      }
    }
  }, {
    key: "renderData",
    value: function renderData() {
      var _this2 = this;

      var items = this.getItems();
      var columns = this.getColumns();

      if (!items || !columns) {
        return '';
      }

      return items.map(function (i) {
        var cssClass = '';

        if (typeof i.className !== "undefined") {
          cssClass = i.className;
        }

        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: i[_this2.props.primaryKey],
          className: cssClass
        }, columns.map(function (c) {
          return _this2.renderField(i, c);
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var headings = this.renderColumnHeadings();
      var data = this.renderData();
      var tClass = this.tableClasses();
      return /*#__PURE__*/_react["default"].createElement("table", {
        className: tClass
      }, /*#__PURE__*/_react["default"].createElement("thead", null, headings), /*#__PURE__*/_react["default"].createElement("tfoot", null, this.renderControls()), /*#__PURE__*/_react["default"].createElement("tbody", null, data));
    }
  }]);

  return PaginatedDataTable;
}(_DataTable2.DataTable);

exports.PaginatedDataTable = PaginatedDataTable;
PaginatedDataTable.defaultProps = {
  prevPageLabel: 'Prev Page',
  nextPageLabel: 'Next Page'
};
PaginatedDataTable.__docgenInfo = {
  "description": "",
  "methods": [{
    "name": "getPerPage",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "getStartIndex",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "perPage",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getEndIndex",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "startIndex",
      "type": null
    }, {
      "name": "perPage",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getItems",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "renderNextButton",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "renderPrevButton",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "renderControls",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "nextPage",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "prevPage",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "renderData",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }],
  "displayName": "PaginatedDataTable",
  "props": {
    "prevPageLabel": {
      "defaultValue": {
        "value": "'Prev Page'",
        "computed": false
      },
      "required": false
    },
    "nextPageLabel": {
      "defaultValue": {
        "value": "'Next Page'",
        "computed": false
      },
      "required": false
    }
  }
};
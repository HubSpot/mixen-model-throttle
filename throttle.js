(function() {
  var ThrottleModel, _base;

  ThrottleModel = (function() {
    function ThrottleModel() {}

    ThrottleModel.prototype.initialize = function() {
      ThrottleModel.__super__.initialize.apply(this, arguments);
      return this.lastSave = 0;
    };

    ThrottleModel.prototype.save = function(data, opts) {
      var after, name, old_error, old_success,
        _this = this;
      if (opts == null) {
        opts = {};
      }
      if (typeof data === 'string') {
        name = data;
        data = {};
        data[name] = opts;
        opts = {};
      }
      if (opts.minSaveInterval == null) {
        opts.minSaveInterval = 100;
      }
      if (this.saving || (this.lastSave && (new Date - this.lastSave) < opts.minSaveInterval)) {
        this.set(data, opts);
        this.queued = [{}, opts];
        return;
      }
      after = function() {
        var args;
        _this.saving = false;
        if (_this.queued) {
          args = _this.queued;
          _this.queued = false;
          return setTimeout(function() {
            return _this.save.apply(_this, args);
          }, opts.minSaveInterval);
        }
      };
      old_success = opts.success;
      opts.success = function() {
        if (typeof old_success === "function") {
          old_success.apply(null, arguments);
        }
        return after();
      };
      old_error = opts.error;
      opts.error = function() {
        if (typeof old_error === "function") {
          old_error.apply(null, arguments);
        }
        return after();
      };
      this.queued = false;
      this.saving = true;
      this.lastSave = +(new Date);
      return ThrottleModel.__super__.save.call(this, data, opts);
    };

    return ThrottleModel;

  })();

  if (typeof define === 'function' && define.amd) {
    define(function() {
      return ThrottleModel;
    });
  } else if (typeof exports === 'object') {
    module.exports = ThrottleModel;
  } else {
    if (!window.Mixen) {
      throw new Error("Mixen must be defined before including a mixin");
    }
    if ((_base = window.Mixen).Model == null) {
      _base.Model = {};
    }
    window.Mixen.Model.Throttle = ThrottleModel;
  }

}).call(this);

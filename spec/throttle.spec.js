(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  describe('Throttle', function() {
    it('should be defined', function() {
      var MyThing, _ref;
      return MyThing = (function(_super) {
        __extends(MyThing, _super);

        function MyThing() {
          _ref = MyThing.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        return MyThing;

      })(Mixen(Mixen.Model.Throttle));
    });
    return it('should prevent concurrent saves', function() {
      var MyThing, inst, requests, _ref;
      requests = 0;
      MyThing = (function(_super) {
        __extends(MyThing, _super);

        function MyThing() {
          _ref = MyThing.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        MyThing.prototype.sync = function(method, model, options) {
          requests++;
          return setTimeout(function() {
            requests--;
            return options.success(model, {}, options);
          }, 50);
        };

        return MyThing;

      })(Mixen(Mixen.Model.Throttle, Backbone.Model));
      inst = new MyThing;
      runs(function() {
        inst.save({}, {
          minSaveInterval: 0
        });
        return expect(requests).toBe(1);
      });
      waits(0);
      runs(function() {
        inst.save({}, {
          minSaveInterval: 0
        });
        return expect(requests).toBe(1);
      });
      waits(75);
      runs(function() {
        return expect(requests).toBe(1);
      });
      waits(55);
      return runs(function() {
        return expect(requests).toBe(0);
      });
    });
  });

}).call(this);

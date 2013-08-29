describe 'Throttle', ->
  it 'should be defined', ->
    class MyThing extends Mixen(Mixen.Model.Throttle)

  it 'should prevent concurrent saves', ->
    requests = 0

    class MyThing extends Mixen(Mixen.Model.Throttle, Backbone.Model)
      sync: (method, model, options) ->
        requests++

        setTimeout ->
          requests--
          options.success(model, {}, options)
        , 50

    inst = new MyThing

    runs ->
      inst.save({}, {minSaveInterval: 0})

      expect(requests).toBe(1)

    waits 0

    runs ->
      inst.save({}, {minSaveInterval: 0})

      expect(requests).toBe(1)

    waits 75

    runs ->
      expect(requests).toBe(1)

    waits 55

    runs ->
      expect(requests).toBe(0)

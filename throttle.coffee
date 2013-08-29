class ThrottleModel
  initialize: ->
    super

    @lastSave = 0

  save: (data, opts={}) ->
    if typeof data is 'string'
      name = data
      data = {}
      data[name] = opts
      opts = {}

    opts.minSaveInterval ?= 100

    if @saving or (@lastSave and (new Date - @lastSave) < opts.minSaveInterval)
      @set data, opts
      @queued = [{}, opts]
      return

    after = =>
      @saving = false

      if @queued
        args = @queued
        @queued = false
        
        setTimeout =>
          @save args...
        , opts.minSaveInterval

    old_success = opts.success
    opts.success = =>
      old_success?(arguments...)

      after()

    old_error = opts.error
    opts.error = =>
      old_error?(arguments...)

      after()

    @queued = false
    @saving = true
    @lastSave = +new Date

    super data, opts
  
if typeof define is 'function' and define.amd
  # AMD
  define -> ThrottleModel
else if typeof exports is 'object'
  # Node
  module.exports = ThrottleModel
else
  # Global
  if not window.Mixen
    throw new Error "Mixen must be defined before including a mixin"

  window.Mixen.Model ?= {}
  window.Mixen.Model.Throttle = ThrottleModel

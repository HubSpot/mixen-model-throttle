Mixen Model Throttle
==================== 

A class which you can use with [Mixen](https://github.com/HubSpot/Mixen) to prevent your Backbone models
from saving too frequently.

Usage
-----

```coffeescript
class MyModel extends Mixen(Mixen.Model.Throttle, Backbone.Model)
  minSaveInterval: 500
  # Treat it like a normal model
  # It won't save more than every 500ms
```

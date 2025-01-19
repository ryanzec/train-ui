# Edg UI

This library is not in the state where I want it to be to write out the basic read me, once it is, this will be filled in.

# Setup
- 

# Examples To Create

- event stream api mock
  - simulate openai chat streaming with UI
- 

#  Notes
- when setting form values from the form system, if you want to do this in an effect, you will need to make sure to wrap that code in a `untrack()` as setting form data also reads that data (to update things like validation state) which means in an effect update the data that is read will cause the effect to run until solidjs errors out because of an infinite loop happening.

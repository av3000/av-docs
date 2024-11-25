# JavaScript

## Mechanism

JS (it's call stack) is single threaded and can handle single task at a time

Web apis allow interact with features of the browser and some of these enable async tasks

Task queue - used by callback based apis to enqueue task once async task completed.

Event loop - ensures microtask queue is empty before executing the task queue.

Microtask queue - used only by async handlers, async bodies after await, microtask queue callbacks and new mutationObservables. Has priority over task queue. After each task in task queue the microtask queue is checked if any new tasks were not added.

ECMAScript versions

## Main features

main features

## Data types

Data types

### Arrays

Arrays

#### Methods

map
slice

##### By Version

filter
reduce
find

### Objects

Objects

spread operator

#### Object Prototypes

Object.prototype

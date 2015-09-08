# d-endless
Infinite scrolling component for DerbyJS using filters

## Install
```javascript
app.component(require('d-endless'));
````

## Usage
<b>Component</b>
```javascript
Component.prototype.init = function(model) {
  this.filter = model.root.filter('collection', {limit: 25}, null);
  model.ref('data', this.filter);
};
```

<b>View</b>
```html
<view is="d-endless" filterPath="app.page.component.filter" elementId="div-wrapper" stepSize="25></view>
```

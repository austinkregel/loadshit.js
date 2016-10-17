## Loadshit
For people who want a fast load time for SEO ([Test my site](https://testmysite.thinkwithgoogle.com/))

## How to use.
Once you print the minified javascript in your header, at the bottom of your body tag, create a script tag and add your scripts and styles in there like:

```javascript
// For scripts
Load.scripts([
    '/js/app.js'
]);

// For Styles
Load.styles([
    '/css/app.css'
]);

// Load the scripts and styles, then inject them into the page
Load.process()

// The ready function, called when ALL the functions have been loaded fully.
Load.ready(function(){
    console.log("All your scripts have been loaded");
});
```

## What's going on here?
1. Well, the `scripts([])` or `styles([])` function stores your scripts and styles in the object called Loadshit. 

2. When `process()` is called it creates the appropriate style/script/link tags with the data from Loadshit.

3. Lastly, ready is only executed when both the styles and scripts have finished loading.

Yes, that's all.


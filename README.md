![image](https://raw.githubusercontent.com/jossef/open-accessability/master/misc/banner.png)

[![Build Status](https://travis-ci.org/jossef/open-accessability.svg?branch=master)](https://travis-ci.org/jossef/open-accessability)

Free accessability tools menu for website maintainers powered by jQuery. [See the demo](https://jossef.github.io/open-accessability/)

### Getting Started


#### CDN
Add the following imports (make sure to import jQuery before)
```
<script src="https://cdn.rawgit.com/jossef/open-accessability/master/dist/open-accessability.min.js"></script>
<link rel="stylesheet" href="https://cdn.rawgit.com/jossef/open-accessability/master/dist/open-accessability.min.css">
```

#### Bower

```
bower install open-accessability --save
```

#### NPM

```
npm install open-accessability --save
```

### Initialization


In order for the plugin to load, it has to be initialized like so:
```
$('body').openAccessibility();
```

In addition, some default options may be overidden on initialization:
```
$('body').openAccessibility({
  textSelector: 'h1,p'
});
```

Full list of default options:
```
isMenuOpened: false
highlightedLinks: false
isMobileEnabled: false
grayscale: 0
brightness: 100
contrast: 100
maxZoomLevel: 3
minZoomLevel: 0.5
zoomStep: 0.2
zoom: 1
cursor: false
textSelector: '.open-accessibility-text'
invert: false
```

#### include inside body

+ require fontawesome
```
<div class="open-accessibility-cursor-workaround open-accessibility-hidden"></div>
<div class="open-accessibility open-accessibility-collapsed">
    <div class="open-accessibility-container">

        <div class="open-accessibility-expand-button">
            <i class="fa fa-universal-access" title="פתח חלונית נגישות"></i>
        </div>

        <div class="open-accessibility-menu open-accessibility-hidden">
            <div class="open-accessibility-close-button">
                <i class="fa fa-times" title="סגור חלונית נגישות"></i>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-zoom-out-button">
                <i class="fa fa-search-minus open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">הקטן</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-zoom-in-button">
                <i class="fa fa-search-plus open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">הגדל</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-invert-button">
                <i class="fa fa-desktop open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">היפוך צבעים</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-cursor-button">
                <i class="fa fa-mouse-pointer open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">עכבר גדול</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-brightness-button">
                <i class="fa fa-sun-o open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">בהירות</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-contrast-button">
                <i class="fa fa-adjust open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">ניגודיות</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-monochrome-button">
                <i class="fa fa-low-vision open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">גווני אפור</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-reset-button">
                <i class="fa fa-undo open-accessibility-icon" aria-hidden="true"></i>
                <div class="open-accessibility-icon-desc">בטל שינויים</div>
            </div>
            <div class="open-accessibility-menu-footer">
                powered with 💗 by
                <a href="https://github.com/jossef/open-accessability" target="_blank" rel="nofollow">Open Accessibility</a>
            </div>
        </div>
    </div>
</div>
```

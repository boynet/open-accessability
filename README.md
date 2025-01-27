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
isMobileEnabled: true
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
highlightedHeaders: false
```

#### include inside body

```
<div class="open-accessibility-cursor-workaround open-accessibility-hidden"></div>
<div class="open-accessibility open-accessibility-collapsed">
    <div class="open-accessibility-container">

        <div class="open-accessibility-expand-button" title="פתח חלונית נגישות">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
                style="fill: rgb(65 150 242);transform: ;msFilter:;">
                <path
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3.33A1.67 1.67 0 1 1 10.33 7 1.67 1.67 0 0 1 12 5.33zm3.33 12.5-1.66.84-1.39-3.89h-.56l-1.39 3.89-1.66-.84 1.66-4.72v-1.66L7 10.33l.56-1.66 3.33 1.11h2.22l3.33-1.11.56 1.66-3.33 1.12v1.66z">
                </path>
            </svg>
        </div>

        <div class="open-accessibility-menu open-accessibility-hidden">
            <div class="open-accessibility-close-button" title="סגור חלונית נגישות">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>            </div>

            <div class="open-accessibility-menu-button open-accessibility-zoom-out-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M6 9h8v2H6z"></path><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                <div class="open-accessibility-icon-desc">הקטן</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-zoom-in-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M11 6H9v3H6v2h3v3h2v-3h3V9h-3z"></path><path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path></svg>
                <div class="open-accessibility-icon-desc">הגדל</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-invert-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m21.207 11.278-2.035-2.035-1.415-1.415-5.035-5.035a.999.999 0 0 0-1.414 0L6.151 7.949 4.736 9.363a2.985 2.985 0 0 0-.878 2.122c0 .802.313 1.556.879 2.121l.707.707-2.122 2.122a2.925 2.925 0 0 0-.873 2.108 2.968 2.968 0 0 0 1.063 2.308 2.92 2.92 0 0 0 1.886.681c.834 0 1.654-.341 2.25-.937l2.039-2.039.707.706c1.133 1.133 3.107 1.134 4.242.001l.708-.707.569-.569.138-.138 5.156-5.157a.999.999 0 0 0 0-1.414zm-7.277 5.865-.708.706a1.021 1.021 0 0 1-1.414 0l-1.414-1.413a.999.999 0 0 0-1.414 0l-2.746 2.745a1.192 1.192 0 0 1-.836.352.914.914 0 0 1-.595-.208.981.981 0 0 1-.354-.782.955.955 0 0 1 .287-.692l2.829-2.829a.999.999 0 0 0 0-1.414l-1.414-1.415c-.189-.188-.293-.438-.293-.706s.104-.519.293-.708l.707-.707 3.536 3.536 3.536 3.535z"></path></svg>
                <div class="open-accessibility-icon-desc">היפוך צבעים</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-cursor-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20.978 13.21a1 1 0 0 0-.396-1.024l-14-10a.999.999 0 0 0-1.575.931l2 17a1 1 0 0 0 1.767.516l3.612-4.416 3.377 5.46 1.701-1.052-3.357-5.428 6.089-1.218a.995.995 0 0 0 .782-.769z"></path></svg>
                <div class="open-accessibility-icon-desc">עכבר גדול</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-brightness-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path></svg>
                <div class="open-accessibility-icon-desc">בהירות</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-contrast-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.062 4.938A9.942 9.942 0 0 0 12.016 2h-.026a9.94 9.94 0 0 0-7.071 2.938c-3.898 3.898-3.898 10.243 0 14.143 1.895 1.895 4.405 2.938 7.071 2.938s5.177-1.043 7.071-2.938c3.9-3.899 3.9-10.243.001-14.143zM13.5 15a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 13.5 15zM6.333 6.353A7.953 7.953 0 0 1 11.99 4l.026.001c1.652.008 3.242 1.066 3.55 2.371.366 1.552-1.098 3.278-4.018 4.737-5.113 2.555-5.312 5.333-4.975 6.762l.008.021c-.082-.075-.169-.146-.249-.226-3.118-3.119-3.118-8.194.001-11.313z"></path><circle cx="10.5" cy="7.5" r="1.5"></circle></svg>
                <div class="open-accessibility-icon-desc">ניגודיות</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-highlighted-links-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path><path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path></svg>
                <div class="open-accessibility-icon-desc">הדגשת קישורים</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-highlighted-headers-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M18 20V4h-3v6H9V4H6v16h3v-7h6v7z"></path></svg>
                <div class="open-accessibility-icon-desc">הדגשת כותרות</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-monochrome-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path></svg>
                <div class="open-accessibility-icon-desc">גווני אפור</div>
            </div>

            <div class="open-accessibility-menu-button open-accessibility-reset-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.89 10.105a8.696 8.696 0 0 0-.789-1.456l-1.658 1.119a6.606 6.606 0 0 1 .987 2.345 6.659 6.659 0 0 1 0 2.648 6.495 6.495 0 0 1-.384 1.231 6.404 6.404 0 0 1-.603 1.112 6.654 6.654 0 0 1-1.776 1.775 6.606 6.606 0 0 1-2.343.987 6.734 6.734 0 0 1-2.646 0 6.55 6.55 0 0 1-3.317-1.788 6.605 6.605 0 0 1-1.408-2.088 6.613 6.613 0 0 1-.382-1.23 6.627 6.627 0 0 1 .382-3.877A6.551 6.551 0 0 1 7.36 8.797 6.628 6.628 0 0 1 9.446 7.39c.395-.167.81-.296 1.23-.382.107-.022.216-.032.324-.049V10l5-4-5-4v2.938a8.805 8.805 0 0 0-.725.111 8.512 8.512 0 0 0-3.063 1.29A8.566 8.566 0 0 0 4.11 16.77a8.535 8.535 0 0 0 1.835 2.724 8.614 8.614 0 0 0 2.721 1.833 8.55 8.55 0 0 0 5.061.499 8.576 8.576 0 0 0 6.162-5.056c.22-.52.389-1.061.5-1.608a8.643 8.643 0 0 0 0-3.45 8.684 8.684 0 0 0-.499-1.607z"></path></svg>
                <div class="open-accessibility-icon-desc">בטל שינויים</div>
            </div>
            <div class="open-accessibility-menu-footer">
                powered with 💗 by
                <a href="https://github.com/jossef/open-accessability" target="_blank" rel="nofollow">Open
                    Accessibility</a>
            </div>
        </div>
    </div>
</div>
```

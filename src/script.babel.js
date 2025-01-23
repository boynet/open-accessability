class OpenAccessibility {
    static UNITS = ['px', 'cm', 'em', 'ex', 'in', 'mm', 'pc', 'pt', 'vh', 'vw', 'vmin'];
    static LOCAL_STORAGE_OPTIONS_KEY = 'open-accessibility-config';

    constructor(element, customOptions = {}) {
        this.first_run = true;
        this.element = element;

        const defaultOptions = {
            isMenuOpened: false,
            highlightedLinks: false,
            isMobileEnabled: true,
            grayscale: 0,
            brightness: 100,
            contrast: 100,
            maxZoomLevel: 3,
            minZoomLevel: 0.5,
            zoomStep: 0.2,
            zoom: 1,
            cursor: false,
            textSelector: '.open-accessibility-text',
            invert: false,
            highlightedHeaders: false
        };

        const userOptions = this.getUserOptions();
        this.initialOptions = Object.assign({}, defaultOptions, customOptions);
        this.options = Object.assign({}, this.initialOptions, userOptions, customOptions);

        if (!this.options.isMobileEnabled && this.isMobileBrowser()) {
            console.log('disabling accessibility plugin due to mobile browser');
            return;
        }

        this.initializeElements();
        this.setupEventListeners();
        this.initializeMenu();
        this.setupCursorWorkaround();
        this.apply();
    }

    static getUnit(fontSize) {
        fontSize = fontSize || '';
        return OpenAccessibility.UNITS
            .filter(unit => fontSize.match(new RegExp(unit + '$', 'gi')))
            .pop();
    }

    static isGoogleChrome() {
        const isChromium = window.chrome;
        const winNav = window.navigator;
        const vendorName = winNav.vendor;
        const isOpera = winNav.userAgent.indexOf("OPR") > -1;
        const isIEedge = winNav.userAgent.indexOf("Edge") > -1;

        return (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false);
    }

    isMobileBrowser() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const product = userAgent.substr(0, 4);
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(product);
    }

    getUserOptions() {
        let data;
        try {
            data = localStorage.getItem(OpenAccessibility.LOCAL_STORAGE_OPTIONS_KEY);
            data = JSON.parse(data);
        } catch (e) { }

        return (data && typeof data === "object") ? data : {};
    }

    setUserOptions(options) {
        try {
            localStorage.setItem(OpenAccessibility.LOCAL_STORAGE_OPTIONS_KEY, JSON.stringify(options));
        } catch (e) { }
    }

    applyTextZoom(selector, zoom) {
        if (this.first_run && zoom == 1) return;

        document.querySelectorAll(selector).forEach(element => {
            if (element.closest('.open-accessibility')) return; // Skip menu elements

            let originalFontSize = element.getAttribute('data-open-accessibility-text-original');
            if (!originalFontSize) {
                originalFontSize = window.getComputedStyle(element).fontSize;
                element.setAttribute('data-open-accessibility-text-original', originalFontSize);
            }

            const units = OpenAccessibility.getUnit(originalFontSize) || '';
            const fontSize = parseFloat(originalFontSize) * zoom;
            element.style.fontSize = fontSize + units;
        });
    }

    initializeElements() {
        this.html = document.documentElement;
        this.body = document.body;
        this.container = document.querySelector(".open-accessibility");
        this.menu = document.querySelector(".open-accessibility-menu");
        this.expandButton = document.querySelector(".open-accessibility-expand-button");
        this.closeButton = document.querySelector(".open-accessibility-close-button");
        this.invertButton = document.querySelector(".open-accessibility-invert-button");
        this.cursorButton = document.querySelector(".open-accessibility-cursor-button");
        this.zoomInButton = document.querySelector(".open-accessibility-zoom-in-button");
        this.zoomOutButton = document.querySelector(".open-accessibility-zoom-out-button");
        this.brightnessButton = document.querySelector(".open-accessibility-brightness-button");
        this.monochromeButton = document.querySelector(".open-accessibility-monochrome-button");
        this.contrastButton = document.querySelector(".open-accessibility-contrast-button");
        this.resetButton = document.querySelector(".open-accessibility-reset-button");
        this.cursorWorkaround = document.querySelector(".open-accessibility-cursor-workaround");
        this.highlightedLinksButton = document.querySelector(".open-accessibility-highlighted-links-button");
        this.highlightedHeadersButton = document.querySelector(".open-accessibility-highlighted-headers-button");
    }

    setupEventListeners() {
        this.brightnessButton.addEventListener('click', () => {
            this.options.brightness += 50;
            if (this.options.brightness > 150) {
                this.options.brightness = 50;
            }
            this.apply();
        });

        this.contrastButton.addEventListener('click', () => {
            this.options.contrast += 50;
            if (this.options.contrast > 150) {
                this.options.contrast = 50;
            }
            this.apply();
        });

        this.monochromeButton.addEventListener('click', () => {
            this.options.grayscale += 100;
            if (this.options.grayscale > 100) {
                this.options.grayscale = 0;
            }
            this.apply();
        });

        this.resetButton.addEventListener('click', () => {
            this.options = Object.assign({}, this.initialOptions);
            this.options.isMenuOpened = false;
            this.apply();
        });

        this.zoomInButton.addEventListener('click', () => {
            this.options.zoom = Math.min(this.options.maxZoomLevel, this.options.zoom + this.options.zoomStep);
            this.apply();
        });

        this.zoomOutButton.addEventListener('click', () => {
            this.options.zoom = Math.max(this.options.minZoomLevel, this.options.zoom - this.options.zoomStep);
            this.apply();
        });

        this.invertButton.addEventListener('click', () => {
            this.options.invert = !this.options.invert;
            this.apply();
        });

        this.cursorButton.addEventListener('click', () => {
            this.options.cursor = !this.options.cursor;
            this.apply();
        });

        this.expandButton.addEventListener('click', () => {
            this.options.isMenuOpened = true;
            this.apply();
        });

        this.closeButton.addEventListener('click', () => {
            this.options.isMenuOpened = false;
            this.apply();
        });

        this.highlightedLinksButton.addEventListener('click', () => {
            this.options.highlightedLinks = !this.options.highlightedLinks;
            this.apply();
        });

        this.highlightedHeadersButton.addEventListener('click', () => {
            this.options.highlightedHeaders = !this.options.highlightedHeaders;
            this.apply();
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.open-accessibility') && this.options.isMenuOpened) {
                this.options.isMenuOpened = false;
                this.apply();
            }
        });
    }

    initializeMenu() {
        this.menu.classList.add('open-accessibility-hidden');

        if (this.options.isMenuOpened) {
            this.options.isMenuOpened = true;
            this.menu.classList.remove('open-accessibility-hidden');
            this.expandButton.classList.add('open-accessibility-hidden');
        } else {
            this.options.isMenuOpened = false;
        }
    }

    setupCursorWorkaround() {
        this.cursorWorkaround.classList.add('open-accessibility-hidden');

        const googleChrome = OpenAccessibility.isGoogleChrome();
        if (!googleChrome) {
            document.addEventListener('mousemove', (e) => {
                if (!this.options.cursor) return;

                this.cursorWorkaround.style.left = `${e.pageX / this.options.zoom}px`;
                this.cursorWorkaround.style.top = `${e.pageY / this.options.zoom}px`;
            });
        }
    }

    apply() {
        // Menu state
        if (this.options.isMenuOpened) {
            this.expandButton.classList.add('open-accessibility-hidden');
            this.menu.classList.remove('open-accessibility-hidden');
            this.container.classList.remove("open-accessibility-collapsed");
            this.container.classList.add("open-accessibility-expanded");
        } else {
            this.expandButton.classList.remove('open-accessibility-hidden');
            this.menu.classList.add('open-accessibility-hidden');
            this.container.classList.remove("open-accessibility-expanded");
            this.container.classList.add("open-accessibility-collapsed");
        }

        // Filters
        const filters = [];
        if (this.options.invert) {
            filters.push('invert(1)');
        }

        if (this.options.highlightedLinks) {
            this.body.classList.add('open-accessibility-highlighted-links');
        } else {
            this.body.classList.remove('open-accessibility-highlighted-links');
        }

        if (this.options.highlightedHeaders) {
            this.body.classList.add('open-accessibility-highlighted-headers');
        } else {
            this.body.classList.remove('open-accessibility-highlighted-headers');
        }

        if (!this.first_run || (this.options.contrast != 100 && this.options.brightness != 100 && this.options.grayscale != 0)) {
            filters.push(`contrast(${this.options.contrast}%)`);
            filters.push(`brightness(${this.options.brightness}%)`);
            filters.push(`grayscale(${this.options.grayscale}%)`);
            let filterValue = filters.join(' ');
            if (filterValue == "contrast(100%) brightness(100%) grayscale(0%)") filterValue = "none";

            this.body.style.filter = filterValue;
            this.body.style.msFilter = filterValue;
            this.body.style.mozFilter = filterValue;
            this.body.style.webkitFilter = filterValue;
            this.body.style.oFilter = filterValue;
        }

        // Zoom
        this.applyTextZoom(this.options.textSelector, this.options.zoom);

        // Cursor
        if (this.options.cursor) {
            this.html.classList.add('open-accessibility-cursor');
            if (!OpenAccessibility.isGoogleChrome()) {
                this.cursorWorkaround.classList.remove('open-accessibility-hidden');
            }
        } else if (!this.first_run) {
            this.html.classList.remove('open-accessibility-cursor');
            if (!OpenAccessibility.isGoogleChrome()) {
                this.cursorWorkaround.classList.add('open-accessibility-hidden');
            }
        }

        this.setUserOptions(this.options);
        this.first_run = false;
    }
}

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-radial-progress', ['exports', '@angular/common', '@angular/core'], factory) :
    (factory((global['ngx-radial-progress'] = {}),global.ng.common,global.ng.core));
}(this, (function (exports,common,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RadialProgressComponent = /** @class */ (function () {
        function RadialProgressComponent(el) {
            this.el = el;
            this.addClass = '';
            this.animation = true;
            this.circleSize = 0;
            this.clockwise = false;
            this.delay = 0;
            this.fill = 'transparent';
            this.fillBackground = 'transparent';
            this.percent = 50;
            this.percentUnit = '%';
            this.showPercent = true;
            this.strokeBackground = 'transparent';
            this.strokeLinecap = "butt";
            this.strokeSteps = [
                {
                    strokeColor: 'red',
                    strokeStep: 10
                }, {
                    strokeColor: 'green',
                    strokeStep: 100
                }
            ];
            this.strokeWidth = 10;
            this.strokeWidthBackground = this.strokeWidth;
            this.title = '';
            this.transitionDuration = 5000;
            this.onClose = new core.EventEmitter();
            this.initCircleSize = this.circleSize;
            this.strokeDashOffset = 0;
            this.strokeDashArray = 0;
            this.percentCount = 0;
            this.strokeColorActive = this.strokeSteps[0].strokeColor;
            this.circleProgressSteps = 1;
            this.rotateY = 0;
            this.animationHelper = false;
            this.strokeWidthHelper = this.strokeWidth;
            // negate is -1 if clockwise is true, see html
            this.negate = 1;
            this.transParam = {
                transPoints: '',
                transRank: ''
            };
        }
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var self = this;
                this.normalizeData();
                this.setCircleDimensions();
                this.initCircles();
                setTimeout(function () {
                    self.calcDashOffset();
                    self.startPercentCounter();
                    self.gradientColor();
                }, self.delay);
            };
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.normalizeData = /**
         * @return {?}
         */
            function () {
                this.percent = Math.round(this.percent);
                if (this.percent > 100) {
                    this.percent = 100;
                }
                if (this.percent < 0) {
                    this.percent = 0;
                }
                if (this.circleSize == 0) {
                    this.circleSize = this.el.nativeElement.clientWidth;
                }
                this.initCircleSize = this.circleSize;
                if (this.circleSize < this.strokeWidth) {
                    /** @type {?} */
                    var infoMessage = '';
                    infoMessage += 'circleSize is smaller than strokeWidth ';
                    infoMessage += '(' + this.circleSize + ' < ' + this.strokeWidth + ')\n';
                    infoMessage += 'reducing strokeWidth to ' + this.circleSize / 2;
                    console.warn(infoMessage);
                    this.strokeWidth = this.circleSize / 2;
                }
            };
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.setCircleDimensions = /**
         * @return {?}
         */
            function () {
                this.strokeWidthHelper = this.strokeWidth;
                if (this.strokeWidth < this.strokeWidthBackground) {
                    this.strokeWidthHelper = this.strokeWidthBackground;
                }
                this.radius = ((this.circleSize / 2) - (this.strokeWidthHelper / 2)) * Math.PI * 2;
                this.strokeDashArray = this.radius;
                this.strokeDashOffset = this.radius;
            };
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.initCircles = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var self = this;
                if (this.animation) {
                    this.transitionDuration = this.transitionDuration * (this.percent / 100);
                }
                else {
                    this.transitionDuration = 0;
                }
                if (!this.clockwise) {
                    this.rotateY = 180;
                    this.negate = -1;
                }
                this.strokeColorActive = this.strokeSteps[0].strokeColor;
                // check how far circle progress gets
                console.log(this.strokeSteps);
                this.strokeSteps.forEach(function (ele, i) {
                    if (self.percent == 100) {
                        self.circleProgressSteps = self.strokeSteps.length;
                        self.transParam.transPoints = 0;
                    }
                    else if (self.percent >= ele.strokeStep && self.percent >= self.strokeSteps[0].strokeStep) {
                        self.circleProgressSteps = i + 2;
                        self.transParam.transPoints = self.strokeSteps[i + 1].strokeStep - self.percent;
                    }
                });
            };
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.calcDashOffset = /**
         * @return {?}
         */
            function () {
                this.strokeDashOffset = this.radius * (1 - (this.percent / 100));
                this.animationHelper = this.animation;
            };
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.startPercentCounter = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var intervalDuration = this.transitionDuration / this.percent;
                if (this.animation) {
                    /** @type {?} */
                    var self_1 = this;
                    /** @type {?} */
                    var thisCounterInterval_1 = setInterval(function () {
                        self_1.percentCount++;
                        if (self_1.percentCount == self_1.percent) {
                            clearInterval(thisCounterInterval_1);
                        }
                    }, intervalDuration);
                }
                else {
                    this.percentCount = this.percent;
                }
            };
        /**
         * @return {?}
         */
        RadialProgressComponent.prototype.gradientColor = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var self = this;
                if (this.animation) {
                    /** @type {?} */
                    var gradientChangeTimer = this.transitionDuration / this.circleProgressSteps;
                    /** @type {?} */
                    var i_1 = 0;
                    /** @type {?} */
                    var gradientInterval_1 = setInterval(function () {
                        i_1++;
                        if (i_1 >= self.circleProgressSteps) {
                            clearInterval(gradientInterval_1);
                            return;
                        }
                        self.strokeColorActive = self.strokeSteps[i_1].strokeColor;
                    }, gradientChangeTimer);
                }
                else {
                    this.strokeColorActive = this.strokeSteps[this.circleProgressSteps - 1].strokeColor;
                }
            };
        /**
         * @param {?} thisWidth
         * @return {?}
         */
        RadialProgressComponent.prototype.checkSize = /**
         * @param {?} thisWidth
         * @return {?}
         */
            function (thisWidth) {
                this.circleSize = this.initCircleSize;
                console.log(this.initCircleSize, this.circleSize, thisWidth);
                if (thisWidth < this.circleSize) {
                    this.transitionDuration = 0;
                    this.circleSize = thisWidth - this.strokeWidth - 1;
                }
                this.setCircleDimensions();
                this.calcDashOffset();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RadialProgressComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.checkSize(event.target.innerWidth);
            };
        RadialProgressComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'radial-progress',
                        template: "<div class=\"radial-progress\"\n     [ngClass]=\"addClass\">\n  <div class=\"radial-progress--text\">\n    <div *ngIf=\"title!==''\" class=\"radial-progress--title\">\n      {{title}}\n    </div>\n    <div *ngIf=\"showPercent\" class=\"radial-progress--percent-count\">\n      {{percentCount}}<span *ngIf=\"percentUnit!==''\" class=\"radial-progress--percent-count-unit\">{{percentUnit}}</span>\n    </div>\n  </div>\n  <div class=\"radial-progress--circle\" (window:resize)=\"onResize($event)\">\n    <svg class=\"radial-progress--svg\"\n         preserveAspectRatio=\"xMinYMin meet\"\n         [attr.width]=\"circleSize\"\n         [attr.height]=\"circleSize\"\n         viewPort=\"0 0 100 100\"\n         version=\"1.1\"\n         xmlns=\"http://www.w3.org/2000/svg\">\n      <circle\n        class=\"radial-progress--svg-circle\"\n        [attr.cx]=\"(circleSize / 2) * -1\"\n        [attr.cy]=\"circleSize / 2\"\n        [attr.r]=\"(circleSize / 2) - (strokeWidthHelper / 2)\"\n        [attr.fill]=\"fillBackground\"\n        stroke-dasharray=\"0\"\n        stroke-dashoffset=\"0\"\n        [attr.stroke-width]=\"strokeWidthBackground\"\n        [ngStyle]=\"{\n            'stroke-dasharray': strokeDashArray + 'px',\n            'stroke': strokeBackground,\n            'transform': 'rotate(-90deg)',\n            'line-height': '0'\n            }\"\n      ></circle>\n      <circle\n        class=\"radial-progress--svg-circle radial-progress--bar\"\n        [attr.cx]=\"(circleSize / 2) * -1\"\n        [attr.cy]=\"(circleSize / 2) * negate\"\n        [attr.r]=\"(circleSize / 2) - (strokeWidthHelper / 2)\"\n        [attr.fill]=\"fill\"\n        stroke-dasharray=\"0\"\n        stroke-dashoffset=\"0\"\n        [attr.stroke-linecap]=\"strokeLinecap\"\n        [attr.stroke-width]=\"strokeWidth\"\n        [style.transition] = \"animationHelper ? 'all ' + transitionDuration + 'ms linear, stroke ' + transitionDuration / circleProgressSteps +'ms linear' : ''\"\n        [ngStyle]=\"{\n            'stroke': strokeColorActive,\n            'stroke-dashoffset': strokeDashOffset + 'px',\n            'stroke-dasharray': strokeDashArray + 'px',\n            'transform': 'rotateY(' + rotateY + 'deg) rotateZ(-90deg)',\n            'line-height': '0'\n            }\"\n      ></circle>\n    </svg>\n  </div>\n</div>\n",
                        styles: ["\n    :host {\n      display: block;\n    }\n    .radial-progress {\n      position: relative;\n      display: inline-block;\n    }\n    .radial-progress--circle {\n      line-height: 0;\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        RadialProgressComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        RadialProgressComponent.propDecorators = {
            addClass: [{ type: core.Input }],
            animation: [{ type: core.Input }],
            circleSize: [{ type: core.Input }],
            clockwise: [{ type: core.Input }],
            delay: [{ type: core.Input }],
            fill: [{ type: core.Input }],
            fillBackground: [{ type: core.Input }],
            percent: [{ type: core.Input }],
            percentUnit: [{ type: core.Input }],
            showPercent: [{ type: core.Input }],
            strokeBackground: [{ type: core.Input }],
            strokeLinecap: [{ type: core.Input }],
            strokeSteps: [{ type: core.Input }],
            strokeWidth: [{ type: core.Input }],
            strokeWidthBackground: [{ type: core.Input }],
            title: [{ type: core.Input }],
            transitionDuration: [{ type: core.Input }],
            onClose: [{ type: core.Output }]
        };
        return RadialProgressComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RadialProgressModule = /** @class */ (function () {
        function RadialProgressModule() {
        }
        RadialProgressModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [RadialProgressComponent],
                        exports: [RadialProgressComponent]
                    },] }
        ];
        return RadialProgressModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.RadialProgressModule = RadialProgressModule;
    exports.ɵa = RadialProgressComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-radial-progress.umd.js.map
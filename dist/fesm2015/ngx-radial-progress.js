import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RadialProgressComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
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
        this.onClose = new EventEmitter();
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
    ngOnInit() {
        /** @type {?} */
        let self = this;
        this.normalizeData();
        this.setCircleDimensions();
        this.initCircles();
        setTimeout(function () {
            self.calcDashOffset();
            self.startPercentCounter();
            self.gradientColor();
        }, self.delay);
    }
    /**
     * @return {?}
     */
    normalizeData() {
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
            let infoMessage = '';
            infoMessage += 'circleSize is smaller than strokeWidth ';
            infoMessage += '(' + this.circleSize + ' < ' + this.strokeWidth + ')\n';
            infoMessage += 'reducing strokeWidth to ' + this.circleSize / 2;
            console.warn(infoMessage);
            this.strokeWidth = this.circleSize / 2;
        }
    }
    /**
     * @return {?}
     */
    setCircleDimensions() {
        this.strokeWidthHelper = this.strokeWidth;
        if (this.strokeWidth < this.strokeWidthBackground) {
            this.strokeWidthHelper = this.strokeWidthBackground;
        }
        this.radius = ((this.circleSize / 2) - (this.strokeWidthHelper / 2)) * Math.PI * 2;
        this.strokeDashArray = this.radius;
        this.strokeDashOffset = this.radius;
    }
    /**
     * @return {?}
     */
    initCircles() {
        /** @type {?} */
        let self = this;
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
    }
    /**
     * @return {?}
     */
    calcDashOffset() {
        this.strokeDashOffset = this.radius * (1 - (this.percent / 100));
        this.animationHelper = this.animation;
    }
    /**
     * @return {?}
     */
    startPercentCounter() {
        /** @type {?} */
        let intervalDuration = this.transitionDuration / this.percent;
        if (this.animation) {
            /** @type {?} */
            let self = this;
            /** @type {?} */
            let thisCounterInterval = setInterval(function () {
                self.percentCount++;
                if (self.percentCount == self.percent) {
                    clearInterval(thisCounterInterval);
                }
            }, intervalDuration);
        }
        else {
            this.percentCount = this.percent;
        }
    }
    /**
     * @return {?}
     */
    gradientColor() {
        /** @type {?} */
        let self = this;
        if (this.animation) {
            /** @type {?} */
            let gradientChangeTimer = this.transitionDuration / this.circleProgressSteps;
            /** @type {?} */
            let i = 0;
            /** @type {?} */
            let gradientInterval = setInterval(function () {
                i++;
                if (i >= self.circleProgressSteps) {
                    clearInterval(gradientInterval);
                    return;
                }
                self.strokeColorActive = self.strokeSteps[i].strokeColor;
            }, gradientChangeTimer);
        }
        else {
            this.strokeColorActive = this.strokeSteps[this.circleProgressSteps - 1].strokeColor;
        }
    }
    /**
     * @param {?} thisWidth
     * @return {?}
     */
    checkSize(thisWidth) {
        this.circleSize = this.initCircleSize;
        console.log(this.initCircleSize, this.circleSize, thisWidth);
        if (thisWidth < this.circleSize) {
            this.transitionDuration = 0;
            this.circleSize = thisWidth - this.strokeWidth - 1;
        }
        this.setCircleDimensions();
        this.calcDashOffset();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.checkSize(event.target.innerWidth);
    }
}
RadialProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'radial-progress',
                template: "<div class=\"radial-progress\"\n     [ngClass]=\"addClass\">\n  <div class=\"radial-progress--text\">\n    <div *ngIf=\"title!==''\" class=\"radial-progress--title\">\n      {{title}}\n    </div>\n    <div *ngIf=\"showPercent\" class=\"radial-progress--percent-count\">\n      {{percentCount}}<span *ngIf=\"percentUnit!==''\" class=\"radial-progress--percent-count-unit\">{{percentUnit}}</span>\n    </div>\n  </div>\n  <div class=\"radial-progress--circle\" (window:resize)=\"onResize($event)\">\n    <svg class=\"radial-progress--svg\"\n         preserveAspectRatio=\"xMinYMin meet\"\n         [attr.width]=\"circleSize\"\n         [attr.height]=\"circleSize\"\n         viewPort=\"0 0 100 100\"\n         version=\"1.1\"\n         xmlns=\"http://www.w3.org/2000/svg\">\n      <circle\n        class=\"radial-progress--svg-circle\"\n        [attr.cx]=\"(circleSize / 2) * -1\"\n        [attr.cy]=\"circleSize / 2\"\n        [attr.r]=\"(circleSize / 2) - (strokeWidthHelper / 2)\"\n        [attr.fill]=\"fillBackground\"\n        stroke-dasharray=\"0\"\n        stroke-dashoffset=\"0\"\n        [attr.stroke-width]=\"strokeWidthBackground\"\n        [ngStyle]=\"{\n            'stroke-dasharray': strokeDashArray + 'px',\n            'stroke': strokeBackground,\n            'transform': 'rotate(-90deg)',\n            'line-height': '0'\n            }\"\n      ></circle>\n      <circle\n        class=\"radial-progress--svg-circle radial-progress--bar\"\n        [attr.cx]=\"(circleSize / 2) * -1\"\n        [attr.cy]=\"(circleSize / 2) * negate\"\n        [attr.r]=\"(circleSize / 2) - (strokeWidthHelper / 2)\"\n        [attr.fill]=\"fill\"\n        stroke-dasharray=\"0\"\n        stroke-dashoffset=\"0\"\n        [attr.stroke-linecap]=\"strokeLinecap\"\n        [attr.stroke-width]=\"strokeWidth\"\n        [style.transition] = \"animationHelper ? 'all ' + transitionDuration + 'ms linear, stroke ' + transitionDuration / circleProgressSteps +'ms linear' : ''\"\n        [ngStyle]=\"{\n            'stroke': strokeColorActive,\n            'stroke-dashoffset': strokeDashOffset + 'px',\n            'stroke-dasharray': strokeDashArray + 'px',\n            'transform': 'rotateY(' + rotateY + 'deg) rotateZ(-90deg)',\n            'line-height': '0'\n            }\"\n      ></circle>\n    </svg>\n  </div>\n</div>\n",
                styles: [`
    :host {
      display: block;
    }
    .radial-progress {
      position: relative;
      display: inline-block;
    }
    .radial-progress--circle {
      line-height: 0;
    }
  `]
            }] }
];
/** @nocollapse */
RadialProgressComponent.ctorParameters = () => [
    { type: ElementRef }
];
RadialProgressComponent.propDecorators = {
    addClass: [{ type: Input }],
    animation: [{ type: Input }],
    circleSize: [{ type: Input }],
    clockwise: [{ type: Input }],
    delay: [{ type: Input }],
    fill: [{ type: Input }],
    fillBackground: [{ type: Input }],
    percent: [{ type: Input }],
    percentUnit: [{ type: Input }],
    showPercent: [{ type: Input }],
    strokeBackground: [{ type: Input }],
    strokeLinecap: [{ type: Input }],
    strokeSteps: [{ type: Input }],
    strokeWidth: [{ type: Input }],
    strokeWidthBackground: [{ type: Input }],
    title: [{ type: Input }],
    transitionDuration: [{ type: Input }],
    onClose: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RadialProgressModule {
}
RadialProgressModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [RadialProgressComponent],
                exports: [RadialProgressComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RadialProgressModule, RadialProgressComponent as ɵa };

//# sourceMappingURL=ngx-radial-progress.js.map
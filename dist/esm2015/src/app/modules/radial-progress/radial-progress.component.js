/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
export class RadialProgressComponent {
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
if (false) {
    /** @type {?} */
    RadialProgressComponent.prototype.addClass;
    /** @type {?} */
    RadialProgressComponent.prototype.animation;
    /** @type {?} */
    RadialProgressComponent.prototype.circleSize;
    /** @type {?} */
    RadialProgressComponent.prototype.clockwise;
    /** @type {?} */
    RadialProgressComponent.prototype.delay;
    /** @type {?} */
    RadialProgressComponent.prototype.fill;
    /** @type {?} */
    RadialProgressComponent.prototype.fillBackground;
    /** @type {?} */
    RadialProgressComponent.prototype.percent;
    /** @type {?} */
    RadialProgressComponent.prototype.percentUnit;
    /** @type {?} */
    RadialProgressComponent.prototype.showPercent;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeBackground;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeLinecap;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeSteps;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeWidth;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeWidthBackground;
    /** @type {?} */
    RadialProgressComponent.prototype.title;
    /** @type {?} */
    RadialProgressComponent.prototype.transitionDuration;
    /** @type {?} */
    RadialProgressComponent.prototype.onClose;
    /** @type {?} */
    RadialProgressComponent.prototype.initCircleSize;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeDashOffset;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeDashArray;
    /** @type {?} */
    RadialProgressComponent.prototype.percentCount;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeColorActive;
    /** @type {?} */
    RadialProgressComponent.prototype.circleProgressSteps;
    /** @type {?} */
    RadialProgressComponent.prototype.radius;
    /** @type {?} */
    RadialProgressComponent.prototype.rotateY;
    /** @type {?} */
    RadialProgressComponent.prototype.animationHelper;
    /** @type {?} */
    RadialProgressComponent.prototype.strokeWidthHelper;
    /** @type {?} */
    RadialProgressComponent.prototype.negate;
    /** @type {?} */
    RadialProgressComponent.prototype.transParam;
    /**
     * @type {?}
     * @private
     */
    RadialProgressComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaWFsLXByb2dyZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1yYWRpYWwtcHJvZ3Jlc3MvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvcmFkaWFsLXByb2dyZXNzL3JhZGlhbC1wcm9ncmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBa0J6RixNQUFNLE9BQU8sdUJBQXVCOzs7O0lBOENsQyxZQUFvQixFQUFhO1FBQWIsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQTdDeEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFNBQUksR0FBVyxhQUFhLENBQUM7UUFDN0IsbUJBQWMsR0FBVyxhQUFhLENBQUM7UUFDdkMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUMxQixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixxQkFBZ0IsR0FBVyxhQUFhLENBQUM7UUFDekMsa0JBQWEsR0FBVyxNQUFNLENBQUM7UUFDL0IsZ0JBQVcsR0FBUTtZQUMxQjtnQkFDRSxXQUFXLEVBQUUsS0FBSztnQkFDbEIsVUFBVSxFQUFFLEVBQUU7YUFDZixFQUFFO2dCQUNELFdBQVcsRUFBRSxPQUFPO2dCQUNwQixVQUFVLEVBQUUsR0FBRzthQUNoQjtTQUNGLENBQUM7UUFDTyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QiwwQkFBcUIsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2pELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsdUJBQWtC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QUMzQiw2eEVBQTZDO3lCQUNwQzs7Ozs7Ozs7Ozs7R0FXUjthQUNGOzs7O1lBakJrQixVQUFVOzs7dUJBbUIxQixLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzs2QkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOytCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQVNMLEtBQUs7b0NBQ0wsS0FBSztvQkFDTCxLQUFLO2lDQUNMLEtBQUs7c0JBRUwsTUFBTTs7OztJQTFCUCwyQ0FBK0I7O0lBQy9CLDRDQUFtQzs7SUFDbkMsNkNBQWdDOztJQUNoQyw0Q0FBb0M7O0lBQ3BDLHdDQUEyQjs7SUFDM0IsdUNBQXNDOztJQUN0QyxpREFBZ0Q7O0lBQ2hELDBDQUE4Qjs7SUFDOUIsOENBQW1DOztJQUNuQyw4Q0FBcUM7O0lBQ3JDLG1EQUFrRDs7SUFDbEQsZ0RBQXdDOztJQUN4Qyw4Q0FRRTs7SUFDRiw4Q0FBa0M7O0lBQ2xDLHdEQUEwRDs7SUFDMUQsd0NBQTRCOztJQUM1QixxREFBMkM7O0lBRTNDLDBDQUE4RDs7SUFFOUQsaURBQWlDOztJQUNqQyxtREFBNkI7O0lBQzdCLGtEQUE0Qjs7SUFDNUIsK0NBQXlCOztJQUN6QixvREFBNEQ7O0lBQzVELHNEQUFnQzs7SUFDaEMseUNBQWU7O0lBQ2YsMENBQW9COztJQUNwQixrREFBaUM7O0lBQ2pDLG9EQUE2Qzs7SUFFN0MseUNBQW1COztJQUNuQiw2Q0FHRTs7Ozs7SUFFVSxxQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyYWRpYWwtcHJvZ3Jlc3MnLFxuICB0ZW1wbGF0ZVVybDogJ3JhZGlhbC1wcm9ncmVzcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gICAgLnJhZGlhbC1wcm9ncmVzcyB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5yYWRpYWwtcHJvZ3Jlc3MtLWNpcmNsZSB7XG4gICAgICBsaW5lLWhlaWdodDogMDtcbiAgICB9XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlhbFByb2dyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYWRkQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjaXJjbGVTaXplOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBjbG9ja3dpc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGVsYXk6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGZpbGw6IHN0cmluZyA9ICd0cmFuc3BhcmVudCc7XG4gIEBJbnB1dCgpIGZpbGxCYWNrZ3JvdW5kOiBzdHJpbmcgPSAndHJhbnNwYXJlbnQnO1xuICBASW5wdXQoKSBwZXJjZW50OiBudW1iZXIgPSA1MDtcbiAgQElucHV0KCkgcGVyY2VudFVuaXQ6IHN0cmluZyA9ICclJztcbiAgQElucHV0KCkgc2hvd1BlcmNlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzdHJva2VCYWNrZ3JvdW5kOiBzdHJpbmcgPSAndHJhbnNwYXJlbnQnO1xuICBASW5wdXQoKSBzdHJva2VMaW5lY2FwOiBzdHJpbmcgPSBcImJ1dHRcIjtcbiAgQElucHV0KCkgc3Ryb2tlU3RlcHM6IGFueSA9IFtcbiAgICB7XG4gICAgICBzdHJva2VDb2xvcjogJ3JlZCcsXG4gICAgICBzdHJva2VTdGVwOiAxMFxuICAgIH0sIHtcbiAgICAgIHN0cm9rZUNvbG9yOiAnZ3JlZW4nLFxuICAgICAgc3Ryb2tlU3RlcDogMTAwXG4gICAgfVxuICBdO1xuICBASW5wdXQoKSBzdHJva2VXaWR0aDogbnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIHN0cm9rZVdpZHRoQmFja2dyb3VuZDogbnVtYmVyID0gdGhpcy5zdHJva2VXaWR0aDtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0cmFuc2l0aW9uRHVyYXRpb246IG51bWJlciA9IDUwMDA7XG5cbiAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbml0Q2lyY2xlU2l6ZSA9IHRoaXMuY2lyY2xlU2l6ZTtcbiAgc3Ryb2tlRGFzaE9mZnNldDogbnVtYmVyID0gMDtcbiAgc3Ryb2tlRGFzaEFycmF5OiBudW1iZXIgPSAwO1xuICBwZXJjZW50Q291bnQ6IG51bWJlciA9IDA7XG4gIHN0cm9rZUNvbG9yQWN0aXZlOiBzdHJpbmcgPSB0aGlzLnN0cm9rZVN0ZXBzWzBdLnN0cm9rZUNvbG9yO1xuICBjaXJjbGVQcm9ncmVzc1N0ZXBzOiBudW1iZXIgPSAxO1xuICByYWRpdXM6IG51bWJlcjtcbiAgcm90YXRlWTogbnVtYmVyID0gMDtcbiAgYW5pbWF0aW9uSGVscGVyOiBib29sZWFuID0gZmFsc2U7XG4gIHN0cm9rZVdpZHRoSGVscGVyOiBudW1iZXIgPSB0aGlzLnN0cm9rZVdpZHRoO1xuICAvLyBuZWdhdGUgaXMgLTEgaWYgY2xvY2t3aXNlIGlzIHRydWUsIHNlZSBodG1sXG4gIG5lZ2F0ZTogbnVtYmVyID0gMTtcbiAgdHJhbnNQYXJhbTogYW55ID0ge1xuICAgIHRyYW5zUG9pbnRzOiAnJyxcbiAgICB0cmFuc1Jhbms6ICcnXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDpFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZURhdGEoKTtcbiAgICB0aGlzLnNldENpcmNsZURpbWVuc2lvbnMoKTtcbiAgICB0aGlzLmluaXRDaXJjbGVzKCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuY2FsY0Rhc2hPZmZzZXQoKTtcbiAgICAgIHNlbGYuc3RhcnRQZXJjZW50Q291bnRlcigpO1xuICAgICAgc2VsZi5ncmFkaWVudENvbG9yKCk7XG4gICAgfSwgc2VsZi5kZWxheSk7XG4gIH1cblxuICBub3JtYWxpemVEYXRhKCk6IHZvaWQge1xuICAgIHRoaXMucGVyY2VudCA9IE1hdGgucm91bmQodGhpcy5wZXJjZW50KTtcblxuICAgIGlmICh0aGlzLnBlcmNlbnQgPiAxMDApIHtcbiAgICAgIHRoaXMucGVyY2VudCA9IDEwMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wZXJjZW50IDwgMCkge1xuICAgICAgdGhpcy5wZXJjZW50ID0gMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaXJjbGVTaXplID09IDApe1xuICAgICAgdGhpcy5jaXJjbGVTaXplID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH1cbiAgICB0aGlzLmluaXRDaXJjbGVTaXplID0gdGhpcy5jaXJjbGVTaXplO1xuXG4gICAgaWYgKHRoaXMuY2lyY2xlU2l6ZSA8IHRoaXMuc3Ryb2tlV2lkdGgpe1xuICAgICAgbGV0IGluZm9NZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgICAgIGluZm9NZXNzYWdlICs9ICdjaXJjbGVTaXplIGlzIHNtYWxsZXIgdGhhbiBzdHJva2VXaWR0aCAnO1xuICAgICAgaW5mb01lc3NhZ2UgKz0gJygnKyB0aGlzLmNpcmNsZVNpemUgKyAnIDwgJyArIHRoaXMuc3Ryb2tlV2lkdGggKycpXFxuJztcbiAgICAgIGluZm9NZXNzYWdlICs9ICdyZWR1Y2luZyBzdHJva2VXaWR0aCB0byAnICsgdGhpcy5jaXJjbGVTaXplIC8gMjtcbiAgICAgIGNvbnNvbGUud2FybihpbmZvTWVzc2FnZSk7XG4gICAgICB0aGlzLnN0cm9rZVdpZHRoID0gdGhpcy5jaXJjbGVTaXplIC8gMjtcbiAgICB9XG4gIH1cblxuICBzZXRDaXJjbGVEaW1lbnNpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuc3Ryb2tlV2lkdGhIZWxwZXIgPSB0aGlzLnN0cm9rZVdpZHRoO1xuICAgIGlmICh0aGlzLnN0cm9rZVdpZHRoIDwgdGhpcy5zdHJva2VXaWR0aEJhY2tncm91bmQpe1xuICAgICAgdGhpcy5zdHJva2VXaWR0aEhlbHBlciA9IHRoaXMuc3Ryb2tlV2lkdGhCYWNrZ3JvdW5kO1xuICAgIH1cbiAgICB0aGlzLnJhZGl1cyA9ICgodGhpcy5jaXJjbGVTaXplIC8gMikgLSAodGhpcy5zdHJva2VXaWR0aEhlbHBlciAvIDIpKSAqIE1hdGguUEkgKiAyO1xuICAgIHRoaXMuc3Ryb2tlRGFzaEFycmF5ID0gdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5zdHJva2VEYXNoT2Zmc2V0ID0gdGhpcy5yYWRpdXM7XG4gIH1cblxuICBpbml0Q2lyY2xlcygpOiB2b2lkIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gKiAodGhpcy5wZXJjZW50IC8gMTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gPSAwO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jbG9ja3dpc2UpIHtcbiAgICAgIHRoaXMucm90YXRlWSA9IDE4MDtcbiAgICAgIHRoaXMubmVnYXRlID0gLTE7XG4gICAgfVxuXG4gICAgdGhpcy5zdHJva2VDb2xvckFjdGl2ZSA9IHRoaXMuc3Ryb2tlU3RlcHNbMF0uc3Ryb2tlQ29sb3I7XG5cbiAgICAvLyBjaGVjayBob3cgZmFyIGNpcmNsZSBwcm9ncmVzcyBnZXRzXG4gICAgY29uc29sZS5sb2codGhpcy5zdHJva2VTdGVwcyk7XG4gICAgdGhpcy5zdHJva2VTdGVwcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICAgIGlmIChzZWxmLnBlcmNlbnQgPT0gMTAwKSB7XG4gICAgICAgIHNlbGYuY2lyY2xlUHJvZ3Jlc3NTdGVwcyA9IHNlbGYuc3Ryb2tlU3RlcHMubGVuZ3RoO1xuICAgICAgICBzZWxmLnRyYW5zUGFyYW0udHJhbnNQb2ludHMgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzZWxmLnBlcmNlbnQgPj0gZWxlLnN0cm9rZVN0ZXAgJiYgc2VsZi5wZXJjZW50ID49IHNlbGYuc3Ryb2tlU3RlcHNbMF0uc3Ryb2tlU3RlcCkge1xuICAgICAgICBzZWxmLmNpcmNsZVByb2dyZXNzU3RlcHMgPSBpICsgMjtcbiAgICAgICAgc2VsZi50cmFuc1BhcmFtLnRyYW5zUG9pbnRzID0gc2VsZi5zdHJva2VTdGVwc1tpICsgMV0uc3Ryb2tlU3RlcCAtIHNlbGYucGVyY2VudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNEYXNoT2Zmc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Ryb2tlRGFzaE9mZnNldCA9IHRoaXMucmFkaXVzICogKDEgLSAodGhpcy5wZXJjZW50IC8gMTAwKSk7XG4gICAgdGhpcy5hbmltYXRpb25IZWxwZXIgPSB0aGlzLmFuaW1hdGlvbjtcbiAgfVxuXG4gIHN0YXJ0UGVyY2VudENvdW50ZXIoKTogdm9pZCB7XG4gICAgbGV0IGludGVydmFsRHVyYXRpb24gPSB0aGlzLnRyYW5zaXRpb25EdXJhdGlvbiAvIHRoaXMucGVyY2VudDtcblxuICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0IHRoaXNDb3VudGVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYucGVyY2VudENvdW50Kys7XG4gICAgICAgIGlmIChzZWxmLnBlcmNlbnRDb3VudCA9PSBzZWxmLnBlcmNlbnQpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXNDb3VudGVySW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9LCBpbnRlcnZhbER1cmF0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wZXJjZW50Q291bnQgPSB0aGlzLnBlcmNlbnQ7XG4gICAgfVxuICB9XG5cbiAgZ3JhZGllbnRDb2xvcigpOiB2b2lkIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG5cbiAgICAgIGxldCBncmFkaWVudENoYW5nZVRpbWVyID0gdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gLyB0aGlzLmNpcmNsZVByb2dyZXNzU3RlcHM7XG5cbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGxldCBncmFkaWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpKys7XG4gICAgICAgIGlmIChpID49IHNlbGYuY2lyY2xlUHJvZ3Jlc3NTdGVwcykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZ3JhZGllbnRJbnRlcnZhbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc3Ryb2tlQ29sb3JBY3RpdmUgPSBzZWxmLnN0cm9rZVN0ZXBzW2ldLnN0cm9rZUNvbG9yO1xuICAgICAgfSwgZ3JhZGllbnRDaGFuZ2VUaW1lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3Ryb2tlQ29sb3JBY3RpdmUgPSB0aGlzLnN0cm9rZVN0ZXBzW3RoaXMuY2lyY2xlUHJvZ3Jlc3NTdGVwcyAtIDFdLnN0cm9rZUNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrU2l6ZSh0aGlzV2lkdGgpOiB2b2lkIHtcbiAgICB0aGlzLmNpcmNsZVNpemUgPSB0aGlzLmluaXRDaXJjbGVTaXplO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuaW5pdENpcmNsZVNpemUsIHRoaXMuY2lyY2xlU2l6ZSwgdGhpc1dpZHRoKTtcbiAgICBpZiAodGhpc1dpZHRoIDwgdGhpcy5jaXJjbGVTaXplKXtcbiAgICAgIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uID0gMDtcbiAgICAgIHRoaXMuY2lyY2xlU2l6ZSA9IHRoaXNXaWR0aCAtIHRoaXMuc3Ryb2tlV2lkdGggLSAxO1xuICAgIH1cbiAgICB0aGlzLnNldENpcmNsZURpbWVuc2lvbnMoKTtcbiAgICB0aGlzLmNhbGNEYXNoT2Zmc2V0KCk7XG4gIH1cblxuICBvblJlc2l6ZShldmVudCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tTaXplKGV2ZW50LnRhcmdldC5pbm5lcldpZHRoKTtcbiAgfVxufVxuIl19
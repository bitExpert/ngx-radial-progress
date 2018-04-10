import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'radial-progress',
  templateUrl: 'radial-progress.component.html',
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
})
export class RadialProgressComponent implements OnInit {
  @Input() addClass: string = '';
  @Input() animation: boolean = true;
  @Input() circleSize: number = 0;
  @Input() clockwise: boolean = false;
  @Input() delay: number = 0;
  @Input() fill: string = 'transparent';
  @Input() fillBackground: string = 'transparent';
  @Input() percent: number = 50;
  @Input() percentUnit: string = '%';
  @Input() showPercent: boolean = true;
  @Input() strokeBackground: string = 'transparent';
  @Input() strokeLinecap: string = "butt";
  @Input() strokeSteps: any = [
    {
      strokeColor: 'red',
      strokeStep: 10
    }, {
      strokeColor: 'green',
      strokeStep: 100
    }
  ];
  @Input() strokeWidth: number = 10;
  @Input() strokeWidthBackground: number = this.strokeWidth;
  @Input() title: string = '';
  @Input() transitionDuration: number = 5000;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  initCircleSize = this.circleSize;
  strokeDashOffset: number = 0;
  strokeDashArray: number = 0;
  percentCount: number = 0;
  strokeColorActive: string = this.strokeSteps[0].strokeColor;
  circleProgressSteps: number = 1;
  radius: number;
  rotateY: number = 0;
  animationHelper: boolean = false;
  strokeWidthHelper: number = this.strokeWidth;
  // negate is -1 if clockwise is true, see html
  negate: number = 1;
  transParam: any = {
    transPoints: '',
    transRank: ''
  };

  constructor(private el:ElementRef) {
  }

  ngOnInit(): void {
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

  normalizeData(): void {
    this.percent = Math.round(this.percent);

    if (this.percent > 100) {
      this.percent = 100;
    }

    if (this.percent < 0) {
      this.percent = 0;
    }

    if (this.circleSize == 0){
      this.circleSize = this.el.nativeElement.clientWidth;
    }
    this.initCircleSize = this.circleSize;

    if (this.circleSize < this.strokeWidth){
      let infoMessage: string = '';
      infoMessage += 'circleSize is smaller than strokeWidth ';
      infoMessage += '('+ this.circleSize + ' < ' + this.strokeWidth +')\n';
      infoMessage += 'reducing strokeWidth to ' + this.circleSize / 2;
      console.warn(infoMessage);
      this.strokeWidth = this.circleSize / 2;
    }
  }

  setCircleDimensions(): void {
    this.strokeWidthHelper = this.strokeWidth;
    if (this.strokeWidth < this.strokeWidthBackground){
      this.strokeWidthHelper = this.strokeWidthBackground;
    }
    this.radius = ((this.circleSize / 2) - (this.strokeWidthHelper / 2)) * Math.PI * 2;
    this.strokeDashArray = this.radius;
    this.strokeDashOffset = this.radius;
  }

  initCircles(): void {
    let self = this;

    if (this.animation) {
      this.transitionDuration = this.transitionDuration * (this.percent / 100);
    } else {
      this.transitionDuration = 0;
    }

    if (!this.clockwise) {
      this.rotateY = 180;
      this.negate = -1;
    }

    // check how far circle progress gets
    this.strokeSteps.forEach(function (ele, i) {
      if (self.percent == 100) {
        self.circleProgressSteps = self.strokeSteps.length;
        self.transParam.transPoints = 0;
      } else if (self.percent >= ele.strokeStep && self.percent >= self.strokeSteps[0].strokeStep) {
        self.circleProgressSteps = i + 2;
        self.transParam.transPoints = self.strokeSteps[i + 1].strokeStep - self.percent;
      }
    });
  }

  calcDashOffset(): void {
    this.strokeDashOffset = this.radius * (1 - (this.percent / 100));
    this.animationHelper = this.animation;
  }

  startPercentCounter(): void {
    let intervalDuration = this.transitionDuration / this.percent;

    if (this.animation) {
      let self = this;
      let thisCounterInterval = setInterval(function () {
        self.percentCount++;
        if (self.percentCount == self.percent) {
          clearInterval(thisCounterInterval);
        }
      }, intervalDuration);
    } else {
      this.percentCount = this.percent;
    }
  }

  gradientColor(): void {
    let self = this;
    if (this.animation) {

      let gradientChangeTimer = this.transitionDuration / this.circleProgressSteps;

      let i = 0;
      let gradientInterval = setInterval(function () {
        i++;
        if (i >= self.circleProgressSteps) {
          clearInterval(gradientInterval);
          return;
        }
        self.strokeColorActive = self.strokeSteps[i].strokeColor;
      }, gradientChangeTimer);
    } else {
      this.strokeColorActive = this.strokeSteps[this.circleProgressSteps - 1].strokeColor;
    }
  }

  checkSize(thisWidth): void {
    this.circleSize = this.initCircleSize;
    console.log(this.initCircleSize, this.circleSize, thisWidth);
    if (thisWidth < this.circleSize){
      this.transitionDuration = 0;
      this.circleSize = thisWidth - this.strokeWidth - 1;
    }
    this.setCircleDimensions();
    this.calcDashOffset();
  }

  onResize(event): void {
    this.checkSize(event.target.innerWidth);
  }
}

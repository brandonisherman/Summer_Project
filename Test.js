function Rectangle(height, width) {
    this.height = height;
    this.width = width;
    this.calcArea = function() {
        if (height <= 0 || width <= 0) {
            console.log("Invalid rectangle.");
            return 0
        }
        return this.height * this.width;
    };
    this.calcPerimeter = function() {
        return 2 * (this.height + this.width);
    };
};

var rectangle1 = new Rectangle(height=10, width=12);
var rectangle2 = new Rectangle(height=2, width=10);
console.log(rectangle2.calcArea());
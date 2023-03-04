function getValueById(elementId) {
  return document.getElementById(elementId).value;
}

const unique = (jsonString) => {
  const newJson = jsonString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  const array = JSON.parse(newJson);
  const uniqueSet = new Set();

  uniqueSet.add(array[0]);

  array.forEach(item => {
    if (!uniqueSet.has(item)) {
      const firstItem = item.split('').sort().toString();
      const valuesArrayMap = Array.from(uniqueSet);

      if (valuesArrayMap.every(element => {
        const secondItem = element.split('').sort().toString();

        return firstItem !== secondItem;
      }))
        uniqueSet.add(item);
    }
  });

  let resultString = '[\n';

  uniqueSet.forEach(item => resultString += `\t${item},\n`);

  resultString += ']';

  document.getElementById('unique-output').innerHTML = resultString;
};

function checkUser() {
  const user = {
    firstName: "",
    lastName: "",
    age: "",
    get userInfo() {
      console.log(`${this.firstName} ${this.lastName} is ${this.age}`)
    },
    set userInfo(param) {
      if (typeof param === "object") {
        this.firstName = param.firstName;
        this.lastName = param.lastName;
        this.age = param.age;
      }
      else {
        const infoArray = param.split(' ');
        this.firstName = infoArray[0];
        this.lastName = infoArray[1];
        this.age = infoArray[2];
      }
    }
  };

  user.userInfo = "Taras Samoilenko 25";
  user.userInfo;

  user.userInfo = { firstName: "Kate", lastName: "Karp", age: 22 };
  user.userInfo;
};
checkUser();

function checkArray() {
  const obj = {
    from: 1,
    to: 10,
  };

  const createArr = () => {
    obj.arr = Array.from({ length: (obj.to - obj.from + 1) }, (_, i) => i + obj.from);
  };

  createArr();

  // Solution 2
  function createArrBind() {
    this.arrBind = Array.from({ length: (this.to - this.from + 1) }, (_, i) => i + this.from);
  }

  const bindFunc = createArrBind.bind(obj);

  bindFunc();

  // Solution 3
  function createArrCall() {
    this.arrCall = Array.from({ length: (this.to - this.from + 1) }, (_, i) => i + this.from);
  }

  createArrCall.call(obj);

  console.log(obj);
};
checkArray();

function Car(model, color, age, speed, gasTank, started) {
  const obj = {
    model: model,
    color: color,
    age: age,
    speed: speed,
    gasTank: gasTank,
    started: started
  }

  obj.startEngine = function () {
    if (this.gasTank > 0) {
      this.started = true;
      this.speed = 30;

      console.log('Engine on.');
    } else {
      console.log('Engine don`t work because gas tank empty.');
    }
  };

  obj.drive = function () {
    if (this.gasTank > 0 && this.started) {
      console.log('Im VIU-VIU-VIU');
    } else {
      console.log('Im not VIU-VIU-VIU, because gas tank empty or engine off.');
    }
  };

  obj.stop = function () {
    this.started = false;
    this.speed = 0;

    console.log('Engine off.');
  };

  obj.writeSpeed = function () { console.log(`Speed: ${this.speed}.`) }
  obj.writeGas = function () { console.log(`Gas: ${this.gasTank}.`) }

  obj.speedUp = function (arg) {
    if ((this.gasTank - 5) > 0) {
      if ((this.speed + arg) < 200) {
        this.speed += arg;
      } else {
        this.speed = 200;
      }

      this.gasTank -= 5;

      this.writeSpeed();
      this.writeGas();
    } else {
      this.gasTank = 0;
      this.stop();
    }
  };

  obj.slowDown = function (arg) {
    if ((this.gasTank - 5) > 0) {
      if ((this.speed - arg) > 0) {
        this.speed -= arg;
      } else {
        this.speed = 0;
      }

      this.gasTank -= 5;

      this.writeSpeed();
      this.writeGas();
    } else {
      this.gasTank = 0;
      this.stop();
    }
  };

  obj.addGas = function (arg) {
    if ((this.gasTank + arg) < 20) {
      this.gasTank += arg;
    } else {
      this.gasTank = 20;
    }

    this.writeGas();
  };

  return obj;
}

const obj = new Car("Tesla", "Red", 5, 0, 11, false);

obj.startEngine();

obj.speedUp(100);

obj.speedUp(300);

obj.speedUp(10);

obj.startEngine();

obj.addGas(25);

obj.drive();

obj.startEngine();

obj.drive();

obj.speedUp(40);

obj.slowDown(50);

obj.stop();
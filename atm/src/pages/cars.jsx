
import React from 'react';

class Car {
  constructor(name) {
    this.brand = name;
  }

  present() {
    return 'I have a ' + this.brand;
  }
}

class Model extends Car {
  constructor(name, mod) {
    super(name);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model
  }
}
const mycar = new Model("Ford", "Mustang");
const Cars = () => {
  return (
    <div>
      <h1>
        Hello From Cars
      </h1>
    </div>
  );
};


export default Cars;



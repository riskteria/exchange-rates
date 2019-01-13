
# React Exchange Rates Application

Simple Foreign Exchange Currency App implementation with https://exchangeratesapi.io/

![App Screenshot](./screen.png)

## Features
* Convert currency rate
* Add more currency into list
* App data persist on different tab
  
## Getting Started

* Clone This Project
  ```
  git clone git@github.com:riskteria/exchange-rates.git
  ```

* Open project directory in terminal
  ```
  cd exchange-rates
  ```

* Build docker image
  ```
  docker image build -t exchange-rates .
  ```

* RUN project in docker
  ```
  docker container run -it -p 5000:5000 exchange-rates:latest
  ```

* Open http://localhost:5000 in your browser

## Running Test
* Unit test
  ```
  docker container run -it -v $(pwd):/app exchange-rates:latest test
  ```
* E2E Test
  Run project `docker container run -it -p 5000:5000 exchange-rates:latest`
  then run
  ```
  docker container run -it -v $(pwd):/app exchange-rates:latest e2e
  ```

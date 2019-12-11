# KitchenZealot

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Additonal Info

**Make sure** to extract and download the environments folder from [here](https://drive.google.com/file/d/1tGNdjRjlrCBNHutG-iosvuh5GpbbpKD5/view?usp=sharing). Set the file path to `csc322/src/environments`.

## OverView

### What is our System?
Our system allows users to purchase different consumable products, and have it delivered to their residence as fast as possible. We aim to create a user friendly product that makes it easy for customers to order food and employees to manage their responsibilities. The system boasts different views complemented by different functionalities for user type

### How does it work?   
Our system not only allows customers (registered users) and guests (unregistered users) to order and receive food, but also gives managers, salespeople, cooks, and delivery people access to their own pages to handle services in the company. 

**Delivery people** have access to see all the different orders from customers and guests, and bid on them.

**Salespeople** are given comments from cooks, to know and order ingredients that are needed. 

**Cooks** are allowed to request more supplies from salespeople, rate salespeople, and change menu items. 

**Managers** can approve guest to customers, view order history, view all ratings, start delivery bidding process per order, pay employees, hire/fire employees, and remove warnings.

For more information visit `csc322/Reports`

##  Assumptions and Dependencies

1. Customers can’t change their name/email/phone number or use different credentials to register

2. Employees are not customers, so they can’t order food

3. There is always one manager in the system

4. There are always at least two delivery people to bid

5. There is always at least one cook

6. There is always at least one salesperson

7. If users have an account they will not login as guest

8. There is only one store location

9. ~~Only users within our vicinity~~ We have now expanded to all of NYC

10. Customers will only input valid data i.e. Address, Email

11. There will always be atleast one menu item available to order

12. When voice ordering customers will only add one item at a time

13. Payment details are always valid and contain enough money to pay for the ordered food

14. Cooks will always enter a valid image url when adding a menu item

15. Supplies ordered by salespeople come from external sources and are available immediately

## References

[Professor Jie Wei Software Requirements](http://www-cs.ccny.cuny.edu/~csjie/322/f19/proj_req_f19.docx)

[Professor Jie Wei Software Requirement Specification Template](http://www-cs.ccny.cuny.edu/~csjie/322/spec_sample.pdf)
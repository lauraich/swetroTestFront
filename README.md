# Swetro Tecnical Test Frontend

## Description

The web application was developed using the Angular framework and tailwind css for the styles.

The web application consists of two tabs: Dashboard and Patterns. The first one allows entering the file or files in .xlsx format and then makes use of the [process_data service](https://github.com/lauraich/swetroTest/tree/main#logic-of-process_data) of the API developed to obtain the records that are considered as "cheaters".

The patterns tab allows entering the file or files in .xlsx format and then makes use of the [check_patterns service](https://github.com/lauraich/swetroTest/tree/main#logic-of-check_patterns) of the developed API to obtain the records that have an unusual pattern according to the Isolation Forest algorithm.

For both tabs the results are displayed at the bottom of the page where they will be shown as a list and each record in the list will have two buttons: the first one called "Record" to get the reasons why it was classified as "cheater" along with the values of the record and the second one called "Average" to get more information about that user particularly to observe the average of its metrics.

## Installation

Note: all commands must be executed in the root project.

First you will need to install the dependencies, to do this run the following command in your terminal:

```bash
npm install
```

To run the application execute the following command:

```bash
ng serve -o
```

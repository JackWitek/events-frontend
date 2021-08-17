# Events Manager - Frontend

A Vue.js frontend that connects to a Ruby on Rails API backend

Can be used for managing events, planning vacations, etc

Backend can be found [here](https://github.com/JackWitek/events-backend)

### Built using

* tailwind
* karma



## Build Setup


### Dev

``` bash
# install dependencies
npm i

# Remember to update API_URL after switching location of backend

# serve with hot reload at localhost:8080
npm run dev

```

### Prod

``` bash
# install dependencies
npm i

# Remember to update API_URL after switching location of backend

# run build scripts
npm run build

# start prod server on localhost:8080
npm run start

```

#### Run tests

``` bash
npm run test

```

## Next Steps

* More options for managing events in the "week" and "custom date range" view
* Hook up to a weather API to show live weather based on location of a day
* Add lots of unit tests
* My intention was to create the UI from scratch, but perhaps it may be useful to use an existing calendar for a month view
* Create a mobile frontend that can also connect to the rails backend (though the app is already pretty mobile friendly)
